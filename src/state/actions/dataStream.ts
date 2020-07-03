import { Dispatch } from 'redux';
import { ActionTypes } from './types';
import { decrypt, fetchSensorSummary } from './sensor/fn';
import { graphQLClient } from '../graphQLClient';
import { getGetMessagesForSensorGQLQuery } from './graphQlQueris/gqlQueries';
import { DataStreamRecord } from '../interfaces';
import { store } from '../../index';
import { toggleIsLoading, ToggleIsLoadingAction } from './ui';
import web3 from '../../blockchain/web3';
import SensorContract from '../../blockchain/sensor';

const last = (array: DataStreamRecord[]): DataStreamRecord => {
  return array[array.length - 1];
};

export interface SetDataStreamRecordsAction {
  type: ActionTypes.setDataStreamRecords;
  records: DataStreamRecord[];
  shiftSize: number;
}

export const setDataStreamRecords = (records: DataStreamRecord[], shiftSize: number): SetDataStreamRecordsAction => {
  return {
    type: ActionTypes.setDataStreamRecords,
    records,
    shiftSize,
  };
};

/**/
export interface SetDataStreamSizeAction {
  type: ActionTypes.setDataStreamSize;
  streamSize: number;
}

export const setDataStreamSize = (streamSize: number): SetDataStreamSizeAction => {
  return {
    type: ActionTypes.setDataStreamSize,
    streamSize,
  };
};

/**/
export interface BuyDataStreamAction {
  type: ActionTypes.buyDataStream;
  sensorContractAddress: string;
  dataStreamEntityBuyerAddress: string;
  value: number;
}

export const buyDataStream = (sensorContractAddress: string, dataStreamEntityBuyerAddress: string, value: number) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch<ToggleIsLoadingAction>(toggleIsLoading(true));
      const accounts = await web3.eth.getAccounts();
      await SensorContract(sensorContractAddress)
        .methods.buyDataStream(dataStreamEntityBuyerAddress, '2020-05-10T13:10:00Z', 1000000)
        .send({
          from: accounts[0],
          gas: '3000000',
          value,
        });
    } catch (e) {
      console.error('Error while buying the data stream. \n', e);
    } finally {
      dispatch<ToggleIsLoadingAction>(toggleIsLoading(false));
    }
  };
};
/**/

/**/
export interface GetMessagesForSensorAction {
  type: ActionTypes.getMessagesForSensor;
  sensorContractAddress: string;
  count: string;
}

export const getMessagesForSensor = (sensorContractAddress: string, desiredRecordSize: number) => {
  return async (dispatch: Dispatch) => {
    const sensorSummary = await fetchSensorSummary(sensorContractAddress);

    const currentRecordSize = store.getState().dataStream.records.length;
    // console.log('currentRecord Size: ', currentRecordSize);
    // console.log('desiredRecord Size: ', desiredRecordSize);

    let shiftSize = currentRecordSize <= desiredRecordSize ? 0 : currentRecordSize - desiredRecordSize;

    const currentMaxOffsetOnBackend = sensorSummary.streamSize;
    dispatch<SetDataStreamSizeAction>(setDataStreamSize(currentMaxOffsetOnBackend));
    // console.log('currentMaxOffsetOnBackend: ', currentMaxOffsetOnBackend);

    // it is ok since we check the size
    // @ts-ignore
    const currentMaxOffsetOnClient = currentRecordSize === 0 ? 0 : last(store.getState().dataStream.records).offset;
    // console.log('currentMaxOffsetOnClient: ', currentMaxOffsetOnClient);

    const offsetDifference = currentMaxOffsetOnBackend - currentMaxOffsetOnClient;
    // console.log('offsetDifference: ', offsetDifference);

    let desiredOffset = 0;

    if (offsetDifference > desiredRecordSize) {
      desiredOffset = currentMaxOffsetOnBackend - desiredRecordSize;
    } else {
      desiredOffset = currentMaxOffsetOnClient;
    }

    if (offsetDifference > 0) {
      // console.log(
      //   'executing the query: ',
      //   getGetMessagesForSensorGQLQuery(sensorContractAddress, desiredOffset, desiredRecordSize)
      // );

      const messagesResult = await graphQLClient.rawRequest(
        getGetMessagesForSensorGQLQuery(sensorContractAddress, desiredOffset, desiredRecordSize)
      );
      console.log('getGetMessagesForSensorGQLQuery Result: ', messagesResult);

      const records: DataStreamRecord[] = messagesResult.data.getMessagesForSensor.records.map((record) => {
        return {
          key: record.key,
          value: decrypt(record.value),
          offset: record.offset,
        };
      });
      shiftSize += records.length;
      // console.log('shift size: ', shiftSize);
      // console.log('records from action: ', records);
      dispatch<SetDataStreamRecordsAction>(setDataStreamRecords(records, shiftSize));
    }
    // console.log('------------------------------------------');
  };
};

export interface CleanUpDataStreamStateAction {
  type: ActionTypes.cleanUpDataStreamState;
}

export const cleanUpDataStreamState = (): CleanUpDataStreamStateAction => {
  return {
    type: ActionTypes.cleanUpDataStreamState,
  };
};
