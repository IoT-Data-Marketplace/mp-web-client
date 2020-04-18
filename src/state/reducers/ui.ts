import { Action, ActionTypes, Ui } from '../actions';

const initialState = {
  isDrawerOpen: false,
};

const uiReducer = (state: Ui = initialState, action: Action) => {
  switch (action.type) {
    case ActionTypes.toggleDrawer:
      return {
        ...state,
        isDrawerOpen: action.isDrawerOpen,
      };
    default:
      return state;
  }
};

export default uiReducer;
