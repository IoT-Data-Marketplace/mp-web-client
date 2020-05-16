import { Action, ActionTypes } from '../actions';
import { DataStream, SensorStatus, SensorType } from '../interfaces';

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
    subscribed: false,
  },
  records: [],
};

const dataStreamReducer = (state: DataStream = initialState, action: Action): DataStream => {
  switch (action.type) {
    case ActionTypes.setDataStreamRecords: {
      for (let i = 0; i < action.shiftSize; i++) {
        state.records.shift();
      }
      action.records.forEach((record) => {
        state.records.push(record);
      });
      return {
        ...state,
      };
    }
    case ActionTypes.setDataStreamSize:
      return {
        ...state,
        sensor: {
          ...state.sensor,
          streamSize: action.streamSize,
        },
      };
    default:
      return state;
  }
};

export default dataStreamReducer;
