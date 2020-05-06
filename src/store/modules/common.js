export default {
  namespaced: true,
  state: {
    timestampDiff: 0,
    // 侧边栏, 菜单
    menuList: [],
    menuActiveName: '',
    // 表格无数据显示内容
    tableEmptyText: '暂时没有内容显示',
    serverBaseUrl: window.SITE_CONFIG.serverBaseUrl,
    cdnUrl: window.SITE_CONFIG.cdnUrl,
    upload: window.SITE_CONFIG.upload,
    // 分页器配置信息
    paginationOptions: {
      layout: 'total, sizes, prev, pager, next, jumper',
      pageSizes: [5, 10, 15, 20, 30, 50, 100],
      pageSize: 10
    },
    ajaxLoading: false, // ajax请求中
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