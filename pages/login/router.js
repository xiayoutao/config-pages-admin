import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const importPage = view => () => import(`@/views/${view}.vue`);

export default new Router({
  mode: 'history',
  scrollBehavior: () => ({
    x: 0,
    y: 0
  }),
  routes: [{
    path: '*',
    component: importPage('common/login')
  }, {
    path: '/',
    component: importPage('common/login'),
    meta: {
      title: '登录页',
      icon: 'rt-icon-warning'
    }
  }]
});