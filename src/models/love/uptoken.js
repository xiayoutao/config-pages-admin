import baseModel from '../baseModel';

class Token extends baseModel {
  constructor (data) {
    super('Token', {
      id: {
        type: Number,
        default: 0
      },
      uptoken: {
        type: String,
        default: ''
      }
    });

    super.getDataByModel(data);
  }

  get () {
    return this.post('/qiniu/uptoken');
  }
}

export default Token;