import { Action, ActionTypes } from '../actions';

import { Ui } from '../interfaces';

const initialState = {
  isDrawerOpen: false,
  isLoading: false,
};

const uiReducer = (state: Ui = initialState, action: Action) => {
  switch (action.type) {
    case ActionTypes.toggleDrawer:
      return {
        ...state,
        isDrawerOpen: action.isDrawerOpen,
      };
    case ActionTypes.toggleIsLoading:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    default:
      return state;
  }
};

export default uiReducer;
