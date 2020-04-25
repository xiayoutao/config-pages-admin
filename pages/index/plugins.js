import axios, { httpResponseHandle } from '@/scripts/axios';
import isAuth from '@/directives/isAuth';
import imgurl from '@/directives/imgurl';
import permisson from '@/scripts/permisson';
import {
  formatDate,
  zeroize
} from '@/scripts/formatDate';
import {
  formatHttpData,
  messageCallback,
  validateFormMsg,
  createUrlByKey,
  createImageUrl,
} from '@/scripts/common';

export default {
  install (Vue, options) {
    // 挂载全局
    Vue.prototype.$http = axios; // ajax请求方法
    Vue.prototype.formatHttpData = formatHttpData; // 处理http返回值
    Vue.prototype.formatDate = formatDate; // 格式化日期
    Vue.prototype.zeroize = zeroize; // 补位
    Vue.prototype.$messageCallback = messageCallback; // 错误提示
    Vue.prototype.$validateFormMsg = validateFormMsg;
    Vue.prototype.$httpResponseHandle = httpResponseHandle;
    Vue.prototype.permisson = permisson;
    Vue.prototype.$createUrlByKey = createUrlByKey;
    Vue.prototype.$createImageUrl = createImageUrl;

    Vue.directive('imgurl', imgurl);

    Vue.directive('permisson', isAuth);
  }
};
