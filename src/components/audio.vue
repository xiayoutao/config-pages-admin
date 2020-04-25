<template>
  <el-dialog width="360px" title="播放音频文件" :close-on-click-modal="false" :visible.sync="visible">
    <div id="audioPlayer"></div>
  </el-dialog>
</template>

<script>
import WxAudio from 'wx-audio';
export default {
  data () {
    return {
      visible: false,
      wxAudio: null
    };
  },
  methods: {
    init (title, url) {
      var _this = this;
      this.visible = true;
      this.wxAudio = null;
      this.$nextTick(() => {
        this.wxAudio = new WxAudio({
          ele: '#audioPlayer',
          title,
          disc: '',
          src: url,
          width: '100%',
          loop: false,
          ended () {
            _this.$message({
              type: 'success',
              message: '播放结束',
              duration: 1500,
              showClose: true
            });
          }
        });
        this.wxAudio.audioPlay();
      });
    }
  },
  watch: {
    visible (val) {
      if (!val) {
        this.wxAudio.audioPause();
        this.$emit('pause');
      }
    }
  }
};
</script>

<style lang="scss" scoped>
/deep/ .wx-audio-content {
  border-color: #ececec;
}
</style>

