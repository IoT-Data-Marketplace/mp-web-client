import { Action, ActionTypes } from '../actions';

import { SensorState } from '../interfaces';

const initialState = {
  sensors: [],
};

const sensorReducer = (state: SensorState = initialState, action: Action): SensorState => {
  switch (action.type) {
    case ActionTypes.addFetchedSensor:
      return {
        ...state,
        sensors: state.sensors.some((value) => value.sensorContractAddress === action.sensor.sensorContractAddress)
          ? state.sensors
          : [...state.sensors, action.sensor],
      };
    default:
      return state;
  }
};

export default sensorReducer;
