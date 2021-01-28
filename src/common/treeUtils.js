/**
 * 遍历列表找到ID匹配的类目
 */
export const treeToFlatData = (function () {
  var _data = [];
  var _arrayData = []; // 保存最终返回的数据

  /**
   * 格式化数据
   * @param {*} item
   */
  function formatData (item) {
    if (item === undefined || item === null || !(item instanceof Object)) return;
    _arrayData.push(item);
    if (item.children && item.children.length > 0) {
      item.children.forEach(subitem => {
        formatData(subitem);
      });
    }
  }

  /**
   * 返回的方法，供外部调用（闭包）
   */
  return function (data) {
    _data = data || [];
    if (!(_data instanceof Array) || _data.length === 0) {
      return this;
    }
    _arrayData = [];
    _data.forEach((item) => {
      formatData(item);
    });
    return _arrayData;
  };
})();

/**
 * 树形数据转换
 * @param {*} data
 * @param {*} id
 * @param {*} pid
 */
export function treeDataTranslate (data, id = 'mid', pid = 'pid') {
  var res = [];
  var temp = {};
  for (var i = 0; i < data.length; i++) {
    temp[data[i][id]] = data[i];
  }
  for (var k = 0; k < data.length; k++) {
    if (temp[data[k][pid]] && data[k][id] !== data[k][pid]) {
      if (!temp[data[k][pid]]['children']) {
        temp[data[k][pid]]['children'] = [];
      }
      if (!temp[data[k][pid]]['_level']) {
        temp[data[k][pid]]['_level'] = 1;
      }
      data[k]['_level'] = temp[data[k][pid]]._level + 1;
      temp[data[k][pid]]['children'].push(data[k]);
    } else {
      res.push(data[k]);
    }
  }
  return res;
}