import { Dispatch } from 'redux';
import DataStreamEntity from '../../../blockchain/dataStreamEntity';
import IoTDataMarketplace from '../../../blockchain/ioTDataMarketplace';
import SensorContract from '../../../blockchain/sensor';
import { ActionTypes } from '../types';
import { asyncForEach } from '../../helpers/asyncForEach';
import { Sensor } from '../../interfaces';
import { fetchSensorSummary } from './fn';
import { store } from '../../../index';
import { DEFAULT_ETH_ADDRESS } from '../../../constants';

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

        const subscriptionResult = await SensorContract(sensorContractAddress)
          .methods.getDataStreamSubscriptionContractAddressForDSE(dataStreamEntityContractAddress)
          .call();

        console.log('subscriptionResult: ', subscriptionResult);

        const sensorSummary = await fetchSensorSummary(sensorContractAddress);
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
            pricePerDataUnit: sensorResult[5],
            streamSize: sensorSummary.streamSize,
            subscribed: subscriptionResult !== DEFAULT_ETH_ADDRESS,
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

// //////////////////////////////
export interface GetAllDataMarketplaceSensorsAction {
  type: ActionTypes.getAllDataMarketplaceSensors;
}

export const getAllDataMarketplaceSensors = () => {
  return async (dispatch: Dispatch) => {
    try {
      const dataStreamEntityContractAddresses = await IoTDataMarketplace().methods.getDataStreamEntities().call();
      console.log('dataStreamEntityContractAddresses ', dataStreamEntityContractAddresses);
      await asyncForEach(dataStreamEntityContractAddresses, async (dataStreamEntityContractAddress) => {
        const sensors = await DataStreamEntity(dataStreamEntityContractAddress).methods.getSensors().call();

        console.log('sensors ', sensors);
        await asyncForEach(sensors, async (sensorContractAddress) => {
          const sensorResult = await SensorContract(sensorContractAddress).methods.describeSensor().call();

          console.log('sensorResult ', sensorResult);
          const subscriptionResult = await SensorContract(sensorContractAddress)
            .methods.getDataStreamSubscriptionContractAddressForDSE(dataStreamEntityContractAddress)
            .call();

          const sensorSummary = await fetchSensorSummary(sensorContractAddress);
          if (sensorResult[4] === '1') {
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
                pricePerDataUnit: sensorResult[5],
                streamSize: sensorSummary.streamSize,
                subscribed: subscriptionResult !== DEFAULT_ETH_ADDRESS,
              })
            );
          }
        });
      });
    } catch (e) {
      console.error('Error while the sensor for dataStreamEntityContractAddress: \nError: ', e);
    }
  };
};
