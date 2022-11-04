/*
 * getMovies reducer
 */

import produce from 'immer';
import uniqBy from 'lodash/uniqBy';

import {
  MOVIES_ACTION_REQUEST,
  MOVIES_ACTION_SUCCESS,
  MOVIES_ACTION_FAVORITE,
  MOVIES_ACTION_UNFAVORITE,
  MOVIES_ACTION_DELETE,
  MOVIES_ACTION_UNDELETE,
  MOVIES_ACTION_ADD
} from './constants';

import {
  ACTION_ERROR
} from '../getError/constants';

import {
  setStorage,
  getStorage
} from '..';

export const initialState = {
  loading: false,
  error: null,
  data: [],
  favorites: [],
  deletes: []
};

const convertHTMLEntity = (text) => {
  const span = document.createElement('span');

  return text
    .replace(/&[#A-Za-z0-9]+;/gi, (entity) => {
      span.innerHTML = entity;
      return span.innerText;
    });
};

const setDataFromStorage = ({ draft, state, action, name }) => {
  draft[name] = uniqBy([
    ...state[name],
    ...getStorage(name, []),
    action.data
  ], 'id')
  setStorage(name, draft[name])
};

const reducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case MOVIES_ACTION_REQUEST:
        draft.loading = true
        draft.error = null
        break

      case MOVIES_ACTION_SUCCESS:
        draft.loading = false
        draft.error = null
        draft.data = uniqBy([
          ...state.data,
          ...action.data.map((item) => ({
            id: item.netflix_id,
            img: item.img,
            title: convertHTMLEntity(item.title),
            date: (new Date(item.title_date)).toLocaleDateString("en-US"),
            description: item.synopsis,
          }))
        ], 'id')

        setStorage('movies', draft.data)
        break

      case MOVIES_ACTION_FAVORITE:
        setDataFromStorage({ draft, state, action, name: 'favorites' })
        break

      case MOVIES_ACTION_UNFAVORITE:
        draft.favorites = draft.favorites.filter((item) => item.id !== action.data.id)
        setStorage('favorites', draft.favorites)
        break

      case MOVIES_ACTION_DELETE:
        setDataFromStorage({ draft, state, action, name: 'deletes' })
        break

      case MOVIES_ACTION_UNDELETE:
        draft.deletes = draft.deletes.filter((item) => item.id !== action.data.id)
        setStorage('deletes', draft.deletes)
        break

      case MOVIES_ACTION_ADD:
        draft.data = uniqBy([
          ...state.data,
          {
            id: action.data.id,
            img: action.data.img,
            genre: action.data.genre,
            title: convertHTMLEntity(action.data.title),
            date: (new Date(action.data.date)).toLocaleDateString("en-US"),
            description: action.data.description,
          }
        ], 'id')

        setStorage('movies', draft.data)
        break

      case ACTION_ERROR:
        draft.loading = false
        break

      default:
        return initialState
    }
  });

export default reducer;
