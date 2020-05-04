import API from '@/apis/urls.js';
import http from '@/scripts/axios.js';

// 新增基本信息
export async function insertBaseInfo (data) {
  const res = await http({
    url: http.adornUrl(API.insertBaseInfo),
    method: 'post',
    data: http.adornData(data),
  });
  return http.handleData({
    ...res,
  });
}

// 更新基本信息
export async function updateBaseInfo (data) {
  const res = await http({
    url: http.adornUrl(API.updateBaseInfo),
    method: 'post',
    data: http.adornData(data),
  });
  return http.handleData({
    ...res,
  });
}

// 查询基本信息
export async function getBaseInfo (data) {
  const res = await http({
    url: http.adornUrl(API.getBaseInfo),
    method: 'post',
    data: http.adornData(data),
  });
  return http.handleData({
    ...res,
  });
}