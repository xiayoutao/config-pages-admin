import API from '@/apis/urls.js';
import http from '@/scripts/axios.js';

// 获取所有角色
export async function getAllRole (data) {
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
export async function getRoleList (data) {
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
export async function insertRole (data) {
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
export async function deleteRole (data) {
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
export async function updateRole (data) {
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
export async function getRoleInfo (data) {
  const res = await http({
    url: http.adornUrl(API.getRoleInfo),
    method: 'post',
    data: http.adornData(data),
  });
  return http.handleData({
    ...res,
  });
}