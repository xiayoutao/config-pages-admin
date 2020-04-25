const permissions = (sessionStorage.getItem('permissions') || '').split(','); // 拿到sessionStorage中保存的权限标识值，并根据,分割成数组

export default {
  // 指令第一次绑定到元素时调用
  bind (el, binding) {
    el.style.display = 'none'; // 先隐藏
  },
  // 被绑定元素插入父节点时调用
  inserted (el, binding) {
    const hasAuth = permissions.indexOf(binding.value) >= 0; // 判断当前指令中的值是否存在于permissions中
    if (hasAuth) { // 有权限
      el.style.display = ''; // 显示元素
    } else { // 没有权限
      el.parentNode.removeChild(el); // 移出元素
    }
  },
  // 所在组件的 VNode 更新时调用
  update () {},
  // 指令所在组件的 VNode 及其子 VNode 全部更新后调用
  componentUpdated () {},
  // 指令与元素解绑时调用
  unbind () {}
};
