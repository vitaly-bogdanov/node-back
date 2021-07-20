import bcrypt from 'bcrypt';

import { SALT_ROUNDS } from './bcrypt.constant.js';

export const createHashService = (value) => bcrypt.hashSync(value, SALT_ROUNDS);

/**
 * 
 * @param {string} value - не захеширование значение
 * @param {string} hashValue - захешированое значение
 * @returns 
 */
export const isHashComparedService = (value, hashValue) => bcrypt.compareSync(value, hashValue);