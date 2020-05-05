import { Action, ActionTypes } from '../actions';

import { DefaultValues } from '../interfaces';

const initialState = {};

const defaultValuesReducer = (state: DefaultValues = initialState, action: Action) => {
  switch (action.type) {
    case ActionTypes.toggleIsLoggedIn:
      return initialState;
    default:
      return state;
  }
};

export default defaultValuesReducer;
