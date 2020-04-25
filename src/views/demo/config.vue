<template>
<div class="app-page mod-comp" ref="layoutShow">
  <div class="comp-wrap">
    <div class="comp-list">
      <div class="comp-item" v-for="(item, index) in compList" :key="index" draggable="true" @dragstart="handleDragStart($event, item)" @dragend="handleDragEnd">
        <i class="comp-item-icon" :class="item.icon"></i>
        <span class="comp-item-name">{{ item.label }}</span>
        <span class="comp-item-use">{{ compUse[item.name].use }} / {{ compUse[item.name].max }}</span>
      </div>
    </div>
  </div>
  <div ref="compLayout" class="comp-layout">
    <div class="layout-mobile" @dragover="handleDragover">
      <div class="iphone-header">
        <p>{{ pageConfig.title }}</p>
      </div>
      <div ref="layoutMobileBody" class="iphone-body">
        <iframe
          ref="layoutIframe"
          :class="{'preview-iframe': isDragging}"
          :src="iframeUrl"
          frameborder="0"
          allowfullscreen
          width="100%"
          :height="iframeHeight">
        </iframe>
      </div>
    </div>
    <preview-tabs class="preview-tabs" :active="activeTab" @change="handleChangeTabs"></preview-tabs>
  </div>
  <div class="comp-config">
    <div class="comp-config-tab" v-show="activeTab === 'components'">
      <preview-components :data="layouts" @on-click="handleClickSingle" @on-change="handleChangeLayouts"></preview-components>
    </div>
    <div class="comp-config-tab" v-show="activeTab === 'config'">
      <edit-x-config :data="pageConfig" @change="handleChangePageConfig"></edit-x-config>
    </div>
    <div class="comp-config-tab" v-if="typeof selectedIndex === 'number' && selectedIndex <= layouts.length - 1">
      <template v-for="(item, index) in layouts">
        <component :is="'edit-' + item.name" :key="index" :index="selectedIndex" :data="layouts[selectedIndex]" @change="handleUpdateCpsData" v-if="selectedIndex === index"></component>
      </template>
    </div>
  </div>
</div>
</template>

<script>
import pageConfig from '@/data/pageConfig.js';
import {
  compUse,
  compList,
  compDefaultData,
  compItemBox,
} from '@/data/components.js';
import { postMessage } from '@/scripts/tools.js';
import PreviewTabs from '@/components/previewTabs/index.vue';
import PreviewComponents from '@/components/previewComponents/index.vue';
import configDataEditCps from '@/components/configDataEdit/index.js';

export default {
  components: {
    PreviewTabs,
    PreviewComponents,
    ...configDataEditCps,
  },
  data () {
    return {
      timesamp: 0, // 拖拽移动时间戳，用来优化dragover事件性能
      layoutMainWidth: 600,
      isDragging: false,
      iframeHeight: 603,
      activeTab: 'config', // 当前活动tab标签（右侧显示内容）
      compItemBox, // 左侧组件列表中每个组件的宽高
      compList, // 组件列表,
      compUse, // 组件使用情况,
      compDefaultData, // 组件默认值
      dragComponent: {}, // 正在拖拽的组件
      selectedIndex: null, // 当前选中的组件
      layouts: [], // 布局的数据
      pageConfig, // 页面默认配置信息
    };
  },
  computed: {
    layoutShowOffsetX () { // 显示区域距离左侧距离
      const layoutLeftWidth = 200; // 框架左侧宽度
      const layoutCompWidth = 200; // 左侧组件列表宽度
      return (this.layoutMainWidth - 375) / 2 + layoutLeftWidth + layoutCompWidth;
    },
    layoutIframeClientRectTop () { // iframe区域内容距离页面距离
      return this.$refs.layoutIframe.getBoundingClientRect().top;
    },
    iframeUrl () {
      return this.$store.state.previewOrigin + '/preview';
    }
  },
  mounted () {
    window.addEventListener('message', (event) => {
      this.receiveMessage(event.data);
    });
    this.initLayoutMainWidth();
    this.setIframeHeight(); // 设置iframe高度
    this.postMessage({
      type: 'layouts',
      layouts: this.layouts,
    }, 500);
    this.postMessage({
      type: 'config',
      config: this.pageConfig,
    }, 500);
  },
  methods: {
    initLayoutMainWidth () {
      this.layoutMainWidth = this.$refs.compLayout.clientWidth;
      window.addEventListener('resize', (event) => {
        let now = new Date().getTime();
        if (now - this.timesamp < 300) {
          return;
        }
        this.timesamp = now;
        this.layoutMainWidth = this.$refs.compLayout.clientWidth;
      });
    },
    // 发送消息
    postMessage (data, delay = 0) {
      postMessage(this.$refs.layoutIframe.contentWindow, data, delay);
    },
    // 接收消息
    receiveMessage (data) {
      if (data.type === 'updateHeight') { // 更新iframe高度
        this.iframeHeight = data.height;
      } else if (data.type === 'updateLayouts') { // 更新布局
        this.layouts = [...data.layouts];
      } else if (data.type === 'updateSelectedIndex') { // 更新选中组件
        this.selectedIndex = data.index;
        if (typeof data.index === 'number') {
          this.activeTab = '';
        }
      }
    },
    // 开始拖拽
    handleDragStart (evt, data) {
      this.isDragging = true;
      this.dragComponent = {
        name: data.name,
        data: data,
      };
    },
    // 拖拽到目标元素上方
    handleDragover (evt) {
      // console.log('handleDragover', evt);
      evt.preventDefault();
      let now = new Date().getTime();
      if (now - this.timesamp < 200) {
        return;
      }
      this.timesamp = now;
      this.getDragPosition({
        x: evt.clientX,
        y: evt.pageY,
      });
    },
    // 拖拽结束
    handleDragEnd (evt) {
      // console.log('handleDragEnd', evt);
      evt.preventDefault();
      this.dragComponent = {};
      this.isDragging = false;
      this.postMessage({
        type: 'layoutChanged',
      });
    },
    // 获取拖拽的位置
    getDragPosition (data) {
      // console.log(data);
      if (data.x >= this.layoutShowOffsetX) {
        this.postMessage({
          type: 'layoutMoveOver',
          y: Math.max(data.y - this.layoutIframeClientRectTop, 0) + this.$refs.compLayout.scrollTop,
          component: { ...this.dragComponent.data },
          data: this.compDefaultData[this.dragComponent.name],
        });
      } else {
        this.postMessage({
          type: 'layoutMoveOut'
        });
      }
    },
    // 拖拽组件顺序
    handleChangeLayouts (layouts) {
      // console.log('handleChangeLayouts', layouts);
      this.postMessage({
        type: 'layouts',
        layouts,
      });
      this.postMessage({
        type: 'clearSelected',
      });
    },
    // 更改单个组件数据
    handleUpdateCpsData (singleLayout, index) {
      // console.log('handleChangeLayouts');
      let layouts = [...this.layouts];
      if (layouts.length > 0 && index >= 0 && layouts.length > index) {
        layouts[index].data = singleLayout;
      }
      this.postMessage({
        type: 'layouts',
        layouts,
      });
    },
    // 切换右侧显示标签
    handleChangeTabs (name) {
      this.activeTab = name;
    },
    // 页面配置信息改变
    handleChangePageConfig (data) {
      this.postMessage({
        type: 'config',
        config: data,
      });
    },
    // 点击某个组件
    handleClickSingle (data) {
      this.$nextTick(() => {
        this.$refs.compLayout.scrollTo({
          left: 0,
          top: data.offsetTop,
          behavior: 'smooth',
        });
      });
    },
    // 初始化设置iframe高度
    setIframeHeight () {
      this.$nextTick(() => {
        const height = this.$refs.layoutMobileBody.offsetHeight;
        this.iframeHeight = height;
      });
    },
    // 校验组件数据是否显示
    checkConfigEditVisible (name) {
      if (this.layouts.length > 0 && typeof this.selectedIndex === 'number' && this.layouts.length > this.selectedIndex) {
        return this.layouts[this.selectedIndex].name === name;
      }
      return false;
    }
  },
  watch: {
    activeTab (val) {
      if (val) {
        this.postMessage({
          type: 'clearSelected'
        });
      }
    },
  }
};
</script>

<style lang="scss" scoped>
@import '@/styles/scss/comp-list.scss';
@import '@/styles/scss/layout-mobile.scss';

.mod-comp {
  height: 100%;
  padding: 0;
}

.comp-wrap,
.comp-config {
  position: absolute;
  top: 0;
  bottom: 0;
  z-index: 10;
}

.comp-wrap {
  left: 0;
  width: 200px;
  padding: 8px;
}

.comp-config {
  right: 0;
  width: 360px;

  &-tab {
    height: 100%;
    padding: 8px;
  }
}

.comp-layout {
  display: flex;
  position: absolute;
  top: 0;
  left: 200px;
  right: 360px;
  height: 100%;
  background-color: #f7f8fa;
  overflow-x: hidden;
  overflow-y: auto;

  .preview-tabs {
    position: fixed;
    top: 100px;
    right: 370px;
  }
}

.preview-iframe {
  pointer-events: none;
}
</style>