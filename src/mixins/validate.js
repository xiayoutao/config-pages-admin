/**
 * 这个是弹窗组件验证表单的Mixin
 * 弹窗关闭，组件需要销毁（利用v-if="visible"，在Dialog关闭时这里的visible设置为false），重置data下所有的值，否则再次打开依然会有上次相关值
 */
export default {
  data () {
    return {
      validateErrors: {}, // 表单校验错误信息
      validateShowMessage: false, // 是否显示表单错误信息，这个值时为了解决弹窗一打开就会校验的问题（因为弹窗的dataForm={}，打开是立即用$set方法设置dataForm值，另外页面有深度监听了dataForm值）
      validateClickButtonTime: 0, // 解决监听dataForm需要做节流的问题
    };
  },
  computed: {
    ajaxLoading: {
      get () {
        return this.$store.state.common.ajaxLoading;
      },
      set (val) {
        this.$store.commit('common/setAjaxLoading', val);
      }
    }
  },
  watch: {
    dataForm: {
      handler () {
        if (this.validateShowMessage) {
          // Form组件的show-message属性为true才显示错误信息
          this.validateForm();
        }
      },
      deep: true
    }
  }
};