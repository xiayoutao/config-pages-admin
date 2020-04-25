export default {
  // 指令第一次绑定到元素时调用
  bind (el, binding, vnode) {
    showImg(el, binding);
  },
  // 被绑定元素插入父节点时调用
  inserted (el, binding, vnode) {},
  // 所在组件的 VNode 更新时调用
  update (el, binding, vnode) {
    showImg(el, binding);
  },
  // 指令所在组件的 VNode 及其子 VNode 全部更新后调用
  componentUpdated () {},
  // 指令与元素解绑时调用
  unbind () {}
};

function showImg (el, binding) {
  el.style.backgroundColor = '#eee';
  var img = new Image();
  img.src = binding.value;

  if (!img.complete) {
    el.style.background = 'rgba(0,0,0,.05) url("/img/loadimg.svg")  no-repeat center / 50%';
  }

  img.onload = function () {
    el.style.background = '';
    el.src = binding.value;
  };

  img.onerror = function () {
    el.style.background = 'rgba(0,0,0,.05) url("/img/default.svg") center  no-repeat / 90%';
  };
}
