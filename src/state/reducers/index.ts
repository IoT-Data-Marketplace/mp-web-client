import { combineReducers } from 'redux';
import accountReducer from './account';
import uiReducer from './ui';
import dataMarketplaceReducer from './dataMarketplace';
import { StoreState } from '../../interfaces';
import defaultValuesReducer from './defaultValues';

const reducers = combineReducers<StoreState>({
  defaultValues: defaultValuesReducer,
  account: accountReducer,
  ui: uiReducer,
  dataMarketplace: dataMarketplaceReducer,
});

export { reducers as default };
