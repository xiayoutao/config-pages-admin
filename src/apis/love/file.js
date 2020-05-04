import API from '@/apis/urls.js';
import http from '@/scripts/axios.js';

export const fileTypes = {
  image: 0, // 图片
  audio: 1, // 音频
  video: 2 // 视频（暂时没用到）
};

export const mineTypes = {
  image: ['image/jpg', 'image/jpeg', 'image/png', 'image/gif'],
  audio: ['audio/mp3']
};

// 获取文件列表
export async function getFileList (data) {
  const res = await http({
    url: http.adornUrl(API.getFileList),
    method: 'post',
    data: http.adornData(data),
  });
  return http.handleData({
    ...res,
  });
}

// 获取所有文件
export async function getAllFile (data) {
  const res = await http({
    url: http.adornUrl(API.getAllFile),
    method: 'post',
    data: http.adornData(data),
  });
  return http.handleData({
    ...res,
  });
}

// 上传文件
export async function uploadFile (data) {
  const res = await http({
    url: http.adornUrl(API.uploadFile),
    method: 'post',
    data: http.adornData(data),
  });
  return http.handleData({
    ...res,
  });
}

// 删除文件
export async function deleteFile (data) {
  const res = await http({
    url: http.adornUrl(API.deleteFile),
    method: 'post',
    data: http.adornData(data),
  });
  return http.handleData({
    ...res,
  });
}