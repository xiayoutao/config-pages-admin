/* eslint-disable no-undef */
import 'core-js/stable';
import 'regenerator-runtime/runtime';

// import Vue from 'vue';
import store from '@/store';
import RouterTab from 'vue-router-tab';
import 'vue-router-tab/dist/lib/vue-router-tab.css';
Vue.use(RouterTab);

import 'element-ui/lib/theme-chalk/index.css';
// import './element-ui';

import VueCookie from 'vue-cookie';
Vue.use(VueCookie);

import App from './App.vue';
import router from './router';

import globalPlugins from './plugins';
Vue.use(globalPlugins);

Vue.prototype.$iconfont = store.state.iconfont;

Vue.config.productionTip = false;

if (process.env.NODE_ENV !== 'production') {
  require('@/mockjs');
}

Vue.mixin({
  data() {
    return {
      ajaxLoading: false,
    };
  }
});

new Vue({
  store,
  router,
  render: (h) => h(App)
}).$mount('#app');