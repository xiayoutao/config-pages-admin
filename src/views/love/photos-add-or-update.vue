<template>
  <el-dialog class="dialog-common" width="540px" :title="!id ? '新增' : '修改'" :close-on-click-modal="false" @close="$emit('close')" :visible.sync="visible">
    <el-form ref="dataForm" :model="dataForm" :rules="rules" label-width="80px" @keyup.enter.native="dataFormSubmit()">
      <el-form-item label="标题" prop="title">
        <el-input v-model="dataForm.title" placeholder="图片标题"></el-input>
      </el-form-item>
      <el-form-item label="排序" prop="sort">
        <el-input-number v-model="dataForm.sort" controls-position="right" :min="0" label="排序号"></el-input-number>
      </el-form-item>
      <el-form-item label="选择图片" prop="url">
        <el-select v-model="dataForm.url" placeholder="选择图片">
          <el-option v-for="(item, index) in fileList" :key="index" :label="item.name" :value="item.url">
            <span style="float:left;">{{ item.name }}</span>
            <img v-imgurl="item.url + '?imageView2/1/w/50/h/50'" style="float:right;width:30px;height:30px;">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="">
        <img v-imgurl="dataForm.url + '?imageView2/1/w/360/h/420'" v-if="dataForm.url" style="max-width:100%; max-height:360px;">
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" :loading="ajaxLoading" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import {
  fileTypes,
  getAllFile,
} from '@/apis/love/file.js';
import {
  insertPhoto,
  updatePhoto,
  getPhotoInfo,
} from '@/apis/love/photos.js';

export default {
  data () {
    return {
      visible: false,
      id: null,
      fileTypes,
      fileList: [],
      dataForm: {
        title: null,
        url: null,
        sort: 50,
      },
      rules: {
        title: [
          { required: true, message: '标题不能为空', },
          { max: 90, message: '标题不能超过90个字符', },
        ],
        url: [
          { required: true, message: '照片地址不能为空', },
          { max: 400, message: '照片地址不能超过400个字符', },
        ],
        sort: [
          { required: true, message: '排序号不能为空', },
          { type: 'number', min: 0, message: '排序号必须大于等于0', },
        ],
      }
    };
  },
  methods: {
    init (id) {
      id = id || 0;
      this.id = id;
      this.visible = true;
      this.getFileList();
      this.$nextTick(async () => {
        const data = await getPhotoInfo({
          id,
        });
        if (!this.isEmptyObject(data)) {
          this.dataForm = { ...data };
        } else {
          this.visible = false;
        }
      });
    },
    // 获取图片列表
    async getFileList () {
      // 0图片，1音频，2视频
      const data = await getAllFile({
        type: this.fileTypes.audio,
      });
      if (!this.isEmptyObject(data)) {
        this.fileList = [];
        data.forEach(item => {
          this.fileList.push({
            id: item.id,
            url: this.$store.state.common.cdnUrl + item.urlkey,
            name: item.name
          });
        });
      }
    },
    // 表单提交
    dataFormSubmit () {
      this.$refs.dataForm.validate(async (valid) => {
        if (valid) {
          if (this.ajaxLoading) {
            return false;
          }
          this.ajaxLoading = true;
          let data;
          if (this.id) {
            data = await updatePhoto(this.dataForm);
          } else {
            data = await insertPhoto(this.dataForm);
          }
          this.ajaxLoading = false;
          if (data) {
            this.visible = false;
            this.$emit('refreshDataList');
            this.$messageCallback('success', '操作成功');
          }
        } else {
          return false;
        }
      });
    },
  }
};
</script>
