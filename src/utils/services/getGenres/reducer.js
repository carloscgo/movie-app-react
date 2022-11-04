/*
 * getGenres reducer
 */

import produce from 'immer';
import uniqBy from 'lodash/uniqBy';

import {
  GENRES_ACTION_REQUEST,
  GENRES_ACTION_SUCCESS,
} from './constants';

import {
  ACTION_ERROR
} from '../getError/constants';

import {
  setStorage
} from '..';

export const initialState = {
  loading: false,
  error: null,
  data: []
};

const reducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case GENRES_ACTION_REQUEST:
        draft.loading = true
        draft.error = null
        break

      case GENRES_ACTION_SUCCESS:
        draft.loading = false
        draft.error = null
        draft.data = uniqBy([
          ...state.data,
          ...action.data.map((item) => ({
            value: item.netflix_id,
            label: item.genre
          }))
        ], 'value')

        setStorage('genres', draft.data)
        break

      case ACTION_ERROR:
        draft.loading = false
        break

      default:
        return initialState
    }
  });

export default reducer;
