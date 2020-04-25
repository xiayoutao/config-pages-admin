import store from '@/store';

// 发送消息
export function postMessage (theWindow, data, delay = 0, origin = '*') {
  origin = origin || store.state.previewOrigin;
  setTimeout(() => {
    theWindow.postMessage(data, 'http://localhost:7001');
  }, delay);
}