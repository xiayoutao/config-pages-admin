import baseModel from '../baseModel';

class File extends baseModel {
  constructor (data) {
    super('File', {
      id: {
        type: Number,
        default: 0
      },
      name: {
        type: String,
        default: '',
        rules: [{
          required: true,
          message: '文件名不能为空'
        }, {
          max: 100,
          message: '文件名不能超过100个字符'
        }]
      },
      /** 非数据库字段 */
      key: {
        type: String,
        default: '',
        rules: [{
          required: true,
          message: 'key不能为空'
        }, {
          max: 45,
          message: 'key不能超过45个字符'
        }]
      },
      urlkey: {
        type: String,
        default: '',
      },
      filetype: {
        type: String,
        default: '',
      },
      filesize: {
        type: Number,
        default: 0,
      },
      type: {
        type: Number,
        default: '',
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
      },
      flag: {
        type: Number,
        default: 1,
      }
    });

    super.getDataByModel(data);
  }

  static types = {
    image: 0, // 图片累心
    audio: 1, // 音频
    video: 2 // 视频（暂时没用到）
  };

  static mineTypes = {
    image: ['image/jpg', 'image/jpeg', 'image/png', 'image/gif'],
    audio: ['audio/mp3']
  };

  // 列表
  list ({
    page,
    limit,
    appid,
    type
  }) {
    return this.post('/file/list', {
      page,
      limit,
      appid,
      type
    });
  }

  select (type, appid) {
    return this.post('/file/select', {
      type,
      appid
    });
  }

  delete (ids, appid) {
    return this.post('/file/delete', {
      ids,
      appid
    });
  }

  save () {
    let data = this.toData();
    return this.post('/file/upload', data);
  }
}

export default File;