import {
  mobile
} from '@/scripts/pattern';
import baseModel from '../baseModel';

class Info extends baseModel {
  constructor (data) {
    super('Info', {
      id: {
        type: Number,
        default: 0
      },
      groomName: {
        type: String,
        default: '',
        rules: [{
          required: true,
          message: '新郎姓名不能为空'
        }, {
          min: 2,
          max: 5,
          message: '姓名只能输入2到4个字符！'
        }]
      },
      brideName: {
        type: String,
        default: '',
        rules: [{
          required: true,
          message: '新娘姓名不能为空'
        }, {
          min: 2,
          max: 5,
          message: '姓名只能输入2到4个字符！'
        }]
      },
      weddingDate: {
        type: Number,
        default: Math.floor(Date.now() / 1000),
        rules: [{
          required: true,
          message: '请选择婚礼日期'
        }, {
          type: 'number',
          required: true,
          message: '婚礼日期格式错误'
        }]
      },
      lunarDate: {
        type: String,
        default: '',
        rules: [{
          required: true,
          message: '农历日期不能为空'
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
      address: {
        type: String,
        default: '',
        rules: [{
          required: true,
          message: '婚礼地址不能为空'
        }, {
          max: 100,
          message: '婚礼地址不能超过100个字符'
        }]
      },
      bgimage: {
        type: String,
        default: ''
      },
      moreimg: {
        type: String,
        default: ''
      },
      bgmusic: {
        type: String,
        default: '',
        rules: [{
          required: true,
          message: '请选择背景音乐'
        }]
      },
      coord: {
        type: String,
        default: ''
      },
      share: {
        type: String,
        default: '',
        rules: [{
          required: true,
          message: '分享名称不能为空'
        }, {
          max: 20,
          message: '分享名称不能超过20个字符'
        }]
      },
      thumb: {
        type: String,
        default: '',
        rules: [{
          required: true,
          message: '分享缩略图不能为空'
        }, {
          max: 200,
          message: '分享缩略图不能超过200个字符'
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

  save () {
    let data = this.toData();
    return this.post(`${data.id
      ? '/base/update'
      : '/base/add'}`, data);
  }

  info () {
    return this.post('/base/info');
  }
}

export default Info;