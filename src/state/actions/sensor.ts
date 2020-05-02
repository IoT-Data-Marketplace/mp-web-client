import { Dispatch } from 'redux';
import DataStreamEntity from '../../blockchain/dataStreamEntity';
import Sensor from '../../blockchain/sensor';
import { ActionTypes } from './types';
import { asyncForEach } from '../helpers/asyncForEach';
import { IoTSensor } from '../interfaces';

export interface AddFetchedSensorAction {
  type: ActionTypes.addFetchedSensor;
  sensor: IoTSensor;
}

export const addFetchedSensor = (sensor: IoTSensor): AddFetchedSensorAction => {
  return {
    type: ActionTypes.addFetchedSensor,
    sensor,
  };
};

export interface GetSensorForDataStreamEntityContractAddressAction {
  type: ActionTypes.getSensorsForDataStreamContractAddress;
  dataStreamContractAddress: string;
}

export const getSensorsForDataStreamEntityContractAddress = (dataStreamEntityContractAddress: string) => {
  return async (dispatch: Dispatch) => {
    try {
      const dataStreamEntitySensors = await DataStreamEntity(dataStreamEntityContractAddress).methods.getSensors().call();
      await asyncForEach(dataStreamEntitySensors, async (sensorContractAddress) => {
        const sensorResult = await Sensor(sensorContractAddress).methods.describeSensor().call();
        dispatch<AddFetchedSensorAction>(
          addFetchedSensor({
            sensorContractAddress,
            dataStreamEntityContractAddress: sensorResult[0],
            sensorType: sensorResult[1],
            geolocation: {
              latitude: sensorResult[2],
              longitude: sensorResult[3],
            },
          })
        );
      });
    } catch (e) {
      console.error(
        'Error while the sensor for dataStreamEntityContractAddress: ',
        dataStreamEntityContractAddress,
        '\nError: ',
        e
      );
    }
  };
};
