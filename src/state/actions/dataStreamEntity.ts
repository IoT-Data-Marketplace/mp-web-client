import { Dispatch } from 'redux';
import { useSelector } from 'react-redux';
import { ActionTypes } from './types';
import { DataStreamEntity } from '../interfaces';
import web3 from '../../blockchain/web3';
import { StoreState } from '../interfaces/storeState';
import {toggleIsLoading, ToggleIsLoadingAction} from "./ui";

export interface SetDataStreamEntityAction {
  type: ActionTypes.setDataStreamEntity;
  dataStreamEntity: DataStreamEntity;
}

export const setDataStreamEntity = (dataStreamEntity: DataStreamEntity): SetDataStreamEntityAction => {
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
      const { dataStreamEntityContractAddress } = useSelector((state: StoreState) => state.dataStreamEntity);
      const balance = await web3.eth.getBalance(dataStreamEntityContractAddress);
      const balanceInEther = web3.utils.fromWei(String(balance), 'ether');
      dispatch<SetDataStreamEntityContractBalanceAction>(setDataStreamEntityContractBalance(balanceInEther));
    } catch (e) {
      console.log('Error while cheching the balance. \n', e);
    } finally {
      dispatch<ToggleIsLoadingAction>(toggleIsLoading(false));
    }
  };
};
