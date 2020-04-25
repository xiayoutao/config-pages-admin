<template>
<div class="component-config">
  <div class="config-title">{{ label }}</div>
  <div class="config-group">
    <div class="config-group-header">
      <p>背景图片</p>
    </div>
    <div class="config-group-content">
      <input type="text" class="config-input" v-model="dataForm.background" />
    </div>
  </div>
  <div class="config-group">
    <div class="config-group-header">
      <p>显示样式</p>
    </div>
    <div class="config-group-content">
      <el-radio-group v-model="dataForm.showType" size="small">
        <el-radio-button v-for="(item, index) in showTypes" :key="index" :label="item.type">{{ item.label }}</el-radio-button>
      </el-radio-group>
    </div>
  </div>
</div>
</template>

<script>
import globalMixin from '@/mixins/configEdit.js';

export default {
  name: 'edit-x-member-info',
  mixins: [
    globalMixin,
  ],
  data () {
    return {
      showTypes: [
        { type: 0, label: '样式一', },
        { type: 1, label: '样式二', },
        { type: 2, label: '样式三', },
        { type: 3, label: '样式四', },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>