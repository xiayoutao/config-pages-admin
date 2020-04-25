import baseModel from '../baseModel';

class Bless extends baseModel {
  constructor (data) {
    super('Bless', {
      id: {
        type: Number,
        default: 0
      },
      nickname: {
        type: String,
        default: '',
        rules: [{
          required: true,
          message: '昵称不能为空'
        }, {
          max: 50,
          message: '昵称不能超过50个字符'
        }]
      },
      avatar: {
        type: String,
        default: '',
        rules: [{
          required: true,
          message: '头像不能为空'
        }, {
          max: 200,
          message: '头像不能超过200个字符'
        }]
      },
      addtime: {
        type: Number
      },
      openid: {
        type: String,
        default: '',
        rules: [{
          required: true,
          message: '用户openid不能为空'
        }, {
          max: 30,
          message: '用户openid不能超过30个字符'
        }]
      },
      appid: {
        type: String,
        default: '',
        rules: [{
          required: true,
          message: '小程序AppID不能为空'
        }, {
          max: 20,
          message: '小程序AppID不能超过20个字符'
        }]
      }
    });

    super.getDataByModel(data);
  }

  // 列表
  list ({
    page,
    limit,
    appid
  }) {
    return this.post('/bless/list', {
      page,
      limit,
      appid
    });
  }
}

export default Bless;