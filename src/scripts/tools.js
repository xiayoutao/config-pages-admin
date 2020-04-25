// 发送消息
export function postMessage (theWindow, data, delay = 0, origin = '*') {
  setTimeout(() => {
    theWindow.postMessage(data, 'http://localhost:7001');
  }, delay);
}