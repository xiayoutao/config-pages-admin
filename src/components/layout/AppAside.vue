<template>
  <aside class="app-sd">
    <div class="app-sd-menu">
      <el-menu ref="sidebarMenu" :default-active="menuActiveName" :collapse="sidebarFold" :collapseTransition="false" :unique-opened="true">
        <el-menu-item index="/home" @click.native="$router.push({path: '/home'})">
          <i :class="$iconfont + 'xyt-ios-home'"></i>
          <span>首页</span>
        </el-menu-item>
        <sidebar-item v-for="(item, index) in menuList" :key="index" :dynamicRoutes="dynamicRoutes" :menu="item"></sidebar-item>
      </el-menu>
    </div>
    <footer class="app-sd-ft">
      <site-link />
    </footer>
  </aside>
</template>

<script>
import SidebarItem from './SidebarItem';
import SiteLink from './SiteLink.vue';
import { treeDataTranslate } from '@/common/treeUtils';

export default {
  name: 'AppAside',
  computed: {
    menuActiveName: {
      get() {
        return this.$store.state.common.menuActiveName;
      },
      set(val) {
        this.$store.commit('common/updateMenuActiveName', val);
      }
    },
    sidebarFold() {
      return this.$store.state.common.sidebarFold;
    },
    menuList() {
      return this.$store.state.common.menuList;
    },
    dynamicRoutes() {
      return JSON.parse(sessionStorage.getItem('dynamicRoutes') || '[]');
    }
  },
  created() {
    console.log(this.$route);
    this.routeHandle(this.$route);
  },
  methods: {
    // 路由操作
    routeHandle(route) {
      if (route.path) {
        this.menuActiveName = route.path; // 设置当前菜单
      } else {
        this.menuActiveName = route.id;
      }
      if (route.meta.isDynamic) {
        route = this.dynamicRoutes.filter(item => item.name === route.name)[0];
        if (!route) {
          this.$router.push({
            path: '/404'
          }).catch(err => {
            console.log('输出报错');
          });
        }
      }
    }
  },
  watch: {
    $route: 'routeHandle'
  },
  components: {
    SidebarItem,
    SiteLink
  }
};
</script>
