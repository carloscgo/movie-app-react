/*
 * getGenres actions
 */

import {
  GENRES_ACTION_REQUEST,
  GENRES_ACTION_SUCCESS,
} from './constants';

/**
 * @function getGenresRequestAction
 * @return {object} { type }
 */
export const getGenresRequestAction = () => ({
  type: GENRES_ACTION_REQUEST,
});

/**
 * @function getGenresSuccessAction
 * @param {Array} data - Genres
 * @return {object} { type, data }
 */
export const getGenresSuccessAction = (data)=> ({
  type: GENRES_ACTION_SUCCESS,
  data
});
