import API from '@/apis/urls.js';
import http from '@/scripts/axios.js';

// 获取配置列表
export async function getConfigList (data) {
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
export async function insertConfig (data) {
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
export async function deleteConfig (data) {
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
export async function updateConfig (data) {
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
export async function getConfigInfo (data) {
  const res = await http({
    url: http.adornUrl(API.getConfigInfo),
    method: 'post',
    data: http.adornData(data),
  });
  return http.handleData({
    ...res,
  });
}