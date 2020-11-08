<template>
  <el-dialog class="dialog-sm" title="修改排序" :close-on-click-modal="false" @close="$emit('close')" :visible.sync="visible">
    <el-form ref="dataForm" :model="dataForm" :rules="rules" label-width="80px" @keyup.enter.native="dataFormSubmit()">
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
} from '@/apis/love';

export default {
  data () {
    return {
      visible: false,
      dataForm: {
        id: null,
        sort: 50,
      },
      rules: {
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
      this.$refs.dataForm.validate(async (valid) => {
        if (valid) {
          if (this.ajaxLoading) {
            return false;
          }
          this.ajaxLoading = true;
          let data = await updatePhotoSort(this.dataForm);
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
