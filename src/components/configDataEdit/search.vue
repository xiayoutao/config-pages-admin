<template>
<div class="component-config">
  <div class="config-header">
    <div class="config-title">{{ label }}</div>
    <div class="config-tips" v-if="tips">{{ tips }}</div>
  </div>
  <div class="config-group">
    <div class="config-group-header">
      <p>热词</p>
    </div>
    <div class="config-group-content">
      <textarea type="text" class="config-input textarea" v-model="dataForm.placeholder" placeholder="请输入热词，用英文逗号隔开" />
    </div>
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
  name: 'edit-x-search',
  mixins: [
    globalMixin,
  ],
  data () {
    return {
      defaultBgColor: '#f9f9f9',
      defaultColor: '#969799',
    };
  },
  methods: {
    handleChangeBgColor (color) {
      this.dataForm.background = color;
    },
    handleChangeColor (color) {
      this.dataForm.color = color;
    }
  }
};
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>