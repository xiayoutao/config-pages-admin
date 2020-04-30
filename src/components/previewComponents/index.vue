<template>
<vuedraggable
  element="div"
  class="preview-cps"
  v-model="dataList"
  @start="handleDragStart"
  @end="handleDragEnd"
  v-if="dataList.length > 0"
>
  <div class="preview-cps-item" v-for="(item, index) in dataList" :key="index" @click="handleClick(item)">
    <span class="icon-drag"></span>
    <p>{{ item.label }}</p>
    <span class="delete" @click.stop="handleDelete(index)"></span>
  </div>
</vuedraggable>
<div class="preview-cps" v-else>
  <div class="no-data">
    <span class="icon"></span>
    <p class="text">暂无组件</p>
  </div>
</div>
</template>

<script>
import vuedraggable from 'vuedraggable';

export default {
  components: {
    vuedraggable,
  },
  props: {
    data: { // 当前活动tab标签（右侧显示内容）
      type: Array,
    }
  },
  data () {
    return {
      isDragging: false,
      visible: false, // 是否删除确认提醒弹框
      dataList: [],
    };
  },
  methods: {
    // 切换右侧显示标签
    handleChangeTabs (data) {
      this.activeTab = data.name;
    },
    handleDragStart (evt) {
      // console.log('handleDragStart');
      this.isDragging = true;
    },
    handleDragEnd (evt) {
      // console.log('handleDragEnd');
      this.isDragging = false;
      this.$emit('on-change', this.dataList);
    },
    handleClick (index) {
      this.$emit('on-click', index);
    },
    handleDelete (index) {
      const deleteLayout = { ...this.dataList[index] };
      this.dataList.splice(index, 1);
      this.$emit('on-change', this.dataList);
      this.$emit('on-update-use', deleteLayout);
    },
  },
  watch: {
    data: {
      handler (val) {
        this.dataList = [...val];
      },
      deep: true,
    }
  }
};
</script>

<style lang="scss" scoped>
.preview-cps {
  flex: 1;
  display: flex;
  flex-direction: column;
  margin: 12px 12px 0;

  .no-data {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 500px;

    .icon {
      display: block;
      width: 150px;
      height: 150px;
      background: url('../../images/no-data.png') no-repeat center;
      background-size: 100% 100%;
    }

    .text {
      margin: 0;
      font-size: 16px;
      color: #666;
    }
  }

  &-item {
    position: relative;
    display: flex;
    align-items: center;
    height: 40px;
    margin-top: 12px;
    padding: 0 40px 0 10px;
    border-radius: 2px;
    background-color: #fff;
    box-shadow: 0 0 4px 0 rgba(10,42,97,.2);
    user-select: none;
    cursor: move;

    .icon-drag {
      display: block;
      width: 20px;
      height: 20px;
      margin-right: 10px;
      background: url('../../images/icon-drag.png') no-repeat center;
      background-size: 20px;
    }

    >p {
      margin: 0;
      font-size: 14px;
      color: #666;
    }

    .delete {
      display: block;
      position: absolute;
      top: 50%;
      right: 10px;
      width: 20px;
      height: 20px;
      margin-top: -10px;
      background: url('../../images/icon-delete.png') no-repeat center;
      background-size: 20px;
      cursor: pointer;
    }

    /deep/ .delete-popover {
      display: block;
      text-align: right;
    }
  }
}
</style>