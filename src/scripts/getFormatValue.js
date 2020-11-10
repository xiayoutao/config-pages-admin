import * as constants from '@/constants';

import {
  getStatusName,
} from './utils';

export function getWordLevel (data) {
  return getStatusName(data, constants.wordLevels);
}

export function getWordType (data) {
  return getStatusName(data, constants.wordTypes);
}

export function getPinType (data) {
  return getStatusName(data, constants.pinTypes);
}