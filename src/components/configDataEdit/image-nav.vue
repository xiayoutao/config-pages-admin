<template>
<div class="component-config">
  <div class="config-title">{{ label }}</div>
  <div class="config-tips">
    <p>最多添加 10 个导航，拖动选中的导航可对其排序</p>
  </div>
  <div class="nav-list">
    <div class="nav-item" v-for="(item, index) in dataList" :key="index">
      <span class="delete"></span>
      <div class="nav-item-img"></div>
      <div class="nav-item-text">
        <div class="config-group flex">
          <div class="config-group-header">
            <p>标题</p>
          </div>
          <div class="config-group-content full-width">
            <input type="text" class="config-input" v-model="item.title" placeholder="请输入标题" />
          </div>
        </div>
        <div class="config-group flex">
          <div class="config-group-header">
            <p>链接</p>
          </div>
          <div class="config-group-content full-width">
            <p>选择要跳转的页面</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import globalMixin from '@/mixins/configEdit.js';

export default {
  name: 'edit-x-image-nav',
  mixins: [
    globalMixin,
  ],
  data () {
    return {
      defaultDataList: [
        {title: '导航一', link: '', img: ''},
        {title: '导航二', link: '', img: ''},
        {title: '导航三', link: '', img: ''},
        {title: '导航四', link: '', img: ''},
      ],
    };
  },
  computed: {
    dataList: {
      get () {
        if (this.dataForm.nav && this.dataForm.nav.length === 0) {
          return [...this.defaultDataList];
        } else {
          return [...this.dataForm.nav];
        }
      },
      set (val) {this.dataForm.nav = [...val];}
    }
  }
};
</script>

<style lang="scss" scoped>
@import './index.scss';

.nav-list {
  .nav-item {
    display: flex;
    margin-bottom: 12px;
    padding: 10px 12px;
    border: 1px solid #e5e5e5;
    box-shadow: 0 0 4px 0 rgba(10, 42, 97, .2);

    &-img {
      display: flex;
      width: 60px;
      height: 60px;
      margin-right: 5px;
      border: 1px solid #e5e5e5;
    }

    &-text {
      flex: 1;

      .config-group {
        height: 32px;
        padding-top: 0;
        padding-bottom: 0;

        p {
          margin: 0;
        }
      }
    }
  }
}
</style>