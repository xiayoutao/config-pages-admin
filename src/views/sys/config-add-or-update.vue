<template>
  <el-dialog class="dialog-common" :title="!id ? '新增' : '编辑'" :close-on-click-modal="false" @close="$emit('close')" :visible.sync="visible">
    <el-form :model="dataForm" ref="dataForm" :show-message="validateShowMessage" label-width="80px" @keyup.enter.native="dataFormSubmit()">
      <el-form-item label="参数名" prop="paramKey" :error="validateErrors.paramKey">
        <el-input v-model="dataForm.paramKey" placeholder="参数名"></el-input>
      </el-form-item>
      <el-form-item label="参数值" prop="paramValue" :error="validateErrors.paramValue">
        <el-input v-model="dataForm.paramValue" placeholder="参数值"></el-input>
      </el-form-item>
      <el-form-item label="备注" prop="remark" :error="validateErrors.remark">
        <el-input v-model="dataForm.remark" placeholder="备注"></el-input>
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
  getConfigInfo,
  insertConfig,
  updateConfig
} from '@/apis/sys/config.js';

export default {
  data () {
    return {
      visible: false,
      id: null,
      dataForm: {
        paramKey: null,
        paramValue: null,
        remark: null,
      },
    };
  },
  methods: {
    init (id) {
      this.id = id;
      this.visible = true;
      this.$nextTick(async () => {
        if (!id) {
          return;
        }
        const data = await getConfigInfo({
          id,
        });
        if (!this.isEmptyObject(data)) {
          this.dataForm = { ...data };
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
          let data;
          if (this.id) {
            data = await updateConfig(this.dataForm);
          } else {
            data = await insertConfig(this.dataForm);
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
