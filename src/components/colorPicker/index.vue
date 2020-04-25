<template>
<div class="color-picker">
  <span class="reset-color" @click="handleResetColor">重置</span>
  <el-color-picker v-model="color"></el-color-picker>
</div>
</template>

<script>
export default {
  props: {
    defaultColor: {
      type: String,
      default: '#fff'
    },
    data: {
      type: String,
      default: '#fff'
    },
  },
  computed: {
    color: {
      get () { return this.data; },
      set (val) { this.$emit('change', val); },
    }
  },
  methods: {
    handleResetColor () {
      this.color = this.defaultColor;
    },
  },
};
</script>

<style lang="scss" scoped>
.color-picker {
  display: flex;
  align-items: center;

  .reset-color {
    margin-right: 10px;
    color: $color;
    cursor: pointer;
  }

  .select-color {
    position: relative;
    display: block;
    width: 50px;
    height: 30px;
    padding: 5px;
    border: 1px solid #dcdee0;
    border-radius: 2px;
    background-color: #fff;
    transition: border-color .25s;
    cursor: pointer;

    >span {
      display: block;
      width: 38px;
      height: 18px;
    }
  }
}
</style>