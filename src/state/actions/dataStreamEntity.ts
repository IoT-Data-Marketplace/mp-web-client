import { ActionTypes } from './types';
import { DataStreamEntity } from '../interfaces/dataStreamEntity';

export interface SetDataStreamEntityAction {
  type: ActionTypes.setDataStreamEntity;
  dataStreamEntity: DataStreamEntity;
}

export const setDataStreamEntity = (
  dataStreamEntity: DataStreamEntity
): SetDataStreamEntityAction => {
  return {
    type: ActionTypes.setDataStreamEntity,
    dataStreamEntity,
  };
};
