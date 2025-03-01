import { Action, ActionTypes } from '../actions';
import { IDataStreamEntity } from '../interfaces';

const initialState = {
  iotDataMarketplaceContractAddress: '',
  dataStreamEntityContractAddress: '',
  dataStreamEntityContractBalance: '0',
  dataStreamEntityOwnerAddress: '',
  name: '',
  url: '',
  email: '',
  rsaPublicKey: '',
  sensorContractAddresses: [],
};

const dataStreamEntityReducer = (state: IDataStreamEntity = initialState, action: Action): IDataStreamEntity => {
  switch (action.type) {
    case ActionTypes.setDataStreamEntity:
      return {
        ...state,
        iotDataMarketplaceContractAddress: action.dataStreamEntity.iotDataMarketplaceContractAddress,
        dataStreamEntityContractAddress: action.dataStreamEntity.dataStreamEntityContractAddress,
        dataStreamEntityOwnerAddress: action.dataStreamEntity.dataStreamEntityOwnerAddress,
        name: action.dataStreamEntity.name,
        url: action.dataStreamEntity.url,
        email: action.dataStreamEntity.email,
        rsaPublicKey: action.dataStreamEntity.rsaPublicKey,
        sensorContractAddresses: action.dataStreamEntity.sensorContractAddresses,
      };
    case ActionTypes.setDataStreamEntityContractBalance:
      return {
        ...state,
        dataStreamEntityContractBalance: action.dataStreamEntityContractBalance,
      };
    case ActionTypes.toggleIsLoggedIn:
      return initialState;
    default:
      return state;
  }
};

export default dataStreamEntityReducer;
