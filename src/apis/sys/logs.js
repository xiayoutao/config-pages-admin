import API from '@/apis/urls.js';
import http from '@/scripts/axios.js';

export const logsResults = {
  success: 'SUCCESS',
  fail: 'FAIL',
  error: 'ERROR'
};

// 获取日志列表
export async function getLogsList (data) {
  const res = await http({
    url: http.adornUrl(API.getLogsList),
    method: 'post',
    data: http.adornData(data),
  });
  return http.handleData({
    ...res,
  });
}

// 删除日志
export async function deleteLogs (data) {
  const res = await http({
    url: http.adornUrl(API.deleteLogs),
    method: 'post',
    data: http.adornData(data),
  });
  return http.handleData({
    ...res,
  });
}