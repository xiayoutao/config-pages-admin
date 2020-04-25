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
import Config from '@/models/sys/config';
import Validate from '@/mixins/validate';

export default {
  mixins: [Validate],
  data () {
    return {
      visible: false,
      dataForm: {},
      id: null
    };
  },
  methods: {
    init (id) {
      this.id = id;
      this.visible = true;
      this.$nextTick(() => {
        let configModel = new Config();
        if (id) {
          configModel.info(id).then(({ data }) => {
            let resultData = this.$httpResponseHandle(data);
            if (resultData) {
              this.initData(resultData);
            }
          });
        } else {
          let dataForm = configModel.toData();
          this.initData(dataForm);
        }
      });
    },
    // 设置dataForm对象属性
    initData (dataForm) {
      let keys = Object.keys(dataForm);
      keys.forEach(item => {
        this.$set(this.dataForm, item, dataForm[item]);
      });
    },
    // 表单提交
    dataFormSubmit () {
      this.validateShowMessage = true;
      this.validateForm(FormDataModel => {
        FormDataModel.save(this.id).then(({ data }) => {
          let resultData = this.$httpResponseHandle(data);
          if (resultData) {
            this.$messageCallback('success', '操作成功');
            this.$emit('refreshDataList');
            this.visible = false;
          }
        });
      });
    },
    validateForm (success) {
      let FormDataModel = new Config(this.dataForm).model;
      FormDataModel.validate(['paramKey', 'paramValue', 'remark'])
        .then(() => {
          this.$validateFormMsg.call(this, this.$refs.dataForm.fields);
          success && success(FormDataModel);
        })
        .catch(errors => {
          console.log('验证失败', errors);
          this.$validateFormMsg.call(this, this.$refs.dataForm.fields, errors);
        });
    }
  }
};
</script>
