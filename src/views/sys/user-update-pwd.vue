<template>
  <el-dialog class="dialog-sm" title="修改密码" :close-on-click-modal="false" @close="$emit('close')" :visible.sync="visible">
    <el-form ref="dataForm" :model="dataForm" label-width="80px" @keyup.enter.native="dataFormSubmit()">
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
  updateUserPwd,
} from '@/apis/sys/user.js';
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
          { pattern: password, message: '密码要求3到12位（字母，数字，下划线，减号）', },
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
    async dataFormSubmit () {
      if (this.ajaxLoading) {
        return false;
      }
      this.ajaxLoading = true;
      this.$refs.dataForm.validate(async (valid) => {
        if (valid) {
          const data = await updateUserPwd(this.dataForm);
          if (data) {
            this.$messageCallback('success', '操作成功', () => {
              this.ajaxLoading = false,
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