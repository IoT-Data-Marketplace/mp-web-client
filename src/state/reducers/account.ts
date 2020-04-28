import { Action } from '../actions';

import { Account } from '../interfaces';

const initialState = {
  isLoggedIn: false,
};

const accountReducer = (state: Account = initialState, action: Action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default accountReducer;
