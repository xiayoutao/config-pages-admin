import * as API from '@/apis/urls';
import http from '@/scripts/axios';

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