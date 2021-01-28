import * as API from '@/apis/urls';
import http from '@/common/axios';

// 登录
export async function login(data) {
  const res = await http({
    url: http.adornUrl(API.login),
    method: 'post',
    data: http.adornData(data),
  });
  return http.handleData({
    ...res,
  });
}

// 退出
export async function logout() {
  const res = await http({
    url: http.adornUrl(API.logout),
    method: 'post',
  });
  return http.handleData({
    ...res,
  });
}

// 获取七牛上传凭证
export async function getQiniuUptoken(data) {
  const res = await http({
    url: http.adornUrl(API.getQiniuUptoken),
    method: 'post',
    data: http.adornData(data),
  });
  return http.handleData({
    ...res,
  });
}

export async function getBaiduToken() {
  const res = await http({
    url: http.adornUrl(API.getBaiduToken),
    method: 'post',
  });
  return http.handleData({
    ...res,
  });
}