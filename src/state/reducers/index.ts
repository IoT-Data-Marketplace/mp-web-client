import { combineReducers } from 'redux';
import uiReducer from './ui';
import accountReducer from './account';
import { StoreState } from '../../interfaces';

const reducers = combineReducers<StoreState>({
  ui: uiReducer,
  account: accountReducer,
});

export { reducers as default };
