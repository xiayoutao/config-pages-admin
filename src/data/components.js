// 组件列表
export const compList = [
  { name: 'x-title', label: '标题', icon: 'icon-title', },
  { name: 'x-notice', label: '公告', icon: 'icon-notice', },
  { name: 'x-division', label: '辅助分割', icon: 'icon-division', },
  { name: 'x-search', label: '搜索', icon: 'icon-find', },
  { name: 'x-image-ad', label: '图片广告', icon: 'icon-imageAd', },
  { name: 'x-image-nav', label: '图片导航', icon: 'icon-imageNav' },
  { name: 'x-audio', label: '音频', icon: 'icon-audio', },
  { name: 'x-video', label: '视频', icon: 'icon-video', },
  { name: 'x-member-enter', label: '进入会员中心', icon: 'icon-memberEnter', },
  { name: 'x-member-info', label: '会员信息', icon: 'icon-memberInfo', },
];

// 组件使用情况
export const compUse = {
  'x-title': { use: 0, max: 20 },
  'x-notice': { use: 0, max: 1 },
  'x-division': { use: 0, max: 50 },
  'x-search': { use: 0, max: 1 },
  'x-image-ad': { use: 0, max: 10 },
  'x-image-nav': { use: 0, max: 10 },
  'x-audio': { use: 0, max: 1 },
  'x-video': { use: 0, max: 1 },
  'x-member-enter': { use: 0, max: 1 },
  'x-member-info': { use: 0, max: 1 },
};

// 组件默认值
export const compDefaultData = {
  'x-title': { title: '标题内容', desc: '', linkType: 0, },
  'x-notice': { message: '请填写内容，如果过长，将会在手机上滚动显示', background: '#fff8e9', color: '#646566', },
  'x-division': { height: 30, min: 10, max: 50, },
  'x-search': { height: 40, min: 30, max: 40, placeholder: null, align: 'left', },
  'x-image-ad': { ad: [], },
  'x-image-nav': { nav: [], },
  'x-audio': { type: 0, title: '', url: '', loop: false, },
  'x-video': { poster: '', url: '', },
  'x-member-enter': { title: '会员中心', actionText: '查看', },
  'x-member-info': { background: '', showType: 0, },
};

// 组件展示列表每个组件的宽高
export const compItemBox = {
  width: 100,
  height: 84,
};