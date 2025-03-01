import { Dispatch } from 'redux';
import { ActionTypes } from '../types';
import { Geolocation, RegisterSensor, SensorType } from '../../interfaces';
import { toggleIsLoading, ToggleIsLoadingAction } from '../ui';
import web3 from '../../../blockchain/web3';
import DataStreamEntity from '../../../blockchain/dataStreamEntity';
import { store } from '../../../index';

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

export interface SetPricePerDataUnitAction {
  type: ActionTypes.setPricePerDataUnit;
  pricePerDataUnit: number;
}

export const setPricePerDataUnit = (pricePerDataUnit: number): SetPricePerDataUnitAction => {
  return {
    type: ActionTypes.setPricePerDataUnit,
    pricePerDataUnit,
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

export interface SetGeneratedSensorContractAddressAction {
  type: ActionTypes.setGeneratedSensorContractAddress;
  generatedContractAddress: string;
}

export const setGeneratedSensorContractAddress = (generatedContractAddress: string): SetGeneratedSensorContractAddressAction => {
  return {
    type: ActionTypes.setGeneratedSensorContractAddress,
    generatedContractAddress,
  };
};

export interface RegisterSensorAction {
  type: ActionTypes.registerSensor;
  sensor: RegisterSensor;
}

export const registerSensor = (sensor: RegisterSensor, dataStreamEntityContractAddress: string) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch<ToggleIsLoadingAction>(toggleIsLoading(true));
      const accounts = await web3.eth.getAccounts();

      console.log('registering: ', sensor);

      const methodToCall = DataStreamEntity(dataStreamEntityContractAddress).methods.registerNewSensor(
        sensor.sensorType,
        sensor.geolocation.latitude,
        sensor.geolocation.longitude,
        sensor.pricePerDataUnit
      );

      const newSensorContractAddress = await methodToCall.call({
        from: accounts[0],
        gas: '3000000',
        value: store.getState().dataMarketplace.sensorRegistrationPrice,
      });
      await methodToCall.send({
        from: accounts[0],
        gas: '3000000',
        value: store.getState().dataMarketplace.sensorRegistrationPrice,
      });
      dispatch<SetGeneratedSensorContractAddressAction>(setGeneratedSensorContractAddress(newSensorContractAddress));

      // const res = await graphQLClient.rawRequest(getRegisterSensorGQLQuery(newSensorContractAddress));
      // if (res.data.registerSensor.statusCode !== 201)
      //   throw new Error(
      //     `Error while registering the topic with name: ${newSensorContractAddress} \nResponse code: ${res.data.registerSensor.statusCode}\nResponse Body: ${res.data.registerSensor.responseBody}`
      //   );
      // console.log('topic result: ', res);
    } catch (e) {
      console.error('Error while registering the sensor, Error: ', e);
    } finally {
      dispatch<ToggleIsLoadingAction>(toggleIsLoading(false));
    }
  };
};
