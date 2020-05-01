import { Dispatch } from 'redux';
import { ActionTypes } from './types';
import { IDataStreamEntity } from '../interfaces';
import web3 from '../../blockchain/web3';
import { toggleIsLoading, ToggleIsLoadingAction } from './ui';
import { store } from '../../index';
import { populateDataStreamEntity } from '../helpers/populateDataStreamEntity';
import DataStreamEntity from '../../blockchain/dataStreamEntity';

export interface SetDataStreamEntityAction {
  type: ActionTypes.setDataStreamEntity;
  dataStreamEntity: IDataStreamEntity;
}

export const setDataStreamEntity = (dataStreamEntity: IDataStreamEntity): SetDataStreamEntityAction => {
  return {
    type: ActionTypes.setDataStreamEntity,
    dataStreamEntity,
  };
};

export interface SetDataStreamEntityContractBalanceAction {
  type: ActionTypes.setDataStreamEntityContractBalance;
  dataStreamEntityContractBalance: string;
}

export const setDataStreamEntityContractBalance = (
  dataStreamEntityContractBalance: string
): SetDataStreamEntityContractBalanceAction => {
  return {
    type: ActionTypes.setDataStreamEntityContractBalance,
    dataStreamEntityContractBalance,
  };
};

export interface FetchDataStreamEntityContractBalanceAction {
  type: ActionTypes.fetchDataStreamEntityContractBalance;
}

export const fetchDataStreamEntityContractBalance = () => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch<ToggleIsLoadingAction>(toggleIsLoading(true));
      const { dataStreamEntityContractAddress } = store.getState().dataStreamEntity;
      const balance = await web3.eth.getBalance(dataStreamEntityContractAddress);
      const balanceInEther = web3.utils.fromWei(String(balance), 'ether');
      dispatch<SetDataStreamEntityContractBalanceAction>(setDataStreamEntityContractBalance(balanceInEther));
    } catch (e) {
      console.error('Error while cheching the balance. \n', e);
    } finally {
      dispatch<ToggleIsLoadingAction>(toggleIsLoading(false));
    }
  };
};

export interface FetchDataStreamEntityAction {
  type: ActionTypes.fetchDataStreamEntity;
  dataStreamEntityContractAddress: string;
}

export const fetchDataStreamEntity = (dataStreamEntityContractAddress: string) => {
  return async (dispatch: Dispatch) => {
    try {
      const dataStreamEntityResult = await DataStreamEntity(dataStreamEntityContractAddress)
        .methods.describeDataStreamEntity()
        .call();

      const populatedDataStreamEntity = populateDataStreamEntity(dataStreamEntityResult, dataStreamEntityContractAddress);

      dispatch<SetDataStreamEntityAction>(setDataStreamEntity(populatedDataStreamEntity));
    } catch (e) {
      console.error('Error while cheching the balance. \n', e);
    } finally {
      dispatch<ToggleIsLoadingAction>(toggleIsLoading(false));
    }
  };
};
