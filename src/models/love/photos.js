import baseModel from '../baseModel';

class Photos extends baseModel {
  constructor (data) {
    super('Photos', {
      id: {
        type: Number,
        default: 0
      },
      title: {
        type: String,
        default: '',
        rules: [{
          required: true,
          message: '标题不能为空'
        }, {
          max: 90,
          message: '标题不能超过90个字符'
        }]
      },
      url: {
        type: String,
        default: '',
        rules: [{
          required: true,
          message: '照片地址不能为空'
        }, {
          max: 400,
          message: '照片地址不能超过45个字符'
        }]
      },
      sort: {
        type: Number,
        default: 50,
        rules: [{
          required: true,
          message: '排序号不能为空'
        }, {
          type: 'number',
          min: 0,
          message: '排序号必须大于等于0'
        }]
      },
      addtime: {
        type: Number
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
    appid,
    type
  }) {
    return this.post('/photos/list', {
      page,
      limit,
      appid,
      type
    });
  }

  /**
   * 下拉数据
   * type: 0图片，1音频，2视频
   */
  select (type, appid) {
    return this.post('/photos/select', {
      type,
      appid
    });
  }

  delete (ids, appid) {
    return this.post('/photos/delete', {
      ids,
      appid
    });
  }

  updateSort () {
    let data = this.toData();
    return this.post('/photos/updateSort', {
      id: data.id,
      sort: data.sort,
      appid: data.appid
    });
  }

  save () {
    let data = this.toData();
    return this.post(`${data.id ? '/photos/update' : '/photos/add'}`, data);
  }

  info (id) {
    return this.post('/photos/info', {
      id
    });
  }
}

export default Photos;