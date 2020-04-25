<template>
<div class="component-config">
  <div class="config-header">
    <div class="config-title">页面设置</div>
  </div>
  <div class="config-group">
    <div class="config-group-header">
      <span class="is-required">*</span>
      <p>页面名称</p>
    </div>
    <div class="config-group-content">
      <input type="text" class="config-input" v-model="dataForm.title" placeholder="页面标题" />
    </div>
  </div>
  <div class="config-group">
    <div class="config-group-header">
      <p>页面描述</p>
    </div>
    <div class="config-group-content">
      <textarea type="text" class="config-input textarea" v-model="dataForm.description" placeholder="页面描述"></textarea>
    </div>
  </div>
  <div class="config-group flex">
    <div class="config-group-header">
      <p>背景颜色</p>
    </div>
    <div class="config-group-content">
      <el-radio-group v-model="bgColorActive" size="small">
        <el-radio-button v-for="(item, index) in bgColorConfig" :key="index" :label="item.type">{{ item.label }}</el-radio-button>
      </el-radio-group>
    </div>
  </div>
  <div class="config-group edit-bg" v-if="bgColorActive === 1">
    <div class="config-group-content">
      <color-picker :default-color="bgColorDefault" :data="dataForm.bgColor" @change="handleChangeBgColor"></color-picker>
    </div>
  </div>
</div>
</template>

<script>
import ColorPicker from '@/components/colorPicker/index.vue';

export default {
  name: 'edit-x-config',
  components: {
    ColorPicker,
  },
  props: ['data'],
  computed: {
    dataForm: {
      get () {return this.data || {};},
      set (val) {}
    },
  },
  data () {
    return {
      bgColorDefault: '#f9f9f9',
      bgColorActive: 0,
      bgColorConfig: [
        { type: 0, label: '默认背景色' },
        { type: 1, label: '自定义背景色' }
      ]
    };
  },
  methods: {
    handleChangeBgColor (color) {
      this.dataForm.bgColor = color;
    },
    openBgColorDialog () {
      this.dataForm.bgColor = '#f00';
    }
  },
  watch: {
    dataForm: {
      handler (val) {
        this.$emit('change', val, this.index);
      },
      deep: true,
    },
    bgColorActive (val) {
      if (val === 0) {
        this.dataForm.bgColor = this.bgColorDefault;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>