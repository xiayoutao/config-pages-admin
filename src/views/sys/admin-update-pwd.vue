<template>
  <el-dialog class="dialog-sm" title="修改密码" :close-on-click-modal="false" @close="$emit('close')" :visible.sync="visible">
    <el-form ref="dataForm" :model="dataForm" :rules="rules" label-width="80px" @keyup.enter.native="dataFormSubmit()">
      <el-form-item label="新密码" prop="pwd">
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
import {
  updateAdminPwd,
} from '@/apis/system.js';
import {
  password,
} from '@/scripts/pattern';

export default {
  data () {
    return {
      visible: false,
      dataForm: {
        userid: null,
        pwd: null,
      },
      rules: {
        pwd: [
          { required: true, message: '密码不能为空', },
        ],
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
      this.$refs.dataForm.validate(async (valid) => {
        if (valid) {
          if (this.ajaxLoading) {
            return false;
          }
          this.ajaxLoading = true;
          const data = await updateAdminPwd(this.dataForm);
          this.ajaxLoading = false;
          console.log(data);
          if (data) {
            this.visible = false;
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