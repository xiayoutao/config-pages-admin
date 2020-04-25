<template>
  <main class="app-main">
    <router-tab>
      <template v-slot="{ tab: { id, title, icon, closable }, tabs, index}">
        <i v-if="icon" :class="iconfont + icon" />
        <span class="tab-title">{{ title || '未命名页签' }}</span>
        <!-- <span class="tab-badge">{{ index }}</span> -->
        <i v-if="closable !== false && tabs.length > 1" class="app-tab-close xyt-md-close" :class="iconfont" @click.prevent="close(id)" />
      </template>
    </router-tab>
  </main>
</template>

<script>
const iframeFlag = 'iframe-';
export default {
  computed: {
    iconfont () {
      return this.$store.state.iconfont;
    }
  },
  methods: {
    refresh (id) {
      if (id.indexOf(iframeFlag) >= 0) {
        this.$routerTab.refreshIframeTab(id.replace(iframeFlag, ''));
      } else {
        this.$routerTab.refresh(id);
      }
    },
    close (id) {
      if (id.indexOf(iframeFlag) >= 0) {
        this.$routerTab.closeIframeTab(id.replace(iframeFlag, ''));
      } else {
        this.$routerTab.close(id);
      }
    }
  }
};
</script>


<style lang="scss" scoped>
// /deep/ .page-fade {
//   &-enter-active,
//   &-leave-active {
//     transition: opacity 0.5s;
//   }

//   &-enter,
//   &-leave-to {
//     opacity: 0;
//   }
// }
.app-tab-refresh {
  margin-left: 4px;
  margin-right: 0;
}
.app-tab-close {
  position: relative;
  display: inline-block;
  top: -10px;
  right: -14px;
  width: 16px;
  height: 16px;
  margin-left: -9px;
  text-align: center;
  font-size: 12px;
}
</style>
