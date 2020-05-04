import API from '@/apis/urls.js';
import http from '@/scripts/axios.js';

// 获取页面列表
export async function getPageList (data) {
  const res = await http({
    url: http.adornUrl(API.getPageList),
    method: 'post',
    data: http.adornData(data),
  });
  return http.handleData({
    ...res,
  });
}

// 保存页面
export async function savePage (data) {
  const res = await http({
    url: http.adornUrl(API.savePage),
    method: 'post',
    data: http.adornData(data),
  });
  return http.handleData({
    ...res,
  });
}

// 删除页面
export async function deletePage (data) {
  const res = await http({
    url: http.adornUrl(API.deletePage),
    method: 'post',
    data: http.adornData(data),
  });
  return http.handleData({
    ...res,
  });
}

// 查询页面信息
export async function getPageInfo (data) {
  console.log(data);
  const res = await http({
    url: http.adornUrl(API.getPageInfo),
    method: 'post',
    data: http.adornData(data),
  });
  return http.handleData({
    ...res,
  });
}