<template>
<div class="component-config">
  <div class="config-header">
    <div class="config-title">{{ label }}</div>
    <div class="config-tips" v-if="tips">{{ tips }}</div>
  </div>
  <div class="config-group">
    <div class="config-group-header">
      <span class="is-required">*</span>
      <p>视频</p>
    </div>
    <div class="config-group-content">
      <input type="text" class="config-input" v-model="dataForm.title" placeholder="请输入标题" />
    </div>
  </div>
  <div class="config-group">
    <div class="config-group-header">
      <span class="is-required">*</span>
      <p>描述内容</p>
    </div>
    <div class="config-group-content">
      <textarea type="text" class="config-input textarea" v-model="dataForm.desc" placeholder="请输入要说明的文字"></textarea>
    </div>
  </div>
</div>
</template>

<script>
import globalMixin from '@/mixins/configEdit.js';

export default {
  name: 'edit-x-title',
  mixins: [
    globalMixin,
  ],
};
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>