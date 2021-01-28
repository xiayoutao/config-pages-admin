/**
 * 邮箱
 * @param {*} s
 */
export function isEmail (s) {
  return /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2, 3}){1, 2})$/.test(s);
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
  return /^([0-9]{3, 4}-)?[0-9]{7,8}$/.test(s);
}

/**
 * URL地址
 * @param {*} s
 */
export function isURL (s) {
  return /^http[s]?:\/\/([\w\-]+(\.[\w\-]+)*\/)*[\w\-]+(\.[\w\-]+)*\/?(\?([\w\-\.,@?^=%&:\/~\+#]*)+)?/.test(s);
}

export function isIP (s) {
  return /(?=(\b|\D))(((\d{1, 2})|(1\d{1, 2})|(2[0-4]\d)|(25[0-5]))\.){3}((\d{1, 2})|(1\d{1, 2})|(2[0-4]\d)|(25[0-5]))(?=(\b|\D))/.test(s);
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
  var reg = /^(([1-9][0-9]*)|(([0]\.\d{1, 2}|[1-9][0-9]*\.\d{1, 2})))$/;
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

/**
 * 判断身份证号码是否正确
 * @param {*} idcard 身份证号码
 */
export function isID (idcard) {
  let pass = true; // 是否验证通过
  const city = { 11: '北京', 12: '天津', 13: '河北', 14: '山西', 15: '内蒙古', 21: '辽宁', 22: '吉林', 23: '黑龙江 ', 31: '上海', 32: '江苏', 33: '浙江', 34: '安徽', 35: '福建', 36: '江西', 37: '山东', 41: '河南', 42: '湖北 ', 43: '湖南', 44: '广东', 45: '广西', 46: '海南', 50: '重庆', 51: '四川', 52: '贵州', 53: '云南', 54: '西藏 ', 61: '陕西', 62: '甘肃', 63: '青海', 64: '宁夏', 65: '新疆', 71: '台湾', 81: '香港', 82: '澳门', 91: '国外' };
  let errorTips = '';
  if (!idcard || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(idcard)) {
    errorTips = '身份证号格式错误';
    pass = false;
  } else if (!city[idcard.substr(0, 2)]) {
    errorTips = '地址编码错误';
    pass = false;
  } else if (idcard.length === 18) {
    const factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]; // 加权因子, ∑(ai×Wi)(mod 11)
    const parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2]; // 校验位
    let sum = 0;
    let ai = 0;
    let wi = 0;
    const codes = idcard.split('');
    codes.forEach((item, index) => {
      if (index < 17) {
        ai = codes[index];
        wi = factor[index];
        sum += ai * wi;
      }
    });
    if (parity[sum % 11] != codes[17]) {
      errorTips = '校验位错误';
      pass = false;
    }
  }
  return pass;
}