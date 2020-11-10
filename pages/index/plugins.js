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
import {
  isEmptyObject,
} from '@/scripts/utils.js';
import * as formatter from '@/scripts/formatter'; // Table组件 formatter方法
import * as getFormatValue from '@/scripts/getFormatValue';

export default {
  install (Vue, options) {
    // 挂载全局
    Vue.prototype.isEmptyObject = isEmptyObject;
    Vue.prototype.permisson = permisson;
    Vue.prototype.formatHttpData = formatHttpData; // 处理http返回值
    Vue.prototype.formatDate = formatDate; // 格式化日期
    Vue.prototype.zeroize = zeroize; // 补位
    Vue.prototype.$messageCallback = messageCallback; // 错误提示
    Vue.prototype.$validateFormMsg = validateFormMsg;
    Vue.prototype.$createUrlByKey = createUrlByKey;
    Vue.prototype.$createImageUrl = createImageUrl;
    Vue.prototype.$formatter = formatter;

    Object.keys(getFormatValue).forEach(item => {
      Vue.prototype['$' + item] = getFormatValue[item];
    });

    Vue.directive('imgurl', imgurl);

    Vue.directive('permisson', isAuth);
  }
};
