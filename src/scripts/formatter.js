import * as constants from '@/constants';

import {
  getStatusName,
} from '@/scripts/utils';

/**
 * 文字难易程度
 * @param {*} row
 * @param {*} column
 * @param {*} cellValue 要格式化的值
 */
export function getWordLevel (row, column, cellValue) {
  return getStatusName(cellValue, constants.wordLevels);
}

/**
 * 文字类型
 * @param {*} row
 * @param {*} column
 * @param {*} cellValue 要格式化的值
 */
export function getWordType (row, column, cellValue) {
  return getStatusName(cellValue, constants.wordTypes);
}