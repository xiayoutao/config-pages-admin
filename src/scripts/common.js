/* eslint-disable new-cap */
import store from '@/store';
import VueCookie from 'vue-cookie';
import {
  Message
} from 'element-ui'; // 只引入message组件

/**
 * 清除登录信息
 */
export function clearLoginInfo () {
  VueCookie.delete('token');
  VueCookie.delete('user');
  sessionStorage.clear();
}

/**
 * 消息
 * @param {*} type 类型
 * @param {*} msg 消息内容
 * @param {*} callback 回调
 */
export function messageCallback (type, msg, callback) {
  Message({
    type: type,
    message: msg,
    duration: 2000,
    onClose: () => {
      callback && callback();
    }
  });
}

/**
 * 格式化接口返回数据
 * @param {*} data
 * @param {*} type 在格式化出错时，为type=1，返回{}，否则返回[]
 */
export function formatHttpData (data, type) {
  try {
    return JSON.parse(data);
  } catch (e) {
    if (type && type === 1) {
      return {};
    } else {
      return [];
    }
  }
}

/**
 * 显示表单验证信息
 * @description 方法里面的this为页面传来的this（当前页面Vue对象）
 * @description 方法里面的this.errors在全局mixin里设置的，页面data里不需要加errors
 * @param {array} fields 表单设置的需要验证的字段
 * @param {array} errors 错误信息
 */
export function validateFormMsg (fields, errors) {
  errors = errors || [];
  // 验证失败后可根据场景使用合适的方式将 message 展示给用户
  // let err = errors.shift();
  // if (err) this.$messageCallback('error', err.message);
  let errorObjs = {};
  errors.forEach(item => {
    errorObjs[item.field] = item.message;
  });
  // 以页面表单设置的prop为准，没有设置prop的字段，即使有错误提示也不展示
  fields.forEach(item => {
    let errorTips = null;
    if (errorObjs[item.prop]) { // 如果页面设置的prop值有错误验证信息
      errorTips = errorObjs[item.prop];
    }
    this.$set(this.validateErrors, item.prop, errorTips);
  });
  this.buttonLoading = false;
}

/**
 * 根据七牛key值生成图片地址
 * @param {*} urlkey
 * @param {*} type
 */
export function createUrlByKey (urlkey, type) {
  let imgSize;
  type === 0 ? imgSize = 30 : imgSize = 1200;
  return store.state.common.cdnUrl + urlkey + `?imageView2/1/w/${imgSize}/h/${imgSize}`;
}

/**
 * 根据七牛图片地址生成不同大小的图片
 * @param {*} url
 * @param {*} type
 */
export function createImageUrl (url, type) {
  let imgSize;
  type === 0 ? imgSize = 30 : imgSize = 1200;
  return url + `?imageView2/1/w/${imgSize}/h/${imgSize}`;
}
