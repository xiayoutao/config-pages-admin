export const adminFlags = {
  enabled: 1, // 启用
  disabled: 0, // 禁用
};

export const menuTypes = {
  catalog: 0, // 目录
  menu: 1, // 菜单
};

export const logsResults = {
  success: 'SUCCESS',
  fail: 'FAIL',
  error: 'ERROR'
};

export const fileTypes = {
  image: 0, // 图片
  audio: 1, // 音频
  video: 2 // 视频（暂时没用到）
};

export const mimeTypes = {
  image: ['image/jpg', 'image/jpeg', 'image/png', 'image/gif'],
  audio: ['audio/mp3']
};

/**
 * 文字难易程度
 */
export const wordLevels = [
  { label: '简单', value: 1 },
  { label: '中等', value: 2 },
  { label: '难', value: 3 },
];

/**
 * 文字类型
 */
export const wordTypes = [
  { label: '汉字', value: 0 },
  { label: '字母', value: 1 },
  { label: '拼音', value: 2 },
];

/**
 * 拼音类型
 */
export const pinTypes = [
  { label: '声母', value: 1 },
  { label: '韵母', value: 2 },
  { label: '整体音节', value: 3 },
];