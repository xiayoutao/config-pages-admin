import { createNamespacedHelpers } from 'vuex';
const { mapState } = createNamespacedHelpers('common');

export default {
  data () {
    return {
      dataListLoading: false,
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      dataList: [],
      dataListSelections: [],
    };
  },
  computed: {
    ...mapState([
      'tableEmptyText',
      'paginationBg',
      'paginationLayout',
      'paginationPageSizes',
    ]),
  },
  methods: {
    // 该方法要页面重新定义
    getDataList () {},
    addOrUpdateHandle () {},
    deleteHandle () {},
    sizeChangeHandle (val) {
      console.log(val);
      this.pageSize = val;
      this.pageIndex = 1;
      this.getDataList(true);
    },
    currentChangeHandle (val) {
      console.log(val);
      this.pageIndex = val;
      this.getDataList();
    },
    // 多选
    selectionChangeHandle (val) {
      this.dataListSelections = val;
    },
  },
};