import { combineReducers } from 'redux';
import authReducer from './auth';
import uiReducer from './ui';
import dataMarketplaceReducer from './dataMarketplace';
import { StoreState } from '../interfaces/storeState';
import defaultValuesReducer from './defaultValues';
import dataStreamEntityReducer from './dataStreamEntity';
import registerSensorReducer from './registerSensor';
import sensorReducer from './sensor';
import dataStreamReducer from './dataStream';

const reducers = combineReducers<StoreState>({
  defaultValues: defaultValuesReducer,
  auth: authReducer,
  ui: uiReducer,
  dataMarketplace: dataMarketplaceReducer,
  dataStreamEntity: dataStreamEntityReducer,
  registerSensor: registerSensorReducer,
  sensor: sensorReducer,
  dataStream: dataStreamReducer,
});

export { reducers as default };
