/*
 * getMovies actions
 */

import {
  MOVIES_ACTION_REQUEST,
  MOVIES_ACTION_SUCCESS,
  MOVIES_ACTION_FAVORITE,
  MOVIES_ACTION_UNFAVORITE,
  MOVIES_ACTION_DELETE,
  MOVIES_ACTION_UNDELETE,
  MOVIES_ACTION_ADD
} from './constants';

/**
 * @function getMoviesRequestAction
 * @param {Int} offset - Page
 * @param {Int} limit - PageSize
 * @param {Int} genreId - Genre Id
 * @param {String} title - Title
 * @return {object} { type }
 */
export const getMoviesRequestAction = ({ offset, limit, genreId, title }) => ({
  type: MOVIES_ACTION_REQUEST,
  offset, 
  limit, 
  genreId, 
  title
});

/**
 * @function getMoviesSuccessAction
 * @param {Array} data - Movies
 * @return {object} { type, data }
 */
export const getMoviesSuccessAction = (data) => ({
  type: MOVIES_ACTION_SUCCESS,
  data,
});

/**
 * @function getMoviesFavoriteAction
 * @param {object} data - Movie
 * @return {object} { type, data }
 */
export const getMoviesFavoriteAction = ({ data }) => ({
  type: MOVIES_ACTION_FAVORITE,
  data
});

/**
 * @function getMoviesUnfavoriteAction
 * @param {object} data - Movie
 * @return {object} { type, data }
 */
export const getMoviesUnfavoriteAction = ({ data }) => ({
  type: MOVIES_ACTION_UNFAVORITE,
  data
});

/**
 * @function getMoviesDeleteAction
 * @param {object} data - Movie
 * @return {object} { type, data }
 */
export const getMoviesDeleteAction = ({ data }) => ({
  type: MOVIES_ACTION_DELETE,
  data
});

/**
 * @function getMoviesUndeleteAction
 * @param {object} data - Movie
 * @return {object} { type, data }
 */
export const getMoviesUndeleteAction = ({ data }) => ({
  type: MOVIES_ACTION_UNDELETE,
  data
});

/**
 * @function getMoviesAddAction
 * @param {object} data - Movie
 * @return {object} { type, data }
 */
export const getMoviesAddAction = ({ data }) => ({
  type: MOVIES_ACTION_ADD,
  data
});

