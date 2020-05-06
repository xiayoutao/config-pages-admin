<template>
  <el-dialog class="dialog-common" title="上传文件" :close-on-click-modal="false" @close="closeHandle" :visible.sync="visible">
    <el-upload drag :data="uploadData" :action="url" :before-upload="beforeUploadHandle" :on-success="successHandle" :file-list="fileList" :accept="replaceAll(mimeType, ',')" style="text-align: center;">
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">
        <em>点击上传</em>
      </div>
      <div class="el-upload__tip" slot="tip">{{ mimeType.length > 0 ? '支持 ' + replaceAll(mimeType) + ' 的文件！' : '' }}</div>
    </el-upload>
  </el-dialog>
</template>

<script>
import * as qiniu from 'qiniu-js';
import {
  mimeTypes,
  fileTypes,
  getFileList,
  uploadFile,
} from '@/apis/love/file.js';
import {
  getQiniuUptoken,
} from '@/apis/common/index.js';

export default {
  data () {
    return {
      visible: false,
      url: this.$store.state.common.upload,
      fileList: [],
      uploadData: {
        token: null,
        'x:name': null
      },
      mimeType: [],
      fileTypes,
      mimeTypes,
    };
  },
  methods: {
    init (type) {
      if (type === this.fileTypes.image) {
        this.mimeType = this.mimeTypes.image;
      } else if (type === this.fileTypes.audio) {
        this.mimeType = this.mimeTypes.audio;
      } else {
        this.mimeType = [];
      }
      this.getQiniuUploadToken();
      this.visible = true;
    },
    // 获取七牛token值
    async getQiniuUploadToken () {
      const data = await getQiniuUptoken();
      if (!this.isEmptyObject(data)) {
        this.uploadData.token = data.uptoken;
      }
    },
    // 上传之前
    beforeUploadHandle (file) {
      if (this.mimeType.length > 0) {
        if (this.mimeType.indexOf(file.type) < 0) {
          this.$messageCallback('error', `只支持 ${this.replaceAll(this.mimeType)} 格式的文件！`);
          return false;
        }
      }
      this.uploadData['x:name'] = file.name.split('.')[0];
    },
    // 上传成功
    async successHandle (response, file, fileList) {
      this.fileList = fileList;
      if (response && response.key) {
        const data = await uploadFile({
          name: response.name,
          key: response.key
        });
        if (!this.isEmptyObject(data)) {
          this.$messageCallback('success', '操作成功', () => {
            this.$emit('refreshDataList');
            this.visible = false;
          });
        } else {
          this.$messageCallback('error', '上传失败，请重试');
        }
      } else {
        this.$message.error('上传失败，请重试');
      }
    },
    // 弹窗关闭时
    closeHandle () {
      this.fileList = [];
      this.$emit('refreshDataList');
    },
    replaceAll (mimeType, type) {
      var joinStr = type ? ',' : '、';
      return mimeType
        .join(joinStr)
        .replace(/image\//g, type ? '.' : '')
        .replace(/audio\//g, type ? '.' : '');
    }
  }
};
</script>
