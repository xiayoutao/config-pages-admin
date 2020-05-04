import API from '@/apis/urls.js';
import http from '@/scripts/axios.js';

// 获取留言列表
export async function getMsgList (data) {
  const res = await http({
    url: http.adornUrl(API.getMsgList),
    method: 'post',
    data: http.adornData(data),
  });
  return http.handleData({
    ...res,
  });
}

// 删除留言
export async function deleteMsg (data) {
  const res = await http({
    url: http.adornUrl(API.deleteMsg),
    method: 'post',
    data: http.adornData(data),
  });
  return http.handleData({
    ...res,
  });
}