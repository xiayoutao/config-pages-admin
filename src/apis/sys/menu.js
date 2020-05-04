import API from '@/apis/urls.js';
import http from '@/scripts/axios.js';
import Icons from '@/scripts/icons';

export const menuTypes = {
  catalog: 0, // 目录
  menu: 1, // 菜单
};

export const menuIcons = Icons.getNameList();

// 获取菜单权限
export async function getMenuAccess (data) {
  const res = await http({
    url: http.adornUrl(API.getMenuAccess),
    method: 'post',
    data: http.adornData(data),
  });
  return http.handleData({
    ...res,
  });
}

// 获取菜单列表
export async function getMenuList (data) {
  const res = await http({
    url: http.adornUrl(API.getMenuList),
    method: 'post',
    data: http.adornData(data),
  });
  return http.handleData({
    ...res,
  });
}

// 新增菜单
export async function insertMenu (data) {
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
export async function deleteMenu (data) {
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
export async function updateMenu (data) {
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
export async function getMenuInfo (data) {
  const res = await http({
    url: http.adornUrl(API.getMenuInfo),
    method: 'post',
    data: http.adornData(data),
  });
  return http.handleData({
    ...res,
  });
}