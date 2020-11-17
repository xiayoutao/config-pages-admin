/* eslint-disable no-undef */
// import Vue from 'vue';
// import VueRouter from 'vue-router';

Vue.use(VueRouter);

const importPage = view => () => import(`@/views/${view}.vue`);

const Routers = new VueRouter({
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


Routers.beforeEach(async (to, from, next) => {
  console.log(to, from);
});

export default Routers;