import { Dispatch } from 'redux';
import { constants } from 'http2';
import IoTDataMarketplace from '../../blockchain/ioTDataMarketplace';
import DataStreamEntity from '../../blockchain/dataStreamEntity';
import { ActionTypes } from './types';
import { SignInFormData, SignUpFormData } from '../interfaces/formData';
import web3 from '../../blockchain/web3';
import { toggleIsLoading, ToggleIsLoadingAction } from './ui';
import { populateDataStreamEntity } from '../helpers/populateDataStreamEntity';
import { setDataStreamEntity, SetDataStreamEntityAction } from './dataStreamEntity';
import { baseEndpoint } from '../../constants';
import API from '../../apiAxios';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const ethUtil = require('ethereumjs-util');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const sigUtil = require('eth-sig-util');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Eth = require('ethjs');

// @ts-ignore
const ETH = window.Eth;

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

export interface SetJWTTokenAction {
  type: ActionTypes.setJWTToken;
  jwt: string;
}

export const setJWTToken = (jwt: string): SetJWTTokenAction => {
  return {
    type: ActionTypes.setJWTToken,
    jwt,
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

      // const result = await fetch(
      //   `${baseEndpoint}/auth/challenge?dspAccountAddress=${accounts[0]}&dspContractAddress=${dataStreamEntityContractAddress}`,
      //   {
      //     method: 'GET', // *GET, POST, PUT, DELETE, etc.
      //     mode: 'no-cors', // no-cors, *cors, same-origin
      //   }
      // ).then((data) => data.json());
      //
      // console.error('Res: ', result);

      const result = await API.get(
        `/auth/challenge?dspAccountAddress=${accounts[0]}&dspContractAddress=${dataStreamEntityContractAddress}`
      );

      const eth = new Eth(web3.currentProvider);

      const msg = ethUtil.bufferToHex(Buffer.from(result.data, 'utf8'));

      const signed = await eth.personal_sign(msg, accounts[0]);

      console.log('res: ', signed);

      const jwtResult = await API.post(`/auth/challenge`, {
        signature: signed,
        nonce: result.data,
        dspAccountAddress: accounts[0],
        dspContractAddress: dataStreamEntityContractAddress,
      });

      // if (jwtResult.status === 200) {
      //   const dataStreamEntityResult = await DataStreamEntity(dataStreamEntityContractAddress)
      //     .methods.describeDataStreamEntity()
      //     .call();
      //
      //   dispatch<ToggleIsLoggedInAction>(toggleIsLoggedIn(true));
      //   dispatch<SetJWTTokenAction>(setJWTToken(jwtResult.data));
      //
      //   const populatedDataStreamEntity = populateDataStreamEntity(dataStreamEntityResult, dataStreamEntityContractAddress);
      //
      //   dispatch<SetDataStreamEntityAction>(setDataStreamEntity(populatedDataStreamEntity));
      // }
      // handleSignMessage({
      //   nonce: result.data,
      //   publicAddress: accounts[0],
      // })
      //   .then((r) => console.log('rr: ', r))
      //   .catch((error) => console.error('er: ', error));

      // await web3.personal.sign(result.data, accounts[0], function (error, signature) {
      //   console.log(signature, error);
      // });

      // const authenticated = await DataStreamEntity(dataStreamEntityContractAddress)
      //   .methods.isAuthenticated()
      //   .call({ from: accounts[0] });
      // dispatch<ToggleIsLoggedInAction>(toggleIsLoggedIn(authenticated));
      //
      // if (authenticated) {
      //   const dataStreamEntityResult = await DataStreamEntity(dataStreamEntityContractAddress)
      //     .methods.describeDataStreamEntity()
      //     .call();
      //
      //   const populatedDataStreamEntity = populateDataStreamEntity(dataStreamEntityResult, dataStreamEntityContractAddress);
      //
      //   dispatch<SetDataStreamEntityAction>(setDataStreamEntity(populatedDataStreamEntity));
      // }
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
        .methods.registerDataStreamEntity(
          signUpFormData.accountName,
          signUpFormData.accountURL,
          signUpFormData.accountEmail,
          signUpFormData.rsaPublicKey
        )
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
