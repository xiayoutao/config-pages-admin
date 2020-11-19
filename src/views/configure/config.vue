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
        <div class="loading" element-loading-text="拼命加载中" v-loading="loading" v-if="loading"></div>
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
      <preview-components :data="layouts" @on-click="handleClickSingle" @on-change="handleChangeLayouts" @on-update-use="handleUpdateUse"></preview-components>
    </div>
    <div class="comp-config-tab" v-show="activeTab === 'config'">
      <edit-x-config :data="pageConfig" @change="handleChangePageConfig"></edit-x-config>
    </div>
    <div class="comp-config-tab" v-if="!isDragging && typeof selectedIndex === 'number' && selectedIndex <= layouts.length - 1 && layouts.length > 0">
      <template v-for="(item, index) in layouts">
        <component :is="'edit-' + item.name" :key="index" :index="selectedIndex" :data="layouts[selectedIndex]" @change="handleUpdateCpsData" v-if="selectedIndex === index"></component>
      </template>
    </div>
    <div class="comp-operate">
      <el-button type="primary" size="medium" style="width: 100%;" @click="handleSubmit">保存页面</el-button>
    </div>
  </div>
</div>
</template>

<script>
import {
  getPageInfo,
  savePage,
} from '@/apis/app';
import pageConfig from '@/constants/pageConfig';
import { getUUID, } from '@/scripts/utils';
import {
  compUse,
  compList,
  compDefaultData,
  compItemBox,
} from '@/constants/components';
import { postMessage, checkIFrameLoaded } from '@/scripts/tools';
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
      loading: false, // iframe加载
      timesamp: 0, // 拖拽移动时间戳，用来优化dragover事件性能
      layoutMainWidth: 600,
      isDragging: false,
      iframeHeight: 603,
      activeTab: 'config', // 当前活动tab标签（右侧显示内容）
      compItemBox: {...compItemBox}, // 左侧组件列表中每个组件的宽高
      compList: [...compList], // 组件列表,
      compUse: {...compUse}, // 组件使用情况,
      compDefaultData: {...compDefaultData}, // 组件默认值
      dragComponent: {}, // 正在拖拽的组件
      selectedIndex: null, // 当前选中的组件
      layouts: [], // 布局的数据
      pageConfig: { ...pageConfig }, // 页面默认配置信息
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
    this.loading = true;
    checkIFrameLoaded(this.$refs.layoutIframe, () => {
      this.loading = false;
      this.setIframeHeight(); // 设置iframe高度
      this.getPageLayout();
    });
  },
  methods: {
    // 获取页面布局
    async getPageLayout () {
      const data = await getPageInfo();
      if (!this.isEmptyObject(data)) {
        if (!this.isEmptyObject(data.config)) {
          this.pageConfig = {...data.config};
        }
        this.layouts = [...data.layouts];

        this.postMessage({
          type: 'layouts',
          layouts: this.layouts,
        });

        this.postMessage({
          type: 'config',
          config: this.pageConfig,
        });
      }
    },
    // 获取中间部门宽度
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
      try {
        data = JSON.parse(data);
      } catch (error) {
        console.log(error);
      }
      if (data.type === 'updateHeight') { // 更新iframe高度
        this.iframeHeight = data.height;
      } else if (data.type === 'updateLayouts') { // 更新布局
        this.layouts = [...data.layouts];
      } else if (data.type === 'updateConfig') {
        this.pageConfig = {...data.config};
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
      if (data.x >= this.layoutShowOffsetX && data.x <= this.layoutShowOffsetX + 375) {
        const useData = {...this.compUse[this.dragComponent.name]};
        this.postMessage({
          type: 'layoutMoveOver',
          y: Math.max(data.y - this.layoutIframeClientRectTop, 0) + this.$refs.compLayout.scrollTop,
          component: { ...this.dragComponent.data },
          data: this.compDefaultData[this.dragComponent.name],
          disabled: useData.use >= useData.max,
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
    // 更新组件使用情况
    handleUpdateUse (data) {
      // console.log('handleUpdateUse', data);
      this.compUse[data.name].use = data.use - 1;
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
    },
    // 充值组件使用个数
    resetCpsUse (data) {
      Object.keys(data).forEach(item => {
        data[item].use = 0;
      });
      return data;
    },
    // 提交数据
    async handleSubmit () {
      if (this.layouts.length === 0) {
        this.$messageCallback('error', '页面不能为空，请添加组件');
        return false;
      }
      const data = await savePage({
        config: this.pageConfig,
        layouts: this.layouts,
      });
      if (data) {
        this.$messageCallback('success', '操作成功');
      }
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
    layouts: {
      handler (val) {
        let newCompUse = this.resetCpsUse(compUse);
        val.forEach(item => {
          let use = newCompUse[item.name].use || 0;
          this.compUse[item.name].use = ++use;
        });
      },
      deep: true,
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/scss/comp-list.scss';
@import '@/assets/styles/scss/layout-mobile.scss';

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
  padding-bottom: 60px;

  &-tab {
    display: flex;
    height: 100%;
  }
}

.comp-operate {
  position: absolute;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  height: 60px;
  padding: 0 12px;
  border-top: 1px solid #f3f3f3;
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