import { Dispatch } from 'redux';
import { ActionTypes } from './types';
import { fetchSensorSummary } from './sensor/fn';
import { graphQLClient } from '../graphQLClient';
import { getGetMessagesForSensorGQLQuery } from './graphQlQueris/gqlQueries';
import { DataStreamRecord } from '../interfaces';
import { store } from '../../index';

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
      // console.log('getGetMessagesForSensorGQLQuery Result: ', messagesResult);

      const records: DataStreamRecord[] = messagesResult.data.getMessagesForSensor.records.map((record) => ({
        key: record.key,
        value: record.value,
        offset: record.offset,
      }));
      shiftSize += records.length;
      // console.log('shift size: ', shiftSize);
      // console.log('records from action: ', records);
      dispatch<SetDataStreamRecordsAction>(setDataStreamRecords(records, shiftSize));
    }
    // console.log('------------------------------------------');
  };
};
