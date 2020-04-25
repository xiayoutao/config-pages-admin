<template>
<div class="component-config">
  <div class="config-header">
    <div class="config-title">{{ label }}</div>
    <div class="config-tips" v-if="tips">{{ tips }}</div>
  </div>
  <div class="config-group">
    <div class="config-group-header">
      <p>空白高度</p>
    </div>
    <div class="config-group-content">
      <el-slider v-model="dataForm.height" :min="dataForm.min" :max="dataForm.max" show-input input-size="mini"></el-slider>
    </div>
  </div>
</div>
</template>

<script>
import globalMixin from '@/mixins/configEdit.js';

export default {
  name: 'edit-x-division',
  mixins: [
    globalMixin,
  ],
};
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>