<template>
  <el-dialog custom-class="pages-qrcode" title="微信扫码预览" width="260px" :close-on-press-escape="true" :close-on-click-modal="true" append-to-body :visible.sync="visible">
    <img class="qrcode-img" :src="qrcode" />
    <p class="qrcode-tips">使用微信扫码预览</p>
  </el-dialog>
</template>

<script>
import QRCode from 'qrcode';

export default {
  data () {
    return {
      visible: false,
      uuid: null,
      qrcode: null,
    };
  },
  computed: {
    qrcodeBaseUrl () {
      return this.$store.state.previewOrigin + '/show';
    }
  },
  methods: {
    init (uuid) {
      this.uuid = uuid;
      this.visible = true;
      this.$nextTick(() => {
        QRCode.toDataURL(this.qrcodeBaseUrl + '?uuid=' + uuid, {
          type: 'image/png',
        }).then(url => {
          console.log(url);
          this.qrcode = url;
        }).catch(err => {
          console.log(err);
          console.error(err);
        });
      });
    },
  }
};
</script>

<style lang="scss" scoped>
/deep/.pages-qrcode {
  position: relative;

  .qrcode-img {
    display: block;
    width: 220px;
    height: 220px;
    margin: 0 auto;
  }

  .qrcode-tips {
    margin-bottom: 0;
    font-size: 16px;
    color: #666;
    text-align: center;
  }

  .el-dialog__header {
    display: none;
  }
}
</style>