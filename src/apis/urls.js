export default {
  getQiniuUptoken: '/qiniu/uptoken',
  login: '/common/login', // 登录
  logout: '/common/logout', // 退出
  // 管理员
  getAdminList: '/admin/list', // 获取用户列表
  getAllAdmin: '/admin/select', // 获取所有用户
  insertAdmin: '/admin/add', // 新增用户
  deleteAdmin: '/admin/delete', // 删除用户
  updateAdmin: '/admin/update', // 更新用户信息
  updateAdminPwd: '/admin/updatePwd', // 修改用户密码
  getAdminInfo: '/admin/info', // 获取用户信息
  // 用户给
  getUserList: '/user/list', // 获取用户列表
  getUserInfo: '/user/info', // 获取用户信息
  // 配置管理
  getConfigList: '/config/list', // 获取配置列表
  insertConfig: '/config/add', // 新增配置
  deleteConfig: '/config/delete', // 删除配置
  updateConfig: '/config/update', // 更新配置
  getConfigInfo: '/config/info', // 查询配置信息
  // 菜单管理
  getMenuList: '/menu/list',
  insertMenu: '/menu/add',
  deleteMenu: '/menu/delete',
  updateMenu: '/menu/update',
  getMenuInfo: '/menu/info',
  getMenuAccess: '/menu/access',
  // 页面管理
  getPageList: '/pages/list',
  savePage: '/pages/save',
  deletePage: '/pages/delete',
  getPageInfo: '/pages/info',
  // 角色
  getRoleList: '/role/list',
  getAllRole: '/role/select',
  insertRole: '/role/add',
  deleteRole: '/role/delete',
  updateRole: '/role/update',
  getRoleInfo: '/role/info',
  // 日志
  getLogsList: '/logs/list',
  deleteLogs: '/logs/delete',
  // 基本信息
  insertBaseInfo: '/base/add',
  updateBaseInfo: '/base/update',
  getBaseInfo: '/base/info',
  // 祝福管理
  getBlessList: '/bless/list',
  // 文件管理
  getFileList: '/file/list',
  getAllFile: '/file/select',
  uploadFile: '/file/upload',
  deleteFile: '/file/delete',
  // 留言管理
  getMsgList: '/message/list',
  deleteMsg: '/message/delete',
  // 相册管理
  getPhotoList: '/photos/list',
  getAllPhoto: '/photos/select',
  insertPhoto: '/photos/add',
  deletePhoto: '/photos/delete',
  updatePhoto: '/photos/update',
  updatePhotoSort: '/photos/updateSort',
  getPhotoInfo: '/photos/info',
};