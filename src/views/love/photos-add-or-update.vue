<template>
  <el-dialog class="dialog-common" :title="!id ? '新增' : '修改'" :close-on-click-modal="false" @close="$emit('close')" :visible.sync="visible">
    <el-form ref="dataForm" :model="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
      <el-form-item label="标题" prop="title">
        <el-input v-model="dataForm.title" placeholder="图片标题"></el-input>
      </el-form-item>
      <el-form-item label="排序" prop="sort">
        <el-input-number v-model="dataForm.sort" controls-position="right" :min="0" label="排序号"></el-input-number>
      </el-form-item>
      <el-form-item label="选择图片" prop="url">
        <el-select v-model="dataForm.url" placeholder="选择图片" style="width: 100%;">
          <el-option v-for="(item, index) in fileList" :key="index" :label="item.name" :value="item.url">
            <span style="float:left;">{{ item.name }}</span>
            <img v-imgurl="item.url + '?imageView2/1/w/50/h/50'" style="float:right;width:30px;height:30px;">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="">
        <img v-imgurl="dataForm.url + '?imageView2/1/w/360/h/420'" v-if="dataForm.url" style="max-width: 100%;">
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
  mineTypes,
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
      dataForm: {},
      fileList: []
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
    initData (dataForm) {
      let keys = Object.keys(dataForm);
      keys.forEach(item => {
        this.$set(this.dataForm, item, dataForm[item]);
      });
    },
    // 获取图片列表
    getFileList () {
      let fileModel = new File();
      // 0图片，1音频，2视频
      fileModel.select(0).then(({ data }) => {
        let resultData = this.$httpResponseHandle(data);
        if (resultData) {
          this.fileList = [];
          resultData.forEach(item => {
            this.fileList.push({
              id: item.id,
              url: this.$store.state.common.cdnUrl + item.urlkey,
              name: item.name
            });
          });
        }
      });
    },
    // 表单提交
    dataFormSubmit () {
      if (this.ajaxLoading) {
        return false;
      }
      this.ajaxLoading = true;
      this.$refs.dataForm.validate(async (valid) => {
        if (valid) {
          let data;
          if (this.id) {
            data = await updatePhoto(this.dataForm);
          } else {
            data = await insertPhoto(this.dataForm);
          }
          if (data) {
            this.$emit('refreshDataList');
            this.$messageCallback('success', '操作成功', () => {
              this.ajaxLoading = false;
              this.visible = false;
            });
          }
        } else {
          return false;
        }
      });
    },
  }
};
</script>
