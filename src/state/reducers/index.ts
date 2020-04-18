import { combineReducers } from 'redux';
import { Ui } from '../actions';
import uiReducer from './ui';

export interface StoreState {
  ui: Ui;
}

export const reducers = combineReducers<StoreState>({
  ui: uiReducer,
});
