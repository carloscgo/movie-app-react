import { createSelector } from 'reselect';
import uniqBy from 'lodash/uniqBy';

import { initialState } from './reducer';

import { getStorage } from '..';

/**
 * Direct selector to the movies state domain
 */

export const selectDomain = (state) => state.movies || initialState;

/**
 * @function makeDataSelector
 * @return {string} data from state
 */
export const makeDataSelector = () =>
  createSelector(
    selectDomain,
    substate => ({
      ...substate,
      data: uniqBy(
        [...(getStorage('movies', [])), ...substate.data].filter((item) => !getStorage('deletes', []).map((deleted) => deleted.id).includes(item.id)),
        'id')
    })
  );

/**
 * @function makeFavoritesSelector
 * @return {string} data from state
 */
export const makeFavoritesSelector = () =>
  createSelector(
    selectDomain,
    substate => ({
      ...substate,
      data: uniqBy(
        [...(getStorage('favorites', [])), ...substate.favorites].filter((item) => !getStorage('deletes', []).map((deleted) => deleted.id).includes(item.id)),
        'id')
    }));

/**
 * @function makeDeletesSelector
 * @return {string} data from state
 */
export const makeDeletesSelector = () =>
  createSelector(
    selectDomain,
    substate => ({
      ...substate,
      data: uniqBy(
        [...(getStorage('deletes', [])), ...substate.deletes],
        'id')
    }));
