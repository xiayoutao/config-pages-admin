import * as API from '@/apis/urls.js';
import http from '@/scripts/axios.js';

// 获取文字列表
export async function getWordList (data) {
  const res = await http({
    url: http.adornUrl(API.getWordList),
    method: 'post',
    data: http.adornData(data),
  });
  return http.handleData({
    ...res,
  });
}

// 新增文字
export async function insertWord (data) {
  const res = await http({
    url: http.adornUrl(API.insertWord),
    method: 'post',
    data: http.adornData(data),
  });
  return http.handleData({
    ...res,
  });
}

// 批量新增文字
export async function batchInsertWord (data) {
  const res = await http({
    url: http.adornUrl(API.batchInsertWord),
    method: 'post',
    data: http.adornData(data),
  });
  return http.handleData({
    ...res,
  });
}

// 删除文字
export async function deleteWord (data) {
  const res = await http({
    url: http.adornUrl(API.deleteWord),
    method: 'post',
    data: http.adornData(data),
  });
  return http.handleData({
    ...res,
  });
}

// 更新文字
export async function updateWord (data) {
  const res = await http({
    url: http.adornUrl(API.updateWord),
    method: 'post',
    data: http.adornData(data),
  });
  return http.handleData({
    ...res,
  });
}

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