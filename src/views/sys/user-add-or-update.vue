<template>
  <el-dialog class="dialog-common" :title="!userid ? '新增' : '编辑'" :close-on-click-modal="false" @close="$emit('close')" :visible.sync="visible">
    <el-form :model="dataForm" ref="dataForm" :show-message="validateShowMessage" label-width="80px" @keyup.enter.native="dataFormSubmit()">
      <el-form-item label="角色" prop="roleId" :error="validateErrors.roleId" size="mini">
        <el-radio-group v-model="dataForm.roleId">
          <el-radio-button v-for="(item, index) in roleList" :key="index" :label="item.roleId">{{ item.roleName }}</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="用户名" prop="userid" :error="validateErrors.userid">
        <el-input v-model="dataForm.userid" placeholder="登录帐号，密码默认为手机后6位" v-if="!userid"></el-input>
        <el-button class="disabled-input" v-else>{{ dataForm.userid }}</el-button>
      </el-form-item>
      <el-form-item label="昵称" prop="nickname" :error="validateErrors.nickname">
        <el-input v-model="dataForm.nickname" placeholder="昵称"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="mobile" :error="validateErrors.mobile">
        <el-input v-model="dataForm.mobile" placeholder="手机号，密码默认为手机后6位" v-if="!userid"></el-input>
        <el-button class="disabled-input" v-else>{{ dataForm.mobile }}</el-button>
      </el-form-item>
      <el-form-item label="邮箱" prop="email" :error="validateErrors.email">
        <el-input v-model="dataForm.email" placeholder="邮箱"></el-input>
      </el-form-item>
      <el-form-item label="状态" prop="flag" :error="validateErrors.flag" size="mini">
        <el-radio-group v-model="dataForm.flag">
          <el-radio-button :label="flags.enabled">正常</el-radio-button>
          <el-radio-button :label="flags.disabled">禁用</el-radio-button>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" :loading="ajaxLoading" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import Role from '@/models/sys/role';
import Admin from '@/models/sys/admin';
import Validate from '@/mixins/validate';

export default {
  mixins: [Validate],
  data () {
    return {
      visible: false,
      roleList: [],
      userid: null,
      dataForm: {}
    };
  },
  computed: {
    // 用户状态
    flags () {
      return Admin.flags;
    }
  },
  methods: {
    init (userid) {
      this.visible = true;
      this.getRoleList();
      this.dataForm = {};
      this.userid = userid;
      this.$set(this.dataForm, 'roleId', null);
      this.$nextTick(() => {
        let adminModel = new Admin();
        if (userid) {
          adminModel.info(userid).then(({ data }) => {
            let resultData = this.$httpResponseHandle(data);
            if (resultData) {
              this.initData(resultData);
            } else {
              this.visible = true;
            }
          });
        } else {
          let dataForm = adminModel.toData();
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
    // 获取权限列表
    getRoleList () {
      let roleModel = new Role();
      // 0图片，1音频，2视频
      roleModel.select().then(({ data }) => {
        let resultData = this.$httpResponseHandle(data);
        if (resultData) {
          this.roleList = [];
          resultData.forEach(item => {
            this.roleList.push(item);
          });
        }
      });
    },
    // 表单提交
    dataFormSubmit () {
      this.validateShowMessage = true;
      this.validateForm(FormDataModel => {
        FormDataModel.save(this.userid).then(({ data }) => {
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
      let FormDataModel = new Admin(this.dataForm).model;
      FormDataModel.validate([
        'roleId',
        'userid',
        'nickname',
        'mobile',
        'email',
        'falg'
      ])
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
