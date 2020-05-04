<template>
  <el-dialog class="dialog-sm" title="修改排序" :close-on-click-modal="false" @close="$emit('close')" :visible.sync="visible">
    <el-form ref="dataForm" :model="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
      <el-form-item label="排序" prop="sort">
        <el-input-number v-model="dataForm.sort" controls-position="right" :min="0" label="排序号"></el-input-number>
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
  getPhotoInfo,
  updatePhotoSort,
} from '@/apis/love/photos.js';

export default {
  data () {
    return {
      visible: false,
      dataForm: {
        id: null,
        sort: 50,
        appid: null,
      }
    };
  },
  methods: {
    init (id) {
      id = id || 0;
      this.visible = true;
      this.$nextTick(async () => {
        this.dataForm = {};
        if (!id) {
          return false;
        }
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
    // 表单提交
    async dataFormSubmit () {
      if (this.ajaxLoading) {
        return false;
      }
      this.ajaxLoading = true;
      this.$refs.dataForm.validate(async (valid) => {
        if (valid) {
          let data = await updatePhotoSort(this.dataForm);
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
