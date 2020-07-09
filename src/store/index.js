/* eslint-disable no-undef */
// import Vue from 'vue';
// import Vuex from 'vuex';

Vue.use(Vuex);

const modulesFiles = require.context('./modules', true, /\.js$/);

const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1');
  const value = modulesFiles(modulePath);
  modules[moduleName] = value.default;
  return modules;
}, {});

export default new Vuex.Store({
  state: {
    version: 'v1.0.0',
    copyright: window.SITE_CONFIG.copyright,
    iconfont: 'xiayoutao' + ' ',
    defaultPage: window.SITE_CONFIG.defaultPage, // 登录后，跳转的默认页面
    previewOrigin: window.SITE_CONFIG.previewOrigin, // 预览项目域名
    // 与服务器时间戳相差值，当前服务器时间 = new Date().getTime() + timestampDiff;
    // 本系统最小支持宽度，如果客户端的宽度大于该值，则会页面底部有滚动条
    minWidth: 1180,
    // 客户端实际可见区域宽度
    clientWidth: 1200,
    // 页面文档可视高度(随窗口改变大小)
    documentClientHeight: 0,
    // 侧边栏, 折叠状态
    sidebarFold: false,
    previewerOptions: {
      getThumbBoundsFn (index) {
        // find thumbnail element
        let thumbnail = document.querySelectorAll('.previewer-img')[index];
        // get window scroll Y
        let pageYScroll = window.pageYOffset || document.documentElement.scrollTop;
        // optionally get horizontal scroll
        // get position of element relative to viewport
        let rect = thumbnail.getBoundingClientRect();
        // w = width
        return {
          x: rect.left,
          y: rect.top + pageYScroll,
          w: rect.width
        };
        // Good guide on how to get element coordinates:
        // http://javascript.info/tutorial/coordinates
      }
    },
    // 日期控件配置
    datetimepickerOptions: {
      shortcuts: [{
        text: '最近一周',
        onClick (picker) {
          const end = new Date();
          const start = new Date();
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
          picker.$emit('pick', [start, end]);
        }
      }, {
        text: '最近一个月',
        onClick (picker) {
          const end = new Date();
          const start = new Date();
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
          picker.$emit('pick', [start, end]);
        }
      }, {
        text: '最近三个月',
        onClick (picker) {
          const end = new Date();
          const start = new Date();
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
          picker.$emit('pick', [start, end]);
        }
      }]
    },
    // 时间控件配置
    timePickerOptions: {
      selectableRange: '00:00:00 - 23:59:59'
    }
  },
  modules,
  getters: {},
  mutations: {
    setClientWidth (state, width) {
      state.clientWidth = width;
    },
    updateDocumentClientHeight (state, height) {
      state.documentClientHeight = height;
    },
    updateSidebarFold (state, fold) {
      state.sidebarFold = fold;
    }
  },
  strict: process.env.NODE_ENV !== 'production'
});
