<template>
  <div class="app-ct" :class="{ 'sidebar-open': sidebarOpen }" v-cloak>
    <app-header @sidebar-change="sidebarOpen = !sidebarOpen" />
    <div class="app-bd">
      <div class="app-sd-mask" @click="sidebarOpen = false" />
      <app-aside />
      <router-view />
    </div>
  </div>
</template>

<script>
import AppHeader from '@/components/layout/AppHeader.vue';
import AppAside from '@/components/layout/AppAside.vue';

export default {
  name: 'App',
  data () {
    return {
      sidebarOpen: false
    };
  },

  watch: {
    // 路由切换
    $route ($route) {
      // 关闭侧边栏
      this.sidebarOpen = false;
    }
  },
  components: {
    AppHeader,
    AppAside
  }
};
</script>

<style lang="scss">
@import '@/assets/styles/scss/resetElementUI.scss';
@import '@/assets/styles/scss/app.scss';
@import '@/assets/styles/scss/global.scss';
</style>
