import API from '@/apis/urls.js';
import http from '@/scripts/axios.js';

// 获取照片列表
export async function getPhotoList (data) {
  const res = await http({
    url: http.adornUrl(API.getPhotoList),
    method: 'post',
    data: http.adornData(data),
  });
  return http.handleData({
    ...res,
  });
}

// 获取所有照片
export async function getAllPhoto (data) {
  const res = await http({
    url: http.adornUrl(API.getAllPhoto),
    method: 'post',
    data: http.adornData(data),
  });
  return http.handleData({
    ...res,
  });
}

// 新增照片
export async function insertPhoto (data) {
  const res = await http({
    url: http.adornUrl(API.insertPhoto),
    method: 'post',
    data: http.adornData(data),
  });
  return http.handleData({
    ...res,
  });
}

// 删除照片
export async function deletePhoto (data) {
  const res = await http({
    url: http.adornUrl(API.deletePhoto),
    method: 'post',
    data: http.adornData(data),
  });
  return http.handleData({
    ...res,
  });
}

// 更新照片
export async function updatePhoto (data) {
  const res = await http({
    url: http.adornUrl(API.updatePhoto),
    method: 'post',
    data: http.adornData(data),
  });
  return http.handleData({
    ...res,
  });
}

// 修改照片排序
export async function updatePhotoSort (data) {
  const res = await http({
    url: http.adornUrl(API.updatePhotoSort),
    method: 'post',
    data: http.adornData(data),
  });
  return http.handleData({
    ...res,
  });
}

// 查看照片
export async function getPhotoInfo (data) {
  const res = await http({
    url: http.adornUrl(API.getPhotoInfo),
    method: 'post',
    data: http.adornData(data),
  });
  return http.handleData({
    ...res,
  });
}