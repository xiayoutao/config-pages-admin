import baseModel from '../baseModel';

class Logs extends baseModel {
  constructor (data) {
    super('Logs', {
      id: {
        type: Number,
        default: null
      },
      userid: {
        type: String,
        default: null
      },
      type: {
        type: String,
        default: null
      },
      category: {
        type: String,
        default: null,
      },
      level: {
        type: String,
        default: null,
      },
      result: {
        type: String,
        default: null,
      },
      ip: {
        type: String,
        default: null,
      },
      url: {
        type: String,
        default: null,
      },
      data: {
        type: String,
        default: null,
      },
      msg: {
        type: String,
        default: null,
      },
      logtime: {
        type: Number
      },
    });

    super.getDataByModel(data);
  }

  static results = {
    success: 'SUCCESS',
    fail: 'FAIL',
    error: 'ERROR'
  }

  // 列表
  list ({
    page,
    limit,
    level,
    userid,
    category,
    result
  }) {
    return this.post('/logs/list', {
      page,
      limit,
      level,
      userid,
      category,
      result
    });
  }

  delete (ids) {
    return this.post('/logs/delete', {
      ids
    });
  }
}

export default Logs;