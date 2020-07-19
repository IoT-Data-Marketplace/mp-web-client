import { Dispatch } from 'redux';
import { graphQLClient } from '../../graphQLClient';
import { ActionTypes } from '../types';
import { toggleIsLoading, ToggleIsLoadingAction } from '../ui';
import { getRegisterSensorGQLQuery } from '../graphQlQueris/gqlQueries';

export interface SetSensorStatusAction {
  type: ActionTypes.setSensorStatus;
  sensorContractAddress: string;
}

export const activateSensor = (sensorContractAddress: string) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch<ToggleIsLoadingAction>(toggleIsLoading(true));
      const res = await graphQLClient.rawRequest(getRegisterSensorGQLQuery(sensorContractAddress));
      if (res.data.registerSensor.statusCode === 200) {
        console.log(res.data.responseBody);
      } else {
        throw new Error(
          `Error while activating the sensor with name: ${sensorContractAddress} \nResponse code: ${res.data.registerSensor.statusCode}\nResponse Body: ${res.data.registerSensor.responseBody}`
        );
      }
    } catch (e) {
      console.error('Error while activating the sensor, Error: ', e);
    } finally {
      dispatch<ToggleIsLoadingAction>(toggleIsLoading(false));
    }
  };
};
