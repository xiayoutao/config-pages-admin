<template>
  <el-dialog class="dialog-sm" title="修改密码" :close-on-click-modal="false" @close="$emit('close')" :visible.sync="visible">
    <el-form :model="dataForm" ref="dataForm" :show-message="validateShowMessage" label-width="80px" @keyup.enter.native="dataFormSubmit()">
      <el-form-item label="新密码" prop="pwd" :error="validateErrors.pwd">
        <el-input v-model="dataForm.pwd" type="password" placeholder="新密码"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" :loading="ajaxLoading" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import Admin from '@/models/sys/admin';
import Validate from '@/mixins/validate';

export default {
  mixins: [Validate],
  data () {
    return {
      visible: false,
      dataForm: {
        userid: null,
        pwd: null
      }
    };
  },
  methods: {
    init (userid) {
      this.visible = true;
      this.dataForm.userid = userid;
    },
    // 表单提交
    dataFormSubmit () {
      this.validateShowMessage = true;
      this.validateForm(FormDataModel => {
        FormDataModel.updatePwd().then(({ data }) => {
          let resultData = this.$httpResponseHandle(data);
          if (resultData) {
            this.$messageCallback('success', '操作成功');
            this.visible = false;
          }
        });
      });
    },
    validateForm (success) {
      let FormDataModel = new Admin(this.dataForm);
      FormDataModel.validate(['userid', 'pwd'])
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