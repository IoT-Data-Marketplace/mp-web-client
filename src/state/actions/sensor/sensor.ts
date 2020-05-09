import { Dispatch } from 'redux';
import DataStreamEntity from '../../../blockchain/dataStreamEntity';
import SensorContract from '../../../blockchain/sensor';
import { ActionTypes } from '../types';
import { asyncForEach } from '../../helpers/asyncForEach';
import { Sensor } from '../../interfaces';
import {fetchSensorSummary} from "./fn";

export interface AddFetchedSensorAction {
  type: ActionTypes.addFetchedSensor;
  sensor: Sensor;
}

export const addFetchedSensor = (sensor: Sensor): AddFetchedSensorAction => {
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
        const sensorResult = await SensorContract(sensorContractAddress).methods.describeSensor().call();
        const sensorSummary = await fetchSensorSummary(sensorContractAddress);
        console.log('size: ', sensorSummary.streamSize);
        dispatch<AddFetchedSensorAction>(
          addFetchedSensor({
            sensorContractAddress,
            dataStreamEntityContractAddress: sensorResult[0],
            sensorType: sensorResult[1],
            geolocation: {
              latitude: sensorResult[2],
              longitude: sensorResult[3],
            },
            sensorStatus: sensorResult[4],
            streamSize: sensorSummary.streamSize,
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

