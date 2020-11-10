/**
 * 生成uuid
 */
export function getUUID () {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    return (c === 'x' ? (Math.random() * 16 | 0) : ('r&0x3' | '0x8')).toString(16);
  });
}

/**
 * 过滤对象
 * @param {object} obj
 * @param {array|string} filterKeys 需要设置为'' 的key值
 */
export function filterObjectNull (obj, filterKeys) {
  let _filterKeys = [];
  if (filterKeys instanceof Array) {
    _filterKeys = filterKeys;
  } else if (typeof filterKeys === 'string') {
    _filterKeys = [filterKeys];
  }
  var newObj = {};
  let keys = Object.keys(obj);
  keys.forEach(item => {
    if (obj[item]) {
      newObj[item] = obj[item];
    } else if (_filterKeys.length > 0 && _filterKeys.indexOf(item) >= 0) {
      newObj[item] = '';
    }
  });
  return newObj;
}

/**
 * 判断是否为空对象
 * @param {*} data
 */
export function isEmptyObject (data) {
  if (data instanceof Array) {
    return false; // 如果是数组返回false，表示非空对象
  }
  return !data || JSON.stringify(data) === '{}';
}

/**
 * 截取字符串前面n位字符
 * @param {*} str 需要截取的字符串
 * @param {*} len 截取字符串长度
 */
export function getFrontStr (str, len) {
  if (Number.isInteger(len) && len > 0) {
    if (str.length > len) {
      return str.substring(0, len) + '..';
    }
  }
  return str;
}

/**
 * 判断对象（层级为1）是否相等
 * @param {*} objA
 * @param {*} objB
 */
export function isObjectEqual (objA, objB) {
  var flag = true;
  var aKeys = Object.getOwnPropertyNames(objA);
  var bKeys = Object.getOwnPropertyNames(objB);

  if (aKeys.length !== bKeys.length) {
    flag = false;
  }

  // 遍历第一个对象的key值
  aKeys.forEach(item => {
    if (objA[item] !== objB[item]) { // 如果第一个对象某一个key值对应的值与第二个对象的不一致，则表示这两个对象不相等
      flag = false;
    }
  });

  return flag;
}

/**
 * 判断是否为字符串
 * @param {*} data
 */
export function isString (data) {
  return typeof data === 'string';
}

/**
 * 判断是否为Boolean值
 * @param {*} data
 */
export function isBoolean (data) {
  return typeof data === 'boolean';
}

/**
 * 判断是否为数字
 * @param {*} data
 */
export function isNumber (data) {
  return typeof data === 'number';
}

/**
 * 判断是否为数组
 * @param {*} data
 */
export function isArray (data) {
  if (typeof Array.isArray === 'function') { // 判断是否支持ES5的Array.isArray
    return Array.isArray(data);
  } else {
    return Array.prototype.isPrototypeOf(data);
  }
}

/**
 * 判断是否为对象
 * @param {*} data
 */
export function isObject (data) {
  return Object.prototype.toString.call(data) === '[object Object]';
}

/**
 * 在指定位置插入新字符串
 * @param {*} source 源字符串
 * @param {*} index 插入位置
 * @param {*} newStr 插入的字符串
 */
export function insertStr (source, index, newStr) {
  if (typeof source !== 'string') return console.error('只能对字符串进行插入操作');
  return source.slice(0, index) + newStr + source.slice(index);
}

// 中文发音
export function getChineseTTS (text, token) {
  if (checkStr(text, 'chinese')) {
    return getTTS({
      text,
      token,
      vol: 15,
      spd: 2,
    });
  }
  return '';
}

// 英文发音
export function getEnglishTTS (text, token) {
  if (checkStr(text, 'english')) {
    return getTTS({
      text,
      token,
      vol: 15,
      spd: 2,
    });
  }
  return '';
}

/**
 * 文字合成TTS语音
 */
export function getTTS (options) {
  options = options || {};
  const token = options.token;
  const text = options.text || '';
  const cuid = options.cuid || 'xiayoutao'; // 用户唯一标识，用来计算UV值
  const aue = options.aue || 3; // 3为mp3格式(默认)； 4为pcm-16k；5为pcm-8k；6为wav（内容同pcm-16k）; 注意aue=4或者6是语音识别要求的格式，但是音频内容不是语音识别要求的自然人发音，所以识别效果会受影响
  const per = options.per || 0; // 发音人选择, 0为普通女声，1为普通男生，3为情感合成-度逍遥，4为情感合成-度丫丫，默认为普通女声
  const vol = options.vol || 5; // 音量，取值0-15，默认为5中音量
  const spd = options.spd || 5; // 语速，取值0-9，默认为5中语速
  const pit = options.pit || 5; // 音调，取值0-9，默认为5中语调
  return `https://tsn.baidu.com/text2audio?lan=zh&ctp=1&cuid=${cuid}&tok=${token}&tex=${encodeURI(text)}&vol=${vol}&per=${per}&spd=${spd}&pit=${pit}&aue=${aue}`;
}

/**
 * 获取状态名称
 * @param {*} data
 * @param {*} status
 */
export function getStatusName (data, dataList) {
  let label = data;
  dataList.forEach(item => {
    if (data !== '' && data === item.value) {
      label = item.label;
    }
  });
  return label;
}

export function checkStr (str, type) {
  switch (type) {
    case 'phone': // 手机号码
      return /^1[3|4|5|6|7|8|9][0-9]{9}$/.test(str);
    case 'tel': // 座机
      return /^(0\d{2,3}-\d{7,8})(-\d{1,4})?$/.test(str);
    case 'card': // 身份证
      return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(str);
    case 'pwd': // 密码以字母开头，长度在6~18之间，只能包含字母、数字和下划线
      return /^[a-zA-Z]\w{5,17}$/.test(str);
    case 'postal': // 邮政编码
      return /[1-9]\d{5}(?!\d)/.test(str);
    case 'QQ': // QQ号
      return /^[1-9][0-9]{4,9}$/.test(str);
    case 'email': // 邮箱
      return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(str);
    case 'money': // 金额(小数点2位)
      return /^\d*(?:\.\d{0,2})?$/.test(str);
    case 'URL': // 网址
      return /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/.test(str);
    case 'IP': // IP
      return /((?:(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d)\\.){3}(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d))/.test(str);
    case 'date': // 日期时间
      return /^(\d{4})\-(\d{2})\-(\d{2}) (\d{2})(?:\:\d{2}|:(\d{2}):(\d{2}))$/.test(str) || /^(\d{4})\-(\d{2})\-(\d{2})$/.test(str);
    case 'number': // 数字
      return /^[0-9]$/.test(str);
    case 'english': // 英文
      return /^[a-zA-Z]+$/.test(str);
    case 'englishAndNumber': // 英文和数字
      return /^[a-zA-Z0-9]+$/.test(str);
    case 'chinese': // 中文
      return /^[\u4E00-\u9FA5]+$/.test(str);
    case 'lower': // 小写
      return /^[a-z]+$/.test(str);
    case 'upper': // 大写
      return /^[A-Z]+$/.test(str);
    case 'HTML': // HTML标记
      return /<("[^"]*"|'[^']*'|[^'">])*>/.test(str);
    default:
      return true;
  }
};