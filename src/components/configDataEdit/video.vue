<template>
<div class="component-config">
  <div class="config-title">{{ label }}</div>
  <div class="config-group flex">
    <div class="config-group-header">
      <p>视频</p>
    </div>
    <div class="config-group-content">
      <div class="radio-box">
        <label class="radio-item" v-for="(item, index) in videoTypes" :key="index" :class="{checked: videoType === index}" @click="handleChangeRadio('videoType', index)">
          <span class="radio-control"></span>
          <span class="radio-label">{{ item.label }}</span>
        </label>
      </div>
    </div>
  </div>
  <div class="config-group grey" v-if="videoType === 0">
    <div class="config-group-content">
      <div class="config-upload">
        <p class="upload-tips">建议视频宽高比16:9</p>
        <span class="upload-btn">
          <i class="el-icon-plus"></i>
        </span>
        <span class="upload-text">请添加视频</span>
      </div>
    </div>
  </div>
  <div class="config-group" v-else>
    <div class="config-group-content">
      <input type="text" class="config-input" v-model="dataForm.url" placeholder="此处粘贴视频播放地址" />
    </div>
  </div>
  <div class="config-group flex">
    <div class="config-group-header">
      <p>封面图</p>
    </div>
    <div class="config-group-content" v-if="videoType === 0">
      <div class="radio-box">
        <label class="radio-item" v-for="(item, index) in posterTypes" :key="index" :class="{checked: posterType === index}" @click="handleChangeRadio('posterType', index)">
          <span class="radio-control"></span>
          <span class="radio-label">{{ item.label }}</span>
        </label>
      </div>
    </div>
  </div>
  <template v-if="videoType === 1 || posterType === 1">
    <div class="config-group">
      <div class="config-group-content">
        <div class="config-upload">
          <p class="upload-tips">建议图片宽高比16:9</p>
          <span class="upload-btn">
            <i class="el-icon-plus"></i>
          </span>
          <span class="upload-text">请添加封面</span>
        </div>
      </div>
    </div>
    <div class="config-group">
      <div class="config-group-content">
        <input type="text" class="config-input" v-model="dataForm.poster" placeholder="此处粘贴视频封面地址" />
      </div>
    </div>
  </template>
</div>
</template>

<script>
import globalMixin from '@/mixins/configEdit.js';

export default {
  name: 'edit-x-video',
  mixins: [
    globalMixin,
  ],
  data () {
    return {
      posterTypes: [
        { type: 0, label: '原视频封面' },
        { type: 1, label: '自定义封面' }
      ],
      videoTypes: [
        { type: 0, label: '选择视频' },
        { type: 1, label: '粘贴视频链接' }
      ],
      posterType: 0,
      videoType: 0,
    };
  },
  methods: {
    handleChangeRadio (type, index) {
      this[type] = index;
    }
  }
};
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>