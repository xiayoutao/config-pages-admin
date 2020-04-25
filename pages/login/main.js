import '@babel/polyfill';
import Vue from 'vue';
import store from '@/store';

Vue.config.productionTip = false;

import 'element-ui/lib/theme-chalk/index.css';
import './element-ui';

import axios, { httpResponseHandle } from '@/scripts/axios';

import VueCookie from 'vue-cookie';
Vue.use(VueCookie);

import App from './App.vue';
import router from './router';

import {
  validateFormMsg,
  messageCallback,
} from '@/scripts/common';

// 挂载全局
Vue.prototype.$http = axios; // ajax请求方法
Vue.prototype.$httpResponseHandle = httpResponseHandle;
Vue.prototype.$messageCallback = messageCallback; // 错误提示
Vue.prototype.$validateFormMsg = validateFormMsg;

new Vue({
  store,
  router,
  render: (h) => h(App)
}).$mount('#app');