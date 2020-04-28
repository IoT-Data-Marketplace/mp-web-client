import { Action } from '../actions';

import { DefaultValues } from '../interfaces';

const initialState = {};

const defaultValuesReducer = (
  state: DefaultValues = initialState,
  action: Action
) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default defaultValuesReducer;
