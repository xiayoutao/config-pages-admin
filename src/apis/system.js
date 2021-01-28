import * as API from '@/apis/urls';
import http from '@/common/axios';

// 获取用户列表（分页）
export async function getAdminList(data) {
  const res = await http({
    url: http.adornUrl(API.getAdminList),
    method: 'post',
    data: http.adornData(data),
  });
  return http.handleData({
    ...res,
  });
}

// 获取所有用户
export async function getAllAdmin(data) {
  const res = await http({
    url: http.adornUrl(API.getAllAdmin),
    method: 'post',
    data: http.adornData(data),
  });
  return http.handleData({
    ...res,
  });
}

// 新增用户
export async function insertAdmin(data) {
  const res = await http({
    url: http.adornUrl(API.insertAdmin),
    method: 'post',
    data: http.adornData(data),
  });
  return http.handleData({
    ...res,
  });
}

// 删除用户
export async function deleteAdmin(data) {
  const res = await http({
    url: http.adornUrl(API.deleteAdmin),
    method: 'post',
    data: http.adornData(data),
  });
  return http.handleData({
    ...res,
  });
}

// 更新用户信息
export async function updateAdmin(data) {
  const res = await http({
    url: http.adornUrl(API.updateAdmin),
    method: 'post',
    data: http.adornData(data),
  });
  return http.handleData({
    ...res,
  });
}

// 更新用户密码
export async function updateAdminPwd(data) {
  console.log(data);
  const res = await http({
    url: http.adornUrl(API.updateAdminPwd),
    method: 'post',
    data: http.adornData(data),
  });
  return http.handleData({
    ...res,
  });
}

// 查询用户信息
export async function getAdminInfo(data) {
  const res = await http({
    url: http.adornUrl(API.getAdminInfo),
    method: 'post',
    data: http.adornData(data),
  });
  return http.handleData({
    ...res,
  });
}

// 获取配置列表
export async function getConfigList(data) {
  const res = await http({
    url: http.adornUrl(API.getConfigList),
    method: 'post',
    data: http.adornData(data),
  });
  return http.handleData({
    ...res,
  });
}

// 新增配置
export async function insertConfig(data) {
  const res = await http({
    url: http.adornUrl(API.insertConfig),
    method: 'post',
    data: http.adornData(data),
  });
  return http.handleData({
    ...res,
  });
}

// 删除配置
export async function deleteConfig(data) {
  const res = await http({
    url: http.adornUrl(API.deleteConfig),
    method: 'post',
    data: http.adornData(data),
  });
  return http.handleData({
    ...res,
  });
}

// 更新配置
export async function updateConfig(data) {
  const res = await http({
    url: http.adornUrl(API.updateConfig),
    method: 'post',
    data: http.adornData(data),
  });
  return http.handleData({
    ...res,
  });
}

// 查询配置信息
export async function getConfigInfo(data) {
  const res = await http({
    url: http.adornUrl(API.getConfigInfo),
    method: 'post',
    data: http.adornData(data),
  });
  return http.handleData({
    ...res,
  });
}

// 获取菜单列表
export async function getMenuList(data) {
  const res = await http({
    url: http.adornUrl(API.getMenuList),
    method: 'post',
    data: http.adornData(data),
  });
  return http.handleData({
    ...res,
  });
}

// 获取菜单权限
export async function getMenuAccess(data) {
  const res = await http({
    url: http.adornUrl(API.getMenuAccess),
    method: 'post',
    data: http.adornData(data),
  });
  return http.handleData({
    ...res,
  });
}

// 新增菜单
export async function insertMenu(data) {
  const res = await http({
    url: http.adornUrl(API.insertMenu),
    method: 'post',
    data: http.adornData(data),
  });
  return http.handleData({
    ...res,
  });
}

// 删除菜单
export async function deleteMenu(data) {
  const res = await http({
    url: http.adornUrl(API.deleteMenu),
    method: 'post',
    data: http.adornData(data),
  });
  return http.handleData({
    ...res,
  });
}

// 更新菜单信息
export async function updateMenu(data) {
  const res = await http({
    url: http.adornUrl(API.updateMenu),
    method: 'post',
    data: http.adornData(data),
  });
  return http.handleData({
    ...res,
  });
}

// 查询菜单信息
export async function getMenuInfo(data) {
  const res = await http({
    url: http.adornUrl(API.getMenuInfo),
    method: 'post',
    data: http.adornData(data),
  });
  return http.handleData({
    ...res,
  });
}

// 获取所有角色
export async function getAllRole(data) {
  const res = await http({
    url: http.adornUrl(API.getAllRole),
    method: 'post',
    data: http.adornData(data),
  });
  return http.handleData({
    ...res,
  });
}

// 获取角色列表
export async function getRoleList(data) {
  const res = await http({
    url: http.adornUrl(API.getRoleList),
    method: 'post',
    data: http.adornData(data),
  });
  return http.handleData({
    ...res,
  });
}

// 新增角色
export async function insertRole(data) {
  const res = await http({
    url: http.adornUrl(API.insertRole),
    method: 'post',
    data: http.adornData(data),
  });
  return http.handleData({
    ...res,
  });
}

// 删除角色
export async function deleteRole(data) {
  const res = await http({
    url: http.adornUrl(API.deleteRole),
    method: 'post',
    data: http.adornData(data),
  });
  return http.handleData({
    ...res,
  });
}

// 更新角色信息
export async function updateRole(data) {
  const res = await http({
    url: http.adornUrl(API.updateRole),
    method: 'post',
    data: http.adornData(data),
  });
  return http.handleData({
    ...res,
  });
}

// 查询角色信息
export async function getRoleInfo(data) {
  const res = await http({
    url: http.adornUrl(API.getRoleInfo),
    method: 'post',
    data: http.adornData(data),
  });
  return http.handleData({
    ...res,
  });
}

// 获取日志列表
export async function getLogsList(data) {
  const res = await http({
    url: http.adornUrl(API.getLogsList),
    method: 'post',
    data: http.adornData(data),
  });
  return http.handleData({
    ...res,
  });
}

// 删除日志
export async function deleteLogs(data) {
  const res = await http({
    url: http.adornUrl(API.deleteLogs),
    method: 'post',
    data: http.adornData(data),
  });
  return http.handleData({
    ...res,
  });
}