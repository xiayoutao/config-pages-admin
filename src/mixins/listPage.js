import { mapGetters } from 'vuex';

export default {
  data () {
    return {
      searchFlag: false,
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      dataList: [],
      dataListSelections: [],
    };
  },
  computed: {
    ...mapGetters([
      'paginationBg',
      'paginationLayout',
      'paginationPageSizes',
    ]),
    routeName () {
      return this.$route.name;
    }
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