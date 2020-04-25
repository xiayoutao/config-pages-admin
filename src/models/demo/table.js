import baseModel from '../baseModel';

class Table extends baseModel {
  constructor (data) {
    super('Table', {
      id: {
        type: Number,
        default: null,
      },
      username: {
        type: String,
        default: null
      },
      sex: {
        type: Number,
        default: 1
      },
      age: {
        type: Number,
        default: 0
      },
      city: {
        type: String,
        default: null
      }
    });

    super.getDataByModel(data);
  }

  static sexs = {
    man: 1,
    woman: 2
  };

  // 列表
  list ({
    page,
    limit,
    paramKey
  }) {
    return this.post('/table/list', {
      page,
      limit,
      paramKey
    });
  }

  xlsx (data) {
    return this.http({
      url: '/table/xlsx',
      data: {
        list: data
      },
      responseType: 'blob',
    });
  }

  delete (ids) {
    return this.post('/table/delete', {
      ids
    });
  }

  save () {
    let data = this.toData();
    return this.post(`${data.id
      ? '/table/update'
      : '/table/add'}`, data);
  }

  info (id) {
    return this.post('/table/info', {
      id
    });
  }
}

export default Table;