<template>
  <el-dialog width="375px" custom-class="pages-show" title="预览" append-to-body :close-on-click-modal="false" :visible.sync="visible">
    <iframe frameborder="0" allowfullscreen width="100%" height="667px" :src="`${iframeUrl}?uuid=${uuid}`"></iframe>
  </el-dialog>
</template>

<script>
export default {
  data () {
    return {
      visible: false,
      uuid: null,
    };
  },
  computed: {
    iframeUrl () {
      return this.$store.state.previewOrigin + '/show';
    }
  },
  methods: {
    init (uuid) {
      this.uuid = uuid;
      this.visible = true;
    }
  }
};
</script>

<style lang="scss" scoped>
/deep/.pages-show {
  position: relative;

  .el-dialog__body {
    height: 667px;
    padding: 0;
  }
}
</style>