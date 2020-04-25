// import Model from '@/plugins/modeljs';
// import Validator from '@/plugins/modeljs-validator';
import baseModel from '../baseModel';
import {
  mobile,
  email,
  userid,
  password
} from '@/scripts/pattern';

// Model.use(Validator);

class Admin extends baseModel {
  constructor (data) {
    // 调用父类构造函数
    super('Admin', {
      id: {
        type: Number,
        default: null
      },
      roleId: {
        type: String,
        default: null,
        rules: [{
          required: true,
          message: '请选择角色'
        }]
      },
      userid: {
        type: String,
        default: '',
        rules: [{
          required: true,
          message: '用户名不能为空'
        }, {
          pattern: userid,
          message: '用户名要求3到12位（字母，数字，下划线，减号）'
        }]
      },
      pwd: {
        type: String,
        default: null,
        rules: [{
          required: true,
          message: '密码不能为空'
        }, {
          pattern: password,
          message: '密码要求3到12位（字母，数字，下划线，减号）'
        }]
      },
      nickname: {
        type: String,
        default: '',
        rules: [{
          max: 40,
          message: '用户昵称不能超过40个字符'
        }]
      },
      mobile: {
        type: String,
        default: '',
        rules: [{
          required: true,
          message: '手机号码不能为空'
        }, {
          pattern: mobile,
          message: '手机号码格式不正确'
        }]
      },
      email: {
        type: String,
        default: '',
        rules: [{
          pattern: email,
          message: '邮箱格式不正确'
        }]
      },
      regtime: {
        type: Number
      },
      appid: {
        type: String,
        default: null
      },
      flag: {
        type: Number,
        default: 1
      }
    });

    super.getDataByModel(data);
  }

  // 静态属性
  static flags = {
    enabled: 1, // 启用
    disabled: 0, // 禁用
  }

  // 登录
  login () {
    let data = this.toData();
    return this.post('/common/login', data);
  }

  // 列表
  list ({
    page,
    limit,
    userid
  }) {
    return this.post('/admin/list', {
      page,
      limit,
      userid
    });
  }

  select () {
    return this.post('/admin/select');
  }

  delete (userid) {
    return this.post('/admin/delete', {
      userid
    });
  }

  save (userid) {
    let data = this.toData();
    return this.post(`${userid
      ? '/admin/update'
      : '/admin/add'}`, data);
  }

  updatePwd () {
    let {
      userid,
      pwd
    } = this.toData();
    return this.post('/admin/updatePwd', {
      userid,
      pwd
    });
  }

  info (userid) {
    return this.post('/admin/info', {
      userid
    });
  }
}

export default Admin;