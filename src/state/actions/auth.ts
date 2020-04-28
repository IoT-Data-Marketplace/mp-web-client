import { Dispatch } from 'redux';
import IoTDataMarketplace from '../../blockchain/ioTDataMarketplace';
import DataStreamEntity from '../../blockchain/dataStreamEntity';
import { ActionTypes } from './types';
import { SignInFormData, SignUpFormData } from '../interfaces/formData';
import web3 from '../../blockchain/web3';
import { toggleIsLoading, ToggleIsLoadingAction } from './ui';

export interface SignInAction {
  type: ActionTypes.signIn;
  signInFormData: SignInFormData;
}

export const signIn = (signInFormData: SignInFormData) => {
  return async (dispatch: Dispatch) => {
    try {
      const dataMarketplaceResult = await IoTDataMarketplace()
        .methods.describeIoTDataMarketplace()
        .call();

      console.log('marketplace result: ', dataMarketplaceResult);
    } catch (e) {
      console.error('Error while describing the Data Marketplace, Error: ', e);
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
        .methods.registerDataStreamEntity(
          signUpFormData.accountName,
          signUpFormData.accountURL,
          signUpFormData.accountEmail
        )
        .send({ from: accounts[0] });

      const dataStreamEntityContractAddress = await IoTDataMarketplace()
        .methods.getDataStreamEntityContractAddressForOwnerAddress(accounts[0])
        .call();

      console.log(
        'dataStreamEntityContractAddress: ',
        dataStreamEntityContractAddress
      );
    } catch (e) {
      dispatch<ToggleIsLoadingAction>(toggleIsLoading(false));
      throw e;
    }
  };
};
