/* eslint-disable no-undef */
import 'core-js/stable';
import 'regenerator-runtime/runtime';

// import Vue from 'vue';
import store from '@/store';
import 'element-ui/lib/theme-chalk/index.css';
import './element-ui';

Vue.config.productionTip = false;

import VueCookie from 'vue-cookie';
Vue.use(VueCookie);

import App from './App.vue';
import router from './router';

import {
  validateFormMsg,
  messageCallback,
} from '@/common/common';

// 挂载全局
Vue.prototype.$messageCallback = messageCallback; // 错误提示
Vue.prototype.$validateFormMsg = validateFormMsg;

new Vue({
  store,
  router,
  render: (h) => h(App)
}).$mount('#app');