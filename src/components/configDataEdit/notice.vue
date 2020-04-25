<template>
<div class="component-config">
  <div class="config-title">{{ label }}</div>
  <div class="config-group">
    <div class="config-group-header">
      <span class="is-required">*</span>
      <p>公告</p>
    </div>
    <div class="config-group-content">
      <input type="text" class="config-input" v-model="dataForm.message" placeholder="请输入标题" />
    </div>
  </div>
  <div class="config-group flex">
    <div class="config-group-header">
      <p>背景颜色</p>
    </div>
    <div class="config-group-content right">
      <color-picker :default-color="defaultBgColor" :data="dataForm.background" @change="handleChangeBgColor"></color-picker>
    </div>
  </div>
  <div class="config-group flex">
    <div class="config-group-header">
      <p>文件颜色</p>
    </div>
    <div class="config-group-content right">
      <color-picker :default-color="defaultColor" :data="dataForm.color" @change="handleChangeColor"></color-picker>
    </div>
  </div>
</div>
</template>

<script>
import globalMixin from '@/mixins/configEdit.js';
import ColorPicker from '@/components/colorPicker/index.vue';

export default {
  name: 'edit-x-notice',
  components: {
    ColorPicker,
  },
  mixins: [
    globalMixin,
  ],
  data () {
    return {
      defaultBgColor: '#fff8e9',
      defaultColor: '#646566',
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