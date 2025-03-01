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
    pricePerDataUnit: 0,
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
    case ActionTypes.cleanUpDataStreamState:
      return {
        ...state,
        records: [],
      };
    default:
      return state;
  }
};

export default dataStreamReducer;
