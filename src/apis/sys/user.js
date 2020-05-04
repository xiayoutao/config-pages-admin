import API from '@/apis/urls.js';
import http from '@/scripts/axios.js';

export const userFlags = {
  enabled: 1, // 启用
  disabled: 0, // 禁用
};

// 获取用户列表（分页）
export async function getUserList (data) {
  const res = await http({
    url: http.adornUrl(API.getUserList),
    method: 'post',
    data: http.adornData(data),
  });
  console.log(res);
  return http.handleData({
    ...res,
  });
}

// 获取所有用户
export async function getAllUser (data) {
  const res = await http({
    url: http.adornUrl(API.getAllUser),
    method: 'post',
    data: http.adornData(data),
  });
  return http.handleData({
    ...res,
  });
}

// 新增用户
export async function insertUser (data) {
  const res = await http({
    url: http.adornUrl(API.insertUser),
    method: 'post',
    data: http.adornData(data),
  });
  return http.handleData({
    ...res,
  });
}

// 删除用户
export async function deleteUser (data) {
  const res = await http({
    url: http.adornUrl(API.deleteUser),
    method: 'post',
    data: http.adornData(data),
  });
  return http.handleData({
    ...res,
  });
}

// 更新用户信息
export async function updateUser (data) {
  const res = await http({
    url: http.adornUrl(API.updateUser),
    method: 'post',
    data: http.adornData(data),
  });
  return http.handleData({
    ...res,
  });
}

// 更新用户密码
export async function updateUserPwd (data) {
  const res = await http({
    url: http.adornUrl(API.updateUserPwd),
    method: 'post',
    data: http.adornData(data),
  });
  return http.handleData({
    ...res,
  });
}

// 查询用户信息
export async function getUserInfo (data) {
  const res = await http({
    url: http.adornUrl(API.getUserInfo),
    method: 'post',
    data: http.adornData(data),
  });
  return http.handleData({
    ...res,
  });
}