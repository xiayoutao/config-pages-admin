export default [{
  mid: '1',
  name: '首页',
  icon: 'xyt-ios-desktop',
  path: '/home',
  component: '/common/home'
}, {
  mid: '2',
  name: '邀请函',
  icon: 'xyt-ios-apps',
  children: [{
    mid: '3-1',
    pid: '2',
    name: '基本信息',
    icon: 'xyt-ios-paper',
    path: '/love/base',
    component: '/love/base'
  }, {
    mid: '3-2',
    pid: '2',
    name: '甜蜜相册',
    icon: 'xyt-ios-albums',
    path: '/love/photos',
    component: '/love/photos'
  }, {
    mid: '3-3',
    pid: '2',
    name: '好友祝福',
    icon: 'xyt-ios-heart',
    path: '/love/bless',
    component: '/love/bless'
  }, {
    mid: '3-4',
    pid: '2',
    name: '留言评论',
    icon: 'xyt-ios-chatbubbles',
    path: '/love/message',
    component: '/love/message'
  }, {
    mid: '3-5',
    pid: '2',
    name: '图片管理',
    icon: 'xyt-ios-images',
    path: '/love/file-image',
    component: '/love/file-image'
  }, {
    mid: '3-6',
    pid: '2',
    name: '音频管理',
    icon: 'xyt-ios-musical-notes',
    path: '/love/file-music',
    component: '/love/file-music'
  }]
}, {
  mid: '4',
  name: '系统管理',
  icon: 'xyt-ios-apps',
  children: [{
    mid: '4-1',
    pid: '4',
    name: '菜单管理',
    icon: 'xyt-ios-musical-notes',
    path: '/sys/menu',
    component: '/sys/menu'
  }, {
    mid: '4-2',
    pid: '4',
    name: '用户管理',
    icon: 'xyt-ios-musical-notes',
    path: '/sys/user',
    component: '/sys/user'
  }, {
    mid: '4-3',
    pid: '4',
    name: '角色管理',
    icon: 'xyt-ios-musical-notes',
    path: '/sys/role',
    component: '/sys/role'
  }]
}];