<template>
  <div class="app-page mod-file">
    <el-form :inline="true" :model="dataForm">
      <el-form-item>
        <el-button v-permisson="permisson.imageUpload" type="primary" @click="uploadHandle()">上传图片</el-button>
        <el-button v-permisson="permisson.imageDelete" type="danger" @click="deleteHandle()" :disabled="dataListSelections.length <= 0">批量删除</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="dataList" border v-loading="dataListLoading" @selection-change="selectionChangeHandle" :empty-text="this.$store.state.common.tableEmptyText" style="width: 100%;">
      <el-table-column type="selection" header-align="center" align="center" width="50"></el-table-column>
      <el-table-column prop="name" header-align="center" align="center" width="180" label="文件名" show-overflow-tooltip></el-table-column>
      <el-table-column header-align="center" align="center" width="400" label="URL地址">
        <template slot-scope="scope">{{ $store.state.common.cdnUrl + scope.row.urlkey }}</template>
      </el-table-column>
      <el-table-column prop="filetype" header-align="center" align="center" width="90" label="类型" show-overflow-tooltip>
        <template slot-scope="scope">
          <span v-if="scope.row.type === fileTypes.image">图片</span>
          <span v-else-if="scope.row.type === fileTypes.audio">音频</span>
          <span v-else-if="scope.row.type === fileTypes.video">视频</span>
          <span v-else>--</span>
        </template>
      </el-table-column>
      <el-table-column header-align="center" align="center" label="预览">
        <template slot-scope="scope">
          <el-popover placement="bottom" width="500" trigger="hover">
            <img style="max-width:100%;min-height:320px;" v-imgurl="$createUrlByKey(scope.row.urlkey)">
            <img slot="reference" width="30" height="30" v-imgurl="$createUrlByKey(scope.row.urlkey, 0)">
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column prop="addtime" header-align="center" align="center" width="160" label="上传时间">
        <template slot-scope="scope">{{ formatDate(scope.row.addtime) }}</template>
      </el-table-column>
      <el-table-column header-align="center" align="center" width="100" label="操作">
        <template slot-scope="scope">
          <el-button v-permisson="permisson.imageDelete" type="text" size="small" @click="deleteHandle(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination @size-change="sizeChangeHandle" @current-change="currentChangeHandle" :current-page="pageIndex" :page-sizes="$store.state.common.paginationOptions.pageSizes" :page-size="$store.state.common.paginationOptions.pageSize" :total="totalPage" :layout="$store.state.common.paginationOptions.layout"></el-pagination>
    <!-- 弹窗, 上传文件 -->
    <upload v-if="uploadVisible" ref="upload" @refreshDataList="getDataList"></upload>
    <image-viewer ref="imageviewer" :list="viewerImages" :options="$store.state.previewerOptions"></image-viewer>
  </div>
</template>

<script>
import {
  getFileList,
  deleteFile,
} from '@/apis/love';
import {
  fileTypes,
} from '@/constants';
import Upload from './file-upload';
import ImageViewer from '@cps/viewer';

export default {
  components: {
    Upload,
    ImageViewer
  },
  data () {
    return {
      fileTypes,
      dataForm: {},
      dataList: [],
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      dataListLoading: false,
      dataListSelections: [],
      uploadVisible: false,
      viewerImages: [],
    };
  },
  activated () {
    this.getDataList();
  },
  methods: {
    // 获取数据列表
    async getDataList () {
      this.dataListLoading = true;
      // 0图片，1音频，2视频
      const data = await getFileList({
        page: this.pageIndex,
        limit: this.pageSize,
        type: this.fileTypes.image,
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
    // 上传文件
    uploadHandle () {
      this.uploadVisible = true;
      this.$nextTick(() => {
        this.$refs.upload.init(0);
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
        const data = await deleteFile({
          ids,
        });
        if (data) {
          this.$messageCallback('success', '操作成功', () => {
            this.getDataList();
          });
        }
      });
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
          if (item.type === this.fileTypes.image) {
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
};
</script>
