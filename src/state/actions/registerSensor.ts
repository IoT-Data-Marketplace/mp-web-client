import { Dispatch } from 'redux';
import { ActionTypes } from './types';
import { SensorType, Geolocation, RegisterSensor } from '../interfaces';
import IoTDataMarketplace from '../../blockchain/ioTDataMarketplace';
import { toggleIsLoading, ToggleIsLoadingAction } from './ui';
import web3 from '../../blockchain/web3';
import DataStreamEntity from '../../blockchain/dataStreamEntity';

export interface SetSensorTypeAction {
  type: ActionTypes.setSensorType;
  sensorType: number;
}

export const setSensorType = (sensorType: SensorType): SetSensorTypeAction => {
  return {
    type: ActionTypes.setSensorType,
    sensorType,
  };
};

export interface SetSensorGeolocationAction {
  type: ActionTypes.setSensorGeolocation;
  geolocation: Geolocation;
}

export const setSensorGeolocation = (geolocation: Geolocation): SetSensorGeolocationAction => {
  return {
    type: ActionTypes.setSensorGeolocation,
    geolocation,
  };
};

export interface ResetRegisterSensorStateAction {
  type: ActionTypes.resetRegisterSensorState;
}

export const resetRegisterSensorState = (): ResetRegisterSensorStateAction => {
  return {
    type: ActionTypes.resetRegisterSensorState,
  };
};

export interface RegisterSensorAction {
  type: ActionTypes.registerSensor;
  sensor: RegisterSensor;
}

export const registerSensor = (sensor: RegisterSensor, dataStreamEntityContractAddress: string) => {
  return async (dispatch: Dispatch) => {
    console.log('registering: ', sensor, '\ncontract: ', dataStreamEntityContractAddress);
    try {
      dispatch<ToggleIsLoadingAction>(toggleIsLoading(true));
      const accounts = await web3.eth.getAccounts();

      const registerSensorResult = await DataStreamEntity(dataStreamEntityContractAddress)
        .methods.registerNewSensor(sensor.sensorType, sensor.geolocation.latitude, sensor.geolocation.longitude)
        .send({ from: accounts[0] });

      dispatch<ResetRegisterSensorStateAction>(resetRegisterSensorState());

      console.log('registerSensorResult: ', registerSensorResult);
    } catch (e) {
      console.error('Error while registering the sensor, Error: ', e);
    } finally {
      dispatch<ToggleIsLoadingAction>(toggleIsLoading(false));
    }
  };
};
