import API from '@/apis/urls.js';
import http from '@/scripts/axios.js';

// 登录
export async function login (data) {
  const res = await http({
    url: http.adornUrl(API.login),
    method: 'post',
    data: http.adornData(data),
  });
  return http.handleData({
    ...res,
  });
}

// 获取七牛上传凭证
export async function qiniuUptoken (data) {
  const res = await http({
    url: http.adornUrl(API.qiniuUptoken),
    method: 'post',
    data: http.adornData(data),
  });
  return http.handleData({
    ...res,
  });
}