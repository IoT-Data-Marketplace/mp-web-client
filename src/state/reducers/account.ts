import { Account, Action } from '../actions';

const initialState = {
  user: undefined,
};

const accountReducer = (
  state: Account = initialState,
  action: Action
): Account => {
  switch (action.type) {
    default:
      return state;
  }
};

export default accountReducer;
