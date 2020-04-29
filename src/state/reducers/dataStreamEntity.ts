import { Action, ActionTypes } from '../actions';
import { DataStreamEntity } from '../interfaces';

const initialState = {
  iotDataMarketplaceContractAddress: '',
  dataStreamEntityContractAddress: '',
  dataStreamEntityOwnerAddress: '',
  name: '',
  url: '',
  email: '',
};

const dataStreamEntityReducer = (
  state: DataStreamEntity = initialState,
  action: Action
): DataStreamEntity => {
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
      };
    default:
      return state;
  }
};

export default dataStreamEntityReducer;
