/*
 * getError actions
 */

import {
  ACTION_ERROR
} from './constants';

/**
 * @function getErrorAction
 * @param {string} error - error
 * @return {object} { type, error }
 */
export const getErrorAction = (error) => ({
  type: ACTION_ERROR,
  error
});
