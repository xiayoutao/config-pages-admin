<template>
  <div class="page-login">
    <div class="login-box">
      <div class="title">
        <h1>后台管理系统</h1>
      </div>
      <el-form ref="dataForm" class="login-form" :model="dataForm" :rules="rules" status-icon size="large" @keyup.enter.native="dataFormSubmit()">
        <el-form-item prop="userid">
          <el-input v-model="dataForm.userid" autocomplete="off" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item prop="pwd">
          <el-input v-model="dataForm.pwd" type="password" autocomplete="off" placeholder="密码"></el-input>
        </el-form-item>
        <!-- <el-form-item prop="captcha">
        <el-input v-model="dataForm.captcha" autocomplete="off" placeholder="验证码" style="width: 132px;"></el-input>
        <img class="img-captcha" :src="captchaUrl" @click="handleResetCaptcha">
      </el-form-item> -->
        <el-form-item>
          <el-button type="primary" :loading="ajaxLoading" @click="dataFormSubmit()" style="width: 100%;">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- <p class="copyright" v-html="copyright"></p> -->
    <p class="version">{{ version }}</p>
  </div>
</template>

<script>
import { login } from '@/apis/common';
import {
  getUUID,
  isEmptyObject,
} from '@/common/utils';
import Validate from '@/mixins/validate';
import {
  userid,
  password
} from '@/common/pattern';

export default {
  mixins: [Validate],
  data() {
    return {
      usecaptcha: false, // 是否需要验证码
      dataForm: {
        appid: '',
        userid: '',
        pwd: '',
        uuid: '',
        captcha: ''
      },
      time: new Date().getTime(),
      captchaPath: '/api/common/captcha', // 验证码图片路径
      rules: {
        userid: [
          { required: true, message: '用户名不能为空' },
          { pattern: userid, message: '用户名要求3到12位（字母，数字，下划线，减号）' }
        ],
        pwd: [
          { required: true, message: '密码不能为空' },
          { pattern: password, message: '密码要求3到12位（字母，数字，下划线，减号）' }
        ],
        captcha: [{ required: true, message: '验证码不能为空' }],
      }
    };
  },
  computed: {
    version() {
      return '版本：' + this.$store.state.version;
    },
    copyright() {
      return this.$store.state.copyright;
    },
    captchaUrl() {
      return `${this.captchaPath}?t=${this.time}`;
    }
  },
  activated() {
    this.getCaptcha();
  },
  methods: {
    // 提交表单
    async dataFormSubmit() {
      this.$refs.dataForm.validate(async (valid) => {
        if (valid) {
          const data = await login(this.dataForm);
          if (!isEmptyObject(data)) {
            this.$messageCallback('success', '登录成功，页面跳转中...', () => {
              this.$cookie.set('user', JSON.stringify(data.user));
              this.$cookie.set('token', data.token);
              location.href = '/';
            });
          } else {
            this.handleResetCaptcha();
          }
        } else {
          return false;
        }
      });
    },
    handleResetCaptcha() {
      this.time = new Date().getTime();
    }
  },
  watch: {
    'dataForm.captcha'(val) { // 监听输入的验证码，自动转大写
      if (val === val.toUpperCase()) return;
      this.dataForm.captcha = val.toUpperCase();
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
    height: 24rem;
    margin: -12rem 0 0 -9rem;

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

  .img-captcha {
    float: right;
    height: 40px;
    vertical-align: middle;
    cursor: pointer;
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
