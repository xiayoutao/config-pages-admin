<template>
  <header class="app-hd">
    <div class="app-home">
      <a class="toggle-side xyt-ios-list" :class="iconfont" @click="$emit('sidebar-change')" />
      <img class="site-logo" alt="后台管理系统" title="后台管理系统" src="/img/logo.png">
      <h2 class="site-title">后台管理系统</h2>
    </div>
    <site-link />
  </header>
</template>

<script>
import SiteLink from './SiteLink.vue';

export default {
  name: 'AppHeader',
  computed: {
    iconfont () {
      return this.$store.state.iconfont;
    }
  },
  components: {
    SiteLink
  }
};
</script>


<style lang="scss" scoped>
.site-link {
  @include screen-mob {
    display: none;
  }
}
</style>
