import { Action, ActionTypes } from '../actions';

import { Auth } from '../interfaces';

const initialState = {
  isLoggedIn: false,
};

const authReducer = (state: Auth = initialState, action: Action) => {
  switch (action.type) {
    case ActionTypes.toggleIsLoggedIn:
      return {
        ...state,
        isLoggedIn: action.isLoggedIn,
      };
    default:
      return state;
  }
};

export default authReducer;
