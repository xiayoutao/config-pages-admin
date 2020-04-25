<template>
<div class="component-config">
  <div class="config-title">{{ label }}</div>
  <div class="config-group">
    <div class="config-group-header">
      <p>添加图片</p>
    </div>
    <div class="config-group-content"></div>
  </div>
</div>
</template>

<script>
import globalMixin from '@/mixins/configEdit.js';

export default {
  name: 'edit-x-image-ad',
  mixins: [
    globalMixin,
  ],
};
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>