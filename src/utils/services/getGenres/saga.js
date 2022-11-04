/**
 * getGenres saga
 */

import { all, put, takeLatest } from 'redux-saga/effects';
import { axios } from '../index';

/** ACTIONS */
import {
  getGenresSuccessAction,
} from './actions';
import {
  getErrorAction,
} from '../getError/actions';

/** CONSTANTS */
import { GENRES_ACTION_REQUEST } from './constants';

/**
 * @function getGenres
 * @yields getGenresSuccessAction / getErrorAction
 */
export function* getGenres() {
  try {
    const data = yield axios.get('static/genres').then((response) => response.data.results)

    yield put(getGenresSuccessAction(data))
  } catch (err) {
    yield put(getErrorAction(err.message))
  }
};

/**
 * @function watchGenresAction
 * @yields getGenres
 */
export function* watchGenresAction() {
  yield takeLatest(GENRES_ACTION_REQUEST, getGenres)
};

/**
 * @function saga
 * @yields all actions required
 */
export default function* saga() {
  yield all([
    watchGenresAction(),
  ])
};
