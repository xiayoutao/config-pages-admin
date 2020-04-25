<template>
<div class="preview-tabs">
  <div class="preview-tabs-item" v-for="(item, index) in settingsTabs" :key="index" :class="{active: activeTab === item.name}" @click="handleChangeTabs(item)">
    <i :class="item.icon"></i>
    <span>{{ item.label }}</span>
  </div>
</div>
</template>

<script>
export default {
  props: {
    active: { // 当前活动tab标签（右侧显示内容）
      type: String,
    }
  },
  data () {
    return {
      activeTab: 'config',
      settingsTabs: [
        { icon: 'icon-page', label: '页面配置', name: 'config' },
        { icon: 'icon-cps', label: '组件管理', name: 'components' },
      ],
    };
  },
  methods: {
    // 切换右侧显示标签
    handleChangeTabs (data) {
      this.activeTab = data.name;
    },
  },
  watch: {
    active (val) {
      this.activeTab = val;
    },
    activeTab (val) {
      this.$emit('change', val);
    }
  }
};
</script>

<style lang="scss" scoped>
.preview-tabs {
  &-item {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 94px;
    height: 32px;
    margin-bottom: 12px;
    border-radius: 2px;
    box-shadow: 0 2px 8px 0 rgba(0, 0, 0, .1);
    background-color: #fff;
    line-height: 32px;
    cursor: pointer;

    .icon-page,
    .icon-cps {
      display: block;
      width: 12px;
      height: 12px;
      margin-right: 7px;
      background-position: 0 -1px;
      background-size: cover;
    }

    .icon-page {
      background-image: url('../../images/icon-preview-page.png');
    }

    .icon-cps {
      background-image: url('../../images/icon-preview-cps.png');
    }

    &.active {
      background-color: $color;
      color: #fff;

      .icon-page,
      .icon-cps {
        background-position: 0 11px;
      }
    }
  }
}
</style>