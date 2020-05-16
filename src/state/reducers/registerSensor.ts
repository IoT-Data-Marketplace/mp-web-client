import { Action, ActionTypes } from '../actions';

import { RegisterSensor, SensorType } from '../interfaces';

const initialState = {
  generatedContractAddress: '',
  sensorType: SensorType.TEMPERATURE,
  geolocation: {
    latitude: '47.36667',
    longitude: '8.55',
  },
  pricePerDataUnit: 0,
};

const registerSensorReducer = (state: RegisterSensor = initialState, action: Action): RegisterSensor => {
  switch (action.type) {
    case ActionTypes.setSensorType:
      return {
        ...state,
        sensorType: action.sensorType,
      };
    case ActionTypes.setSensorGeolocation:
      return {
        ...state,
        geolocation: action.geolocation,
      };
    case ActionTypes.setPricePerDataUnit:
      return {
        ...state,
        pricePerDataUnit: action.pricePerDataUnit,
      };
    case ActionTypes.setGeneratedSensorContractAddress:
      return {
        ...state,
        generatedContractAddress: action.generatedContractAddress,
      };
    case ActionTypes.resetRegisterSensorState:
      return {
        ...initialState,
      };
    case ActionTypes.toggleIsLoggedIn:
      return initialState;
    default:
      return state;
  }
};

export default registerSensorReducer;
