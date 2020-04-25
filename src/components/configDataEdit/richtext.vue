<template>
<div class="component-config">
  <div class="config-header">
    <div class="config-title">{{ label }}</div>
    <div class="config-tips" v-if="tips">{{ tips }}</div>
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
      <p>是否全屏显示</p>
    </div>
    <div class="config-group-content full-width">
      <div class="checkbox-fullscreen">
        <span>{{ dataForm.fullscreen ? '全屏显示' : '不全屏显示' }}</span>
        <el-checkbox v-model="dataForm.fullscreen"></el-checkbox>
      </div>
    </div>
  </div>
  <div class="config-group">
    <!-- <vue-editor class="editor" ref="editor" v-model="dataForm.content" /> -->
    <quill-editor class="editor" ref="editor" v-model="dataForm.content"></quill-editor>
  </div>
</div>
</template>

<script>
import globalMixin from '@/mixins/configEdit.js';
import ColorPicker from '@/components/colorPicker/index.vue';
// import { VueEditor } from 'vue2-editor';
import { quillEditor } from 'vue-quill-editor';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';
import { addQuillTitle } from '@/scripts/quillEditorTitle.js';

export default {
  name: 'edit-x-richtext',
  components: {
    ColorPicker,
    // VueEditor,
    quillEditor,
  },
  mixins: [
    globalMixin,
  ],
  data () {
    return {
      defaultBgColor: '#f9f9f9',
    };
  },
  mounted () {
    addQuillTitle();
  },
  methods: {
    handleChangeBgColor (color) {
      this.dataForm.background = color;
    },
  }
};
</script>

<style lang="scss" scoped>
@import './index.scss';

.checkbox-fullscreen {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>