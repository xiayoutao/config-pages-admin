import API from '@/apis/urls.js';
import http from '@/scripts/axios.js';

// 获取点赞列表
export async function getBlessList (data) {
  const res = await http({
    url: http.adornUrl(API.getBlessList),
    method: 'post',
    data: http.adornData(data),
  });
  return http.handleData({
    ...res,
  });
}