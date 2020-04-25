export default {
  props: ['data', 'index'],
  computed: {
    dataForm: {
      get () {return this.data.data || {};},
      set (val) {}
    },
    label () {
      return this.data.label;
    }
  },
  watch: {
    dataForm: {
      handler (val) {
        this.$emit('change', val, this.index);
      },
      deep: true,
    },
  }
};