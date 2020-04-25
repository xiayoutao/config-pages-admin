<template>
  <div class="page-login">
    <div class="login-box">
      <div class="title">
        <h1>后台管理系统</h1>
      </div>
      <el-form ref="dataForm" class="login-form" :model="dataForm" :show-message="validateShowMessage" status-icon @keyup.enter.native="dataFormSubmit()">
        <el-form-item prop="userid" :error="validateErrors.userid">
          <el-input v-model="dataForm.userid" size="large" autocomplete="off" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item prop="pwd" :error="validateErrors.pwd">
          <el-input v-model="dataForm.pwd" type="password" size="large" autocomplete="off" placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="large" :loading="ajaxLoading" @click="dataFormSubmit()" style="width: 100%;">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- <p class="copyright" v-html="copyright"></p> -->
    <p class="version">{{ version }}</p>
  </div>
</template>

<script>
import Admin from '@/models/sys/admin';
import { getUUID } from '@/scripts/utils';
import Validate from '@/mixins/validate';

export default {
  mixins: [Validate],
  data () {
    return {
      usecaptcha: false, // 是否需要验证码
      dataForm: {
        appid: '',
        userid: '',
        pwd: '',
        uuid: '',
        captcha: ''
      },
      captchaPath: '' // 验证码图片路径
    };
  },
  computed: {
    version () {
      return '版本：' + this.$store.state.version;
    },
    copyright () {
      return this.$store.state.copyright;
    },
    userId: {
      get () {
        return this.$store.state.user.id;
      },
      set (val) {
        this.$store.commit('user/updateId', val);
      }
    },
    userName: {
      get () {
        return this.$store.state.user.name;
      },
      set (val) {
        this.$store.commit('user/updateName', val);
      }
    }
  },
  activated () {
    this.getCaptcha();
  },
  methods: {
    // 提交表单
    dataFormSubmit () {
      this.validateShowMessage = true;
      this.validateForm(FormDataModel => {
        FormDataModel.login().then(({ data }) => {
          let resultData = this.$httpResponseHandle(data);
          if (resultData) {
            this.$messageCallback('success', '登录成功，页面跳转中...');
            this.$cookie.set('user', JSON.stringify(resultData.user));
            this.$cookie.set('token', resultData.token);
            location.href = '/';
          }
        });
      });
    },
    /**
     * 校验表单数据
     * @param {function} success 验证成功执行的方法
     */
    validateForm (success) {
      let FormDataModel = new Admin(this.dataForm);
      FormDataModel.validate(['userid', 'pwd'])
        .then(() => {
          this.$validateFormMsg.call(this, this.$refs.dataForm.fields);
          success && success(FormDataModel);
        })
        .catch(errors => {
          this.$validateFormMsg.call(this, this.$refs.dataForm.fields, errors);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.page-login {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('/img/login_bg.jpg') no-repeat center;
  background-size: cover;

  .login-box {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 18rem;
    height: 22rem;
    margin: -11rem 0 0 -9rem;

    .title {
      position: relative;

      h1 {
        position: relative;
        z-index: 2;
        display: block;
        margin: 0 0 50px;
        padding: 0;
        color: #fff;
        text-align: center;
        font-size: 22px;
        line-height: 1.5;
      }
    }

    .el-input__inner {
      width: 100%;
    }
  }

  .copyright,
  .version {
    position: fixed;
    left: 0;
    right: 0;
    margin: 0;
    text-align: center;
    font-size: 12px;
    color: #fff;
  }

  .copyright {
    bottom: 40px;
  }
  .version {
    bottom: 20px;
  }
}
</style>
