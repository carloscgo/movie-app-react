/*
 * getMovies reducer
 */

import produce from 'immer';

import {
  ACTION_ERROR
} from './constants';

export const initialState = {
  message: null,
};

const reducer = (state = initialState, action) =>
  produce(state, draft => {
    if (action.type === ACTION_ERROR) {
      draft.message = action.error
    }
  });

export default reducer;
