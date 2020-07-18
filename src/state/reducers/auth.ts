import { Action, ActionTypes } from '../actions';

import { Auth } from '../interfaces';

const initialState = {
  isLoggedIn: false,
  jwt: '',
};

const authReducer = (state: Auth = initialState, action: Action) => {
  switch (action.type) {
    case ActionTypes.toggleIsLoggedIn:
      return {
        ...state,
        isLoggedIn: action.isLoggedIn,
        jwt: action.isLoggedIn ? state.jwt : '', // we cleanup the jwt token if we log out
      };
    case ActionTypes.setJWTToken:
      return {
        ...state,
        jwt: action.jwt,
      };
    default:
      return state;
  }
};

export default authReducer;
