import { Action, ActionTypes } from '../actions';

import { DataStream } from '../interfaces/dataStream';
import { SensorStatus, SensorType } from '../interfaces';

const initialState = {
  sensor: {
    sensorContractAddress: '',
    dataStreamEntityContractAddress: '',
    sensorType: SensorType.TEMPERATURE,
    geolocation: {
      latitude: '',
      longitude: '',
    },
    sensorStatus: SensorStatus.INACTIVE,
    streamSize: 0,
  },
  records: [],
};

const dataStreamReducer = (state: DataStream = initialState, action: Action): DataStream => {
  switch (action.type) {
    case ActionTypes.toggleDrawer:
      return {
        ...state,
      };
    case ActionTypes.toggleIsLoggedIn:
      return initialState;
    default:
      return state;
  }
};

export default dataStreamReducer;
