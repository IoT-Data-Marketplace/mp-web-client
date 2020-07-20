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
        sensors: state.sensors.map((sen) => {
          if (sen.sensorContractAddress === action.sensor.sensorContractAddress) return action.sensor;
          return sen;
        }),
      };
    case ActionTypes.toggleIsLoggedIn:
      return initialState;
    default:
      return state;
  }
};

export default sensorReducer;
