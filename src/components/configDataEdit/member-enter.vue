<template>
<div class="component-config">
  <div class="config-header">
    <div class="config-title">{{ label }}</div>
    <div class="config-tips" v-if="tips">{{ tips }}</div>
  </div>
  <div class="config-group">
    <div class="config-group-header">
      <p>文案</p>
    </div>
    <div class="config-group-content">
      <input type="text" class="config-input" v-model="dataForm.title" />
    </div>
  </div>
  <div class="config-group">
    <div class="config-group-header">
      <span class="is-required">*</span>
      <p>链接文字</p>
    </div>
    <div class="config-group-content">
      <input type="text" class="config-input" v-model="dataForm.actionText" />
    </div>
  </div>
</div>
</template>

<script>
import globalMixin from '@/mixins/configEdit.js';

export default {
  name: 'edit-x-member-enter',
  mixins: [
    globalMixin,
  ],
};
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>