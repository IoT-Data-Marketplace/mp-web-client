import { DataMarketplace } from '../interfaces';
import { Action, ActionTypes } from '../actions';

const initialState = {
  address: process.env.REACT_APP_IOT_DATA_MARKETPLACE_CONTRACT_ADDRESS
    ? process.env.REACT_APP_IOT_DATA_MARKETPLACE_CONTRACT_ADDRESS
    : '',
};

const dataMarketplaceReducer = (state: DataMarketplace = initialState, action: Action): DataMarketplace => {
  switch (action.type) {
    case ActionTypes.toggleIsLoggedIn:
      return initialState;
    default:
      return state;
  }
};

export default dataMarketplaceReducer;
