import { Dispatch } from 'redux';
import IoTDataMarketplace from '../../blockchain/ioTDataMarketplace';
import { ActionTypes } from './types';

export interface DescribeDataMarketplaceAction {
  type: ActionTypes.getDataMarketplaceByContractAddress;
  producerContractAddress: string;
}

export const getDataMarketplaceByContractAddress = () => {
  return async (dispatch: Dispatch) => {
    try {
      const dataMarketplaceResult = await IoTDataMarketplace().methods.describeIoTDataMarketplace().call();
    } catch (e) {
      console.error('Error while describing the Data Marketplace, Error: ', e);
    }
  };
};
