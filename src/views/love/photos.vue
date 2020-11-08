<template>
  <div class="app-page mod-photos">
    <el-form :inline="true" :model="dataForm">
      <el-form-item>
        <el-button v-permisson="permisson.photosAdd" type="primary" @click="addOrUpdateHandle()">添加照片</el-button>
        <el-button v-permisson="permisson.photosDelete" type="danger" @click="deleteHandle()" :disabled="dataListSelections.length <= 0">批量删除</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="dataList" border v-loading="dataListLoading" @selection-change="selectionChangeHandle" :empty-text="this.$store.state.common.tableEmptyText" style="width: 100%;">
      <el-table-column type="selection" header-align="center" align="center" width="50"></el-table-column>
      <el-table-column prop="title" header-align="center" align="center" width="120" label="标题"></el-table-column>
      <el-table-column prop="url" header-align="center" align="center" width="400" label="URL地址"></el-table-column>
      <el-table-column header-align="center" align="center" label="预览">
        <template slot-scope="scope">
          <el-popover placement="bottom" width="500" trigger="hover">
            <img style="max-width:100%;min-height:320px;" v-imgurl="$createImageUrl(scope.row.url)">
            <img slot="reference" width="30" height="30" v-imgurl="$createImageUrl(scope.row.url)">
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column prop="addtime" header-align="center" align="center" width="180" label="创建时间">
        <template slot-scope="scope">{{ formatDate(scope.row.addtime) }}</template>
      </el-table-column>
      <el-table-column prop="addtime" header-align="center" align="center" width="80" label="排序">
        <template slot-scope="scope">{{ scope.row.sort }}</template>
      </el-table-column>
      <el-table-column header-align="center" align="center" width="200" label="操作">
        <template slot-scope="scope">
          <el-button v-permisson="permisson.photosSort" size="mini" round @click="updateSortHandle(scope.row.id)">修改排序</el-button>
          <el-button v-permisson="permisson.photosUpdate" size="mini" round @click="addOrUpdateHandle(scope.row.id)">编辑</el-button>
          <el-button v-permisson="permisson.photosDelete" size="mini" round @click="deleteHandle(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination @size-change="sizeChangeHandle" @current-change="currentChangeHandle" :current-page="pageIndex" :page-sizes="$store.state.common.paginationOptions.pageSizes" :page-size="$store.state.common.paginationOptions.pageSize" :total="totalPage" :layout="$store.state.common.paginationOptions.layout"></el-pagination>
    <!-- 弹窗, 新增 / 修改 -->
    <update-sort v-if="updateSortVisible" ref="updateSort" @close="updateSortVisible = false" @refreshDataList="getDataList"></update-sort>
    <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @close="addOrUpdateVisible = false" @refreshDataList="getDataList"></add-or-update>
    <image-viewer ref="imageviewer" :list="viewerImages" :options="$store.state.previewerOptions"></image-viewer>
  </div>
</template>

<script>
import {
  getPhotoList,
  deletePhoto,
} from '@/apis/love';
import AddOrUpdate from './photos-add-or-update.vue';
import UpdateSort from './photos-update-sort.vue';
import ImageViewer from '@/components/viewer';

export default {
  data () {
    return {
      dataForm: {},
      dataList: [],
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      dataListLoading: false,
      dataListSelections: [],
      updateSortVisible: false,
      addOrUpdateVisible: false,
      viewerImages: []
    };
  },
  activated () {
    this.getDataList();
  },
  methods: {
    async getDataList () {
      this.dataListLoading = true;
      const data = await getPhotoList({
        page: this.pageIndex,
        limit: this.pageSize
      });
      this.dataListLoading = false;
      if (!this.isEmptyObject(data)) {
        this.dataList = data.list;
        this.totalPage = data.totalCount;
      } else {
        this.dataList = [];
        this.totalPage = 0;
      }
    },
    updateSortHandle (id) {
      this.updateSortVisible = true;
      this.$nextTick(() => {
        this.$refs.updateSort.init(id);
      });
    },
    addOrUpdateHandle (id) {
      this.addOrUpdateVisible = true;
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init(id);
      });
    },
    // 删除
    deleteHandle (id) {
      var ids = id
        ? [id]
        : this.dataListSelections.map(item => {
            return item.id;
          });
      this.$confirm(
        `确定对[id=${ids.join(',')}]进行[${id ? '删除' : '批量删除'}]操作?`,
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).then(async () => {
        const data = await deletePhoto({
          ids,
        });
        if (data) {
          this.$messageCallback('success', '操作成功', () => {
            this.getDataList();
          });
        } else {
          this.$messageCallback('error', '删除失败');
        }
      });
    },
    // 每页数
    sizeChangeHandle (val) {
      this.pageSize = val;
      this.pageIndex = 1;
      this.getDataList();
    },
    // 当前页
    currentChangeHandle (val) {
      this.pageIndex = val;
      this.getDataList();
    },
    // 多选
    selectionChangeHandle (val) {
      this.dataListSelections = val;
    },
    // 点击图片预览
    handlePreview (index) {
      this.$refs.imageviewer.show(index);
    }
  },
  watch: {
    dataList: {
      handler (val) {
        this.viewerImages = [];
        val.forEach((item, index) => {
          if (item.type === 0) {
            this.viewerImages.push({
              msrc:
                this.$store.state.common.cdnUrl +
                item.urlkey +
                '?imageView2/1/w/200/h/200',
              src: this.$store.state.common.cdnUrl + item.urlkey
            });
          }
        });
      },
      deep: true
    }
  },
  components: {
    UpdateSort,
    AddOrUpdate,
    ImageViewer
  }
};
</script>
