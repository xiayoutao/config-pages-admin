import Vue from 'vue';
import Router from 'vue-router';
import store from '@/store';
import {
  RouterTabRoutes
} from 'vue-router-tab';
import {
  treeDataTranslate,
} from '@/scripts/treeUtils';
import { isEmptyObject } from '@/scripts/utils.js';
import { getMenuAccess } from '@/apis/sys/menu.js';

const importPage = view => () => import(`@/views${view}.vue`);
const importLayout = view => () => import(`@cps/layout/Frame-${view}.vue`);

// 全局路由
const mainRoutes = [{
  path: '/',
  name: 'main',
  component: importLayout('Default'),
  redirect: store.state.defaultPage,
  children: [{
    name: '首页',
    path: '/home',
    component: importPage('/common/home'),
    meta: {
      title: '首页',
      icon: 'xyt-ios-home',
      isMain: true
    }
  }, {
    path: '/404',
    name: '404', // 这里必需加一个唯一的name值，否则其他动态路由都会跳转到404页面
    component: importPage('/common/404'),
    meta: {
      title: '找不到页面',
      icon: 'rt-icon-warning',
      isMain: true
    }
  }]
}];

Vue.use(Router);

const VueRouter = new Router({
  mode: 'history',
  scrollBehavior: () => ({
    x: 0,
    y: 0
  }),
  isAddDynamicRoutes: false, // 是否已经添加动态(菜单)路由
  routes: mainRoutes
});

VueRouter.beforeEach(async (to, from, next) => {
  if (VueRouter.options.isAddDynamicRoutes) {
    next();
  } else if (!VueRouter.options.isAddDynamicRoutes && to.path !== from.path) { // 已经添加好动态路由，并且from和to的path不一致
    const data = await getMenuAccess();
    if (!isEmptyObject(data)) {
      fnAddDynamicRoutes(data.list);
      VueRouter.options.isAddDynamicRoutes = true;
      const menuListLevel = treeDataTranslate(data.list, 'mid');
      store.commit('common/updateMenuList', menuListLevel);
      sessionStorage.setItem('menuList', JSON.stringify(data.list));
      sessionStorage.setItem('permissions', data.permissions);
      next({
        ...to,
        replace: true
      });
    } else {
      sessionStorage.setItem('menuList', '[]');
      sessionStorage.setItem('permissions', '');
      next();
    }
    next();
  }
  next();
});

/**
 * 添加动态路由
 * @param {*} menuList 菜单列表
 * @param {*} routes 递归创建的动态路由
 */
function fnAddDynamicRoutes (menuList = [], routes = []) {
  console.log('%c<---- 新增动态路由 start ---->', 'color:pink');
  var temp = [];
  for (var i = 0; i < menuList.length; i++) {
    if (menuList[i].children && menuList[i].children.length >= 1) {
      temp = temp.concat(menuList[i].children);
    } else if (menuList[i].path && /\S/.test(menuList[i].path)) {
      var route = {
        path: menuList[i].path,
        component: null,
        name: menuList[i].name,
        // 没有meta，vue-router-tab组件不能显示标签信息
        meta: {
          icon: menuList[i].icon,
          title: menuList[i].name,
          tips: menuList[i].name,
          isDynamic: true, // 标识为动态路由
        }
      };
      try {
        route.component = importPage(`${menuList[i].path}`) || null;
      } catch (e) {
        console.log(e);
      }
      routes.push(route);
    }
  }
  if (temp.length >= 1) {
    fnAddDynamicRoutes(temp, routes);
  } else {
    mainRoutes[0].children = [...routes, ...RouterTabRoutes];
    VueRouter.addRoutes([
      ...mainRoutes
    ]);
    sessionStorage.setItem('dynamicRoutes', JSON.stringify(mainRoutes[0].children || '[]'));
    console.log('%c<---- 新增动态路由 end ---->', 'color:pink');
  }
}

export default VueRouter;
