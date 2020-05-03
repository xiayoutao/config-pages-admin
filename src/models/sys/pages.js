import Model from '@/plugins/modeljs';
import Validator from '@/plugins/modeljs-validator';
import baseModel from '../baseModel';

Model.use(Validator);

class Pages extends baseModel {
  constructor (data) {
    super('Pages', {
      id: {
        type: Number,
        default: null,
      },
      config: {
        type: String,
        default: null
      },
      layouts: {
        type: String,
        default: '',
        rules: [{
          required: true,
          message: '页面不能为空，请添加组件',
        }]
      },
      userid: {
        type: String,
        default: null
      },
      addtime: {
        type: Number
      },
    });

    super.getDataByModel(data);
  }

  // 列表
  list ({
    page,
    limit,
    userid,
  }) {
    return this.post('/pages/list', {
      page,
      limit,
      userid,
    });
  }

  delete (id) {
    return this.post('/pages/delete', id);
  }

  save (data) {
    return this.post('/pages/save', data);
  }

  info (id) {
    return this.post('/pages/info', {
      id
    });
  }
}

export default Pages;