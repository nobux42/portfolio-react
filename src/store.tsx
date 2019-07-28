import { createStore, combineReducers } from 'redux';
import { hogeReducer, HogeState } from './states/states';

export type AppState = {
  hoge: HogeState
};

const store = createStore(
  combineReducers<AppState>({
    hoge: hogeReducer
  })
);

export default store;