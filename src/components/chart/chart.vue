<template>
<div class="chart scrollbar" v-loading="loading">
  <div class="chart-inner" :id="chartId" :style="{ height: canvasHeight }"></div>
</div>
</template>

<script>
/* eslint-disable no-undef */
// import echarts from 'echarts/dist/echarts.min';
export default {
  props: {
    options: {
      type: Object,
      required: false
    },
    canvasHeight: {
      type: String,
      required: false,
      default: '100%'
    }
  },
  data () {
    return {
      loading: true,
      chartId: 'chart_' + new Date().getTime() + '_' + Math.floor(Math.random() * 10000000000),
      myChart: null
    };
  },
  computed: {
    chartHeight () {
      return this.canvasHeight;
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.init(this.options);
    });
    window.addEventListener('resize', () => {
      if (!this.myChart) return;
      this.myChart.resize();
    });
  },
  methods: {
    init (options) {
      if (!options) {
        this.$emit('on-error', '参数未传递');
        this.loading = false;
        return;
      }
      var dom = document.getElementById(this.chartId);
      // 基于准备好的dom，初始化echarts实例
      this.myChart = echarts.init(dom);
      // 绘制图表
      this.myChart.setOption(options);
      this.myChart.off('click');
      this.myChart.on('click', (params) => {
        this.$emit('on-click', params);
      });
      dom.style.height = this.chartHeight;
      this.myChart.resize();
      this.$emit('on-loaded');
      this.loading = false;
    },
  },
  watch: {
    options: {
      handler (val, oldVal) {
        this.init(val);
      },
      deep: true
    },
    canvasHeight () {
      this.init(this.options);
    }
  }
};
</script>

<style lang="scss" scoped>
.chart {
  position: relative;
  width: 100%;
  height: 100%;
  overflow-y: auto;

  &-inner {
    width: 100%;
    height: 100%;
  }
}
</style>
