import Model from '@/plugins/modeljs';
import Validator from '@/plugins/modeljs-validator';
import baseModel from '../baseModel';
import {
  paramKey
} from '@/scripts/pattern';

Model.use(Validator);

class Config extends baseModel {
  constructor (data) {
    super('Config', {
      id: {
        type: Number,
        default: null,
      },
      paramKey: {
        type: String,
        default: '',
        rules: [{
          required: true,
          message: '参数名不能为空',
          trigger: 'blur'
        }, {
          pattern: paramKey,
          message: '参数名为2到20位英文字母',
          trigger: 'blur'
        }]
      },
      paramValue: {
        type: String,
        default: '',
        rules: [{
          required: true,
          message: '参数值不能为空'
        }, {
          max: 100,
          message: '参数值不能超过100个字符'
        }]
      },
      remark: {
        type: String,
        default: '',
        rules: [{
          max: 40,
          message: '备注不能超过40个字符'
        }]
      }
    });

    super.getDataByModel(data);
  }

  // 列表
  list ({
    page,
    limit,
    paramKey
  }) {
    return this.post('/config/list', {
      page,
      limit,
      paramKey
    });
  }

  select () {
    return this.post('/config/select');
  }

  delete (ids) {
    return this.post('/config/delete', {
      ids
    });
  }

  save () {
    let data = this.toData();
    return this.post(`${data.id ? '/config/update' : '/config/add'}`, data);
  }

  info (id) {
    return this.post('/config/info', {
      id
    });
  }
}

export default Config;