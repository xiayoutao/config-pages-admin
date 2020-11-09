export default {
  namespaced: true,
  state: {
    timestampDiff: 0,
    // 侧边栏, 菜单
    menuList: [],
    menuActiveName: '',
    // 表格无数据显示内容
    tableEmptyText: '暂时没有内容显示',
    imageServer: window.SITE_CONFIG.imageServer,
    cdnUrl: window.SITE_CONFIG.cdnUrl,
    upload: window.SITE_CONFIG.upload,
    ajaxLoading: false, // ajax请求中
    // 分页器配置信息
    paginationBg: true,
    paginationLayout: 'total, sizes, prev, pager, next',
    paginationPageSizes: [10, 20, 50, 100],
  },
  getters: {},
  mutations: {
    updateMenuList (state, list) {
      state.menuList = list;
    },
    updateMenuActiveName (state, name) {
      state.menuActiveName = name;
    },
    setPageSize (state, size) {
      state.paginationOptions.pageSize = size;
    },
    setTimestampDiff (state, diff) {
      state.timestampDiff = diff;
    },
    setAjaxLoading (state, loading) {
      state.ajaxLoading = loading;
    }
  }
};