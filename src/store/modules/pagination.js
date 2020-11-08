export default {
  state: {
    paginationBg: true,
    paginationLayout: 'total, sizes, prev, pager, next',
    paginationPageSizes: [10, 20, 50, 100],
  },
  getters: {
    paginationBg: state => state.paginationBg,
    paginationLayout: state => state.paginationLayout,
    paginationPageSizes: state => state.paginationPageSizes,
  },
};