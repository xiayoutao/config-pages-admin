<template>
<div class="app-page mod-file">
  <el-form :inline="true" :model="dataForm">
    <el-form-item>
      <el-button v-permisson="permisson.musicUpload" type="primary" @click="uploadHandle()">上传音频</el-button>
      <el-button v-permisson="permisson.musicDelete" type="danger" @click="deleteHandle()" :disabled="dataListSelections.length <= 0">批量删除</el-button>
    </el-form-item>
  </el-form>
  <el-table :data="dataList" border v-loading="dataListLoading" @selection-change="selectionChangeHandle" :empty-text="tableEmptyText" style="width: 100%;">
    <el-table-column type="selection" header-align="center" align="center" width="50"></el-table-column>
    <el-table-column prop="name" header-align="center" align="center" label="文件名" show-overflow-tooltip></el-table-column>
    <el-table-column header-align="center" align="center" width="450" label="URL地址">
      <template slot-scope="scope">{{ $store.state.common.cdnUrl + scope.row.urlkey }}</template>
    </el-table-column>
    <el-table-column prop="addtime" header-align="center" align="center" width="220" label="上传时间">
      <template slot-scope="scope">{{ formatDate(scope.row.addtime) }}</template>
    </el-table-column>
    <el-table-column header-align="center" align="center" width="160" label="操作">
      <template slot-scope="scope">
        <el-button type="text" size="small" @click="playHandle(scope.row.name, scope.row.urlkey)">播放</el-button>
        <el-button v-permisson="permisson.musicDelete" type="text" size="small" @click="deleteHandle(scope.row.id)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination
    :background="paginationBg"
    :page-size="pageSize"
    :layout="paginationLayout"
    :current-page="pageIndex"
    :page-sizes="paginationPageSizes"
    :total="totalPage"
    @size-change="sizeChangeHandle"
    @current-change="currentChangeHandle">
  </el-pagination>
  <!-- 弹窗, 上传文件 -->
  <upload v-if="uploadVisible" ref="upload" @refreshDataList="getDataList"></upload>
  <audio-player v-if="audioVisible" ref="audioPlayer" @pause="audioPause"></audio-player>
</div>
</template>

<script>
import listPageMixin from '@/mixins/listPage';
import {
  getFileList,
  deleteFile,
} from '@/apis/love';
import {
  fileTypes,
} from '@/constants';
import Upload from './file-upload';
import AudioPlayer from '@/components/audio'; // 样式会影响到全局

export default {
  mixins: [
    listPageMixin,
  ],
  components: {
    Upload,
    AudioPlayer
  },
  data () {
    return {
      fileTypes,
      dataForm: {},
      dataList: [],
      uploadVisible: false,
      audioVisible: false
    };
  },
  computed: {
    types () {
      return File.types;
    }
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
        type: this.fileTypes.audio,
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
    // 上传文件
    uploadHandle () {
      this.uploadVisible = true;
      this.$nextTick(() => {
        this.$refs.upload.init(1);
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
    playHandle (title, url) {
      this.audioVisible = true;
      this.$nextTick(() => {
        this.$refs.audioPlayer.init(title, this.$store.state.common.cdnUrl + url);
      });
    },
    audioPause () {
      this.audioVisible = false;
    },
    // 子组件点击图片预览
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
              msrc: this.$store.state.common.cdnUrl + item.urlkey + '?imageView2/1/w/200/h/200',
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
