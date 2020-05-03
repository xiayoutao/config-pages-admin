import Model from '@/plugins/modeljs';
import Validator from '@/plugins/modeljs-validator';
import $http from '@/scripts/axios';
import mergeWith from 'lodash/mergeWith';

Model.use(Validator);

class baseModel {
  constructor (tableName, attributes) {
    // 定义模型，并把值赋给this.model
    this.model = Model.define(tableName, attributes);
  }

  /**
   * 获取数据模型
   */
  getModel () {
    return this.model;
  }

  /**
   * 获取根据模型格式化后的数据
   * 在继承类的constructor中使用super.getDataByModel(data)调用
   * @param {Object} data
   */
  getDataByModel (data) {
    this.data = new this.model(data);
    return this.data;
  }

  /**
   * 校验数据
   * @param {Array} filters 待校验的字段，为空则按模型中设置的进行校验
   */
  validate (filters) {
    return new Promise((resolve, reject) => {
      this.data.validate(filters).then(function () {
        resolve();
      }).catch(function (errors) {
        console.log('验证失败', errors);
        reject(errors);
      });
    });
  }

  /**
   * 格式化数据
   */
  toData () {
    return this.data.toData();
  }

  async post (url, data) {
    return await $http({
      url: $http.adornUrl(url),
      method: 'post',
      data: data ? $http.adornData(data) : null,
    });
  }

  async get (url, params) {
    return await $http({
      url: $http.adornUrl(url),
      method: 'get',
      params: params ? $http.adornParams(params) : null
    });
  }

  async http (options) {
    let httpOpts = mergeWith({}, options, function (objValue, srcValue, key) {
      if (key === 'url') {
        return $http.adornUrl(srcValue);
      } else if (key === 'params') {
        return $http.adornParams(srcValue);
      } else if (key === 'data') {
        return $http.adornData(srcValue);
      } else {
        return srcValue;
      }
    });

    return await $http(httpOpts);
  }
}

export default baseModel;
