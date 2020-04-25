/**
 * 邮箱
 * @param {*} s
 */
export function isEmail (s) {
  return /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(s);
}

/**
 * 手机号码
 * @param {*} s
 */
export function isMobile (s) {
  return /^1[0-9]{10}$/.test(s);
}

/**
 * 电话号码
 * @param {*} s
 */
export function isPhone (s) {
  return /^([0-9]{3,4}-)?[0-9]{7,8}$/.test(s);
}

/**
 * URL地址
 * @param {*} s
 */
export function isURL (s) {
  return /^http[s]?:\/\/([\w\-]+(\.[\w\-]+)*\/)*[\w\-]+(\.[\w\-]+)*\/?(\?([\w\-\.,@?^=%&:\/~\+#]*)+)?/.test(s);
}

export function isIP (s) {
  return /(?=(\b|\D))(((\d{1,2})|(1\d{1,2})|(2[0-4]\d)|(25[0-5]))\.){3}((\d{1,2})|(1\d{1,2})|(2[0-4]\d)|(25[0-5]))(?=(\b|\D))/.test(s);
}

/**
 * 判断整数
 * @param {*} s
 */
export function isInteger (s) {
  return /^[0-9]+$/.test(s);
}

/**
 * 校验小数（正）
 * @param {*} s
 * @param {*} num 几位小数
 */
export function decimal (s, num) {
  var reg = /^[0-9]+\.?[0-9]*$/;
  if (!reg.test(s)) {
    return false;
  } else {
    if (num > 0) {
      var decimal = s.split('.')[1] + '';
      if (decimal.length !== num) {
        return false;
      }
    }
  }
}

/**
 * 校验金额，2位小数
 * @param {*} s
 */
export function isMoney (s) {
  var reg = /^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/;
  return reg.test(s);
}

/**
 * 英文字母
 * @param {*} s
 */
export function isLetter (s) {
  return /^[a-zA-Z]+$/.test(s);
}

/**
 * 英文字母或者数字
 * @param {*} s
 */
export function isLetterAndNumber (s) {
  return /^[a-zA-Z0-9]+$/.test(s);
}

/**
 * 获取字符串长度
 * @param {*} s
 * @param {*} flag 为0，中文字符做一个字符统计，为1时，中文字符做2个字符统计
 */
export function getStrLength (s, flag) {
  if (flag && flag === 1) {
    return s.replace(/[\u0391-\uFFE5]/g, 'aa').length;
  } else {
    return s.length;
  }
}
