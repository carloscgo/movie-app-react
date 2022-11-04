import invariant from 'invariant';
import { isEmpty, isFunction, isString } from 'lodash';
import createReducer from './reducers';
 
/**
 *
 * @param {object} store - store
 * @return {object} value
 */
export function injectReducerFactory (store) {
  return function injectReducer (key, reducer) {
    invariant(
      isString(key) && !isEmpty(key) && isFunction(reducer),
      '(src/utils...) injectReducer: Expected `reducer` to be a reducer function'
    )

    // Check `store.injectedReducers[`${key}`] === reducer` for hot reloading when a key is the same but a reducer is different
    if (
      Reflect.has(store.injectedReducers, key) &&
      store.injectedReducers[`${key}`] === reducer
    ) { return }

    store.injectedReducers[`${key}`] = reducer
    store.replaceReducer(createReducer(store.injectedReducers))
  }
};

/**
 * get injectors
 *
 * @param {object} store - store
 * @return {object} object
 */
export default function getInjectors (store) {
  return {
    injectReducer: injectReducerFactory(store)
  }
};
