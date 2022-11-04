import axios from 'axios';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useInjectReducer } from '../injectReducer';
import { useInjectSaga } from '../injectSaga';
import { REACT_APP } from '../constants';

axios.defaults.headers.common['X-RapidAPI-Key'] = REACT_APP.API_KEY;
axios.defaults.headers.common['X-RapidAPI-Host'] = REACT_APP.API_HOST;
axios.defaults.baseURL = `https://${REACT_APP.API_HOST}/`;

const setStorage = (key, value) => localStorage.setItem(key, JSON.stringify(value));
const getStorage = (key, def) => JSON.parse(localStorage.getItem(key)) || def;

export {
  connect,
  createStructuredSelector,
  compose,
  useInjectReducer,
  useInjectSaga,
  axios,
  setStorage,
  getStorage
};