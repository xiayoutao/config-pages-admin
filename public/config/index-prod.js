/**
 * 生产环境
 */
;
(function () {
  window.SITE_CONFIG = {};
  window.SITE_CONFIG['version'] = 'v1.0.0';
  window.SITE_CONFIG['copyright'] = '©2020&nbsp;&nbsp;&nbsp;&nbsp;夏尤涛';
  window.SITE_CONFIG['defaultPage'] = '/home';

  // api接口请求地址
  window.SITE_CONFIG['imageServer'] = 'https://image.xiayoutao.wang';
  window.SITE_CONFIG['baseUrl'] = 'https://api.xiayoutao.wang';
  window.SITE_CONFIG['cdnUrl'] = 'http://qiniu.xiayoutao.wang/';
  window.SITE_CONFIG['upload'] = '//up-z2.qiniup.com/';
  window.SITE_CONFIG['previewOrigin'] = 'http://h5.xiayoutao.wang';
})();