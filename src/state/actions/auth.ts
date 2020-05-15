import { Dispatch } from 'redux';
import IoTDataMarketplace from '../../blockchain/ioTDataMarketplace';
import DataStreamEntity from '../../blockchain/dataStreamEntity';
import { ActionTypes } from './types';
import { SignInFormData, SignUpFormData } from '../interfaces/formData';
import web3 from '../../blockchain/web3';
import { toggleIsLoading, ToggleIsLoadingAction } from './ui';
import { populateDataStreamEntity } from '../helpers/populateDataStreamEntity';
import { setDataStreamEntity, SetDataStreamEntityAction } from './dataStreamEntity';

export interface ToggleIsLoggedInAction {
  type: ActionTypes.toggleIsLoggedIn;
  isLoggedIn: boolean;
}

export const toggleIsLoggedIn = (isLoggedIn: boolean): ToggleIsLoggedInAction => {
  return {
    type: ActionTypes.toggleIsLoggedIn,
    isLoggedIn,
  };
};

export interface SignInAction {
  type: ActionTypes.signIn;
}

export const signIn = (signInFormData: SignInFormData) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch<ToggleIsLoadingAction>(toggleIsLoading(true));
      const accounts = await web3.eth.getAccounts();
      const { dataStreamEntityContractAddress } = signInFormData;

      const authenticated = await DataStreamEntity(dataStreamEntityContractAddress)
        .methods.isAuthenticated()
        .call({ from: accounts[0] });
      dispatch<ToggleIsLoggedInAction>(toggleIsLoggedIn(authenticated));

      if (authenticated) {
        const dataStreamEntityResult = await DataStreamEntity(dataStreamEntityContractAddress)
          .methods.describeDataStreamEntity()
          .call();

        const populatedDataStreamEntity = populateDataStreamEntity(dataStreamEntityResult, dataStreamEntityContractAddress);

        dispatch<SetDataStreamEntityAction>(setDataStreamEntity(populatedDataStreamEntity));
      }
    } catch (e) {
      dispatch<ToggleIsLoggedInAction>(toggleIsLoggedIn(false));
      throw e;
    } finally {
      dispatch<ToggleIsLoadingAction>(toggleIsLoading(false));
    }
  };
};

export interface SignUpAction {
  type: ActionTypes.signUp;
  signUpFormData: SignUpFormData;
}

export const signUp = (signUpFormData: SignUpFormData) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch<ToggleIsLoadingAction>(toggleIsLoading(true));
      const accounts = await web3.eth.getAccounts();

      await IoTDataMarketplace()
        .methods.registerDataStreamEntity(signUpFormData.accountName, signUpFormData.accountURL, signUpFormData.accountEmail)
        .send({
          from: accounts[0],
          gas: '3000000',
          value: await IoTDataMarketplace().methods.getDataStreamEntityRegistrationPrice().call(),
        });

      const dataStreamEntityContractAddress = await IoTDataMarketplace()
        .methods.getDataStreamEntityContractAddressForOwnerAddress(accounts[0])
        .call();

      console.log('dataStreamEntityContractAddress', dataStreamEntityContractAddress);
      dispatch<ToggleIsLoggedInAction>(toggleIsLoggedIn(true));

      const dataStreamEntityResult = await DataStreamEntity(dataStreamEntityContractAddress)
        .methods.describeDataStreamEntity()
        .call();

      console.log('dataStreamEntityResult', dataStreamEntityResult);
      const populatedDataStreamEntity = populateDataStreamEntity(dataStreamEntityResult, dataStreamEntityContractAddress);

      console.log('populatedDataStreamEntity', populatedDataStreamEntity);
      dispatch<SetDataStreamEntityAction>(setDataStreamEntity(populatedDataStreamEntity));
    } catch (e) {
      dispatch<ToggleIsLoggedInAction>(toggleIsLoggedIn(false));
      throw e;
    } finally {
      dispatch<ToggleIsLoadingAction>(toggleIsLoading(false));
    }
  };
};
