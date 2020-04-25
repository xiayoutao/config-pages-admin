<template>
<div class="component-config">
  <div class="config-header">
    <div class="config-title">{{ label }}</div>
    <div class="config-tips" v-if="tips">{{ tips }}</div>
  </div>
  <div class="config-group flex">
    <div class="config-group-header import">
      <span class="is-required">*</span>
      <p>音频</p>
    </div>
    <div class="config-group-content">
      <div class="radio-box">
        <el-button type="button">选择音频</el-button>
      </div>
    </div>
  </div>
  <div class="config-group flex">
    <div class="config-group-header">
      <p>选择样式</p>
    </div>
    <div class="config-group-content">
      <el-radio-group v-model="dataForm.type" size="small">
        <el-radio-button v-for="(item, index) in playerTypes" :key="index" :label="item.type">{{ item.label }}</el-radio-button>
      </el-radio-group>
    </div>
  </div>
  <div class="config-group">
    <div class="config-group-header import">
      <p>标题</p>
    </div>
    <div class="config-group-content">
      <input type="text" class="config-input" v-model="dataForm.title" placeholder="标题名称" />
    </div>
  </div>
  <div class="config-group flex">
    <div class="config-group-header">
      <p>开启循环播放</p>
    </div>
    <div class="config-group-content full-width">
      <div class="checkbox-loop">
        <span>{{ dataForm.loop ? '开启' : '不开启' }}</span>
        <el-checkbox v-model="dataForm.loop"></el-checkbox>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import globalMixin from '@/mixins/configEdit.js';

export default {
  name: 'edit-x-audio',
  mixins: [
    globalMixin,
  ],
  data () {
    return {
      playerTypes: [
        { type: 0, label: '播放器' },
        { type: 1, label: '简易播放器' }
      ],
    };
  },
  methods: {
    handleChangeCheckbox (type) {
      this.dataForm.type = type;
    }
  }
};
</script>

<style lang="scss" scoped>
@import './index.scss';

.checkbox-loop {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>