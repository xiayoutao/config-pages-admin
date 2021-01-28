<template>
  <el-dialog custom-class="pages-show" title="预览" width="375px" :close-on-press-escape="true" :close-on-click-modal="true" append-to-body
    :visible.sync="visible">
    <div class="loading" element-loading-text="拼命加载中" v-loading="loading" v-if="loading"></div>
    <iframe ref="layoutIframe" frameborder="0" allowfullscreen width="100%" height="667px" :src="`${iframeUrl}?uuid=${uuid}`"></iframe>
  </el-dialog>
</template>

<script>
import { checkIFrameLoaded } from '@/common/tools';

export default {
  data() {
    return {
      loading: false,
      visible: false,
      uuid: null,
    };
  },
  computed: {
    iframeUrl() {
      return this.$store.state.previewOrigin + '/show';
    }
  },
  methods: {
    init(uuid) {
      this.uuid = uuid;
      this.visible = true;
      this.loading = true;
      this.$nextTick(() => {
        checkIFrameLoaded(this.$refs.layoutIframe, () => {
          this.loading = false;
        });
      });
    },
  }
};
</script>

<style lang="scss" scoped>
/deep/.pages-show {
  position: relative;

  .loading {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 100;
  }

  .el-dialog__header {
    display: none;
    // border-bottom: 1px solid #eee;
    // box-shadow: 0 0 14px 0 rgba(0, 0, 0, .1);
  }

  .el-dialog__body {
    position: relative;
    height: 667px;
    padding: 0;
    overflow: hidden;
  }
}
</style>