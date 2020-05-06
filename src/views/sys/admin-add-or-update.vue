<template>
  <el-dialog class="dialog-common" :title="!userid ? '新增' : '编辑'" :close-on-click-modal="false" @close="$emit('close')" :visible.sync="visible">
    <el-form ref="dataForm" :model="dataForm" :rules="rules" label-width="80px" @keyup.enter.native="dataFormSubmit()">
      <el-form-item label="角色" prop="roleId" size="mini">
        <el-radio-group v-model="dataForm.roleId">
          <el-radio-button v-for="(item, index) in roleList" :key="index" :label="item.roleId">{{ item.roleName }}</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="用户名" prop="userid">
        <el-input v-model="dataForm.userid" placeholder="登录帐号，密码默认为手机后6位" v-if="!userid"></el-input>
        <el-button class="disabled-input" v-else>{{ dataForm.userid }}</el-button>
      </el-form-item>
      <el-form-item label="昵称" prop="nickname">
        <el-input v-model="dataForm.nickname" placeholder="昵称"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="mobile">
        <el-input v-model="dataForm.mobile" placeholder="手机号，密码默认为手机后6位" v-if="!userid"></el-input>
        <el-button class="disabled-input" v-else>{{ dataForm.mobile }}</el-button>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="dataForm.email" placeholder="邮箱"></el-input>
      </el-form-item>
      <el-form-item label="状态" prop="flag" size="mini">
        <el-radio-group v-model="dataForm.flag">
          <el-radio-button :label="adminFlags.enabled">正常</el-radio-button>
          <el-radio-button :label="adminFlags.disabled">禁用</el-radio-button>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import {
  adminFlags,
  getAdminInfo,
  insertAdmin,
  updateAdmin,
} from '@/apis/sys/admin.js';
import { getAllRole } from '@/apis/sys/role.js';
import {
  mobile,
  email,
  userid,
  password
} from '@/scripts/pattern';

export default {
  data () {
    return {
      visible: false,
      userid: null,
      roleList: [],
      adminFlags,
      dataForm: {
        roleId: null,
        userid: null,
        nickname: null,
        mobile: null,
        email: null,
        flag: 1,
      },
      rules: {
        roleId: [
          { required: true, message: '请选择角色', },
        ],
        userid: [
          { required: true, message: '用户名不能为空', },
          { pattern: userid, message: '用户名要求3到12位（字母，数字，下划线，减号）', },
        ],
        pwd: [
          { required: true, message: '密码不能为空', },
          { pattern: password, message: '密码要求3到12位（字母，数字，下划线，减号）', },
        ],
        nickname: [
          { max: 20, message: '用户昵称不能超过20个字符', },
        ],
        mobile: [
          { required: true, message: '手机号码不能为空', },
          { pattern: mobile, message: '手机号码格式不正确', },
        ],
        email: [
          { pattern: email, message: '邮箱格式不正确', },
        ],
      }
    };
  },
  methods: {
    init (userid) {
      this.getAllRole();
      this.visible = true;
      this.userid = userid;
      this.$nextTick(async () => {
        this.$refs.dataForm.resetFields();
        if (userid) {
          const data = await getAdminInfo({
            userid,
          });
          if (!this.isEmptyObject(data)) {
            this.dataForm = { ...data };
          } else {
            this.visible = true;
          }
        }
      });
    },
    // 获取权限列表
    async getAllRole () {
      // 0图片，1音频，2视频
      const data = await getAllRole();
      if (!this.isEmptyObject(data)) {
        this.roleList = [];
        data.forEach(item => {
          this.roleList.push(item);
        });
      }
    },
    // 表单提交
    dataFormSubmit () {
      this.$refs.dataForm.validate(async (valid) => {
        if (valid) {
          let data;
          if (this.ajaxLoading) {
            return false;
          }
          this.ajaxLoading = true;
          if (this.userid) {
            data = await updateAdmin(this.dataForm);
          } else {
            data = await insertAdmin(this.dataForm);
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

<style lang="scss">
.mod-user {
  .user-list__input,
  .icon-list__input {
    > .el-input__inner {
      cursor: pointer;
    }
  }

  .el-alert {
    margin-top: 0.5rem;
  }
}
</style>
