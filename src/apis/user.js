import * as API from '@/apis/urls';
import http from '@/scripts/axios';

export const adminFlags = {
  enabled: 1, // 启用
  disabled: 0, // 禁用
};

// 有问题的
export async function getAllUser (data) {
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