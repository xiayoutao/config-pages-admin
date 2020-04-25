export default {
  data () {
    return {
      bgColorDefault: '#f9f9f9',
      bgColorActive: 0,
      bgColorConfig: [
        { type: 0, label: '默认背景色' },
        { type: 1, label: '自定义背景色' }
      ]
    };
  },
  methods: {
    handleChangeBgColor (color) {
      this.pageConfig.bgColor = color;
    },
    handleBgColorItem (index) {
      if (index === 0) {
        this.pageConfig.bgColor = this.bgColorDefault;
      }
      this.bgColorActive = index;
    },
    openBgColorDialog () {
      this.pageConfig.bgColor = '#f00';
    }
  },
  watch: {
    pageConfig: {
      handler (val) {
        this.postMessage({
          type: 'config',
          config: val,
        });
      },
      deep: true,
    }
  }
};