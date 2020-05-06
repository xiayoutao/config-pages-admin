import API from '@/apis/urls.js';
import http from '@/scripts/axios.js';

export const adminFlags = {
  enabled: 1, // 启用
  disabled: 0, // 禁用
};

// 获取用户列表（分页）
export async function getAdminList (data) {
  const res = await http({
    url: http.adornUrl(API.getAdminList),
    method: 'post',
    data: http.adornData(data),
  });
  console.log(res);
  return http.handleData({
    ...res,
  });
}

// 获取所有用户
export async function getAllAdmin (data) {
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
export async function insertAdmin (data) {
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
export async function deleteAdmin (data) {
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
export async function updateAdmin (data) {
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
export async function updateAdminPwd (data) {
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
export async function getAdminInfo (data) {
  const res = await http({
    url: http.adornUrl(API.getAdminInfo),
    method: 'post',
    data: http.adornData(data),
  });
  return http.handleData({
    ...res,
  });
}