<template>
  <el-submenu v-if="menu.children && menu.children.length > 0" :index="getMenuItemIndex(menu)">
    <template slot="title">
      <i :class="$iconfont + menu.icon"></i>
      <span>{{ menu.name }}</span>
    </template>
    <sidebar-item v-for="(item, index) in menu.children" :key="index" :menu="item" :dynamicRoutes="dynamicRoutes"></sidebar-item>
  </el-submenu>
  <el-menu-item v-else :index="getMenuItemIndex(menu)" @click.native="gotoRouteHandle(menu)">
    <i :class="$iconfont + menu.icon"></i>
    <span>{{ menu.name }}</span>
  </el-menu-item>
</template>

<script>
import SidebarItem from './SidebarItem';

export default {
  name: 'SidebarItem',
  props: {
    menu: {
      type: Object,
      required: true
    },
    dynamicRoutes: {
      type: Array,
      required: true
    }
  },
  methods: {
    getMenuItemIndex (menu) {
      return menu.path ? menu.path : menu.mid + '';
    },
    gotoRouteHandle (menu) {
      this.$router.push({
        path: menu.path
      });
    }
  },
  components: {
    SidebarItem
  }
};
</script>
