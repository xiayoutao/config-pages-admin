import store from '@/store';

import {
  messageCallback,
} from './common';

// 发送消息
export function postMessage (theWindow, data, delay = 0, origin) {
  origin = origin || store.state.previewOrigin;
  console.log('origin', origin);
  setTimeout(() => {
    theWindow.postMessage(data, origin);
  }, delay);
}

/**
 * 判断iframe是否加载完毕
 */
export function checkIFrameLoaded (iframe, callback) {
  if (iframe.attachEvent) {
    iframe.attachEvent('onload', () => {
      // iframe加载完毕以后执行操作
      console.log('iframe已加载完毕');
      if (typeof callback === 'function') {
        callback();
      }
    });
  } else {
    iframe.onload = () => {
      // iframe加载完毕以后执行操作
      console.log('iframe已加载完毕');
      if (typeof callback === 'function') {
        callback();
      }
    };
  }
}

// 处理响应结果
export function handleResultData (res, options) {
  options = Object.assign({
    processing: true, // 是否处理数据
    successCode: 0, // 成功返回回调状态
  }, options);
  if (options.processing) {
    if (res.code === options.successCode) {
      return res.result || true;
    }
    messageCallback('error', res.msg);
    return false;
  }
  return res;
}