import { ActionTypes } from './types';

export interface ToggleDrawerAction {
  type: ActionTypes.toggleDrawer;
  isDrawerOpen: boolean;
}

export const toggleDrawer = (isDrawerOpen: boolean): ToggleDrawerAction => {
  return {
    type: ActionTypes.toggleDrawer,
    isDrawerOpen,
  };
};

export interface ToggleIsLoadingAction {
  type: ActionTypes.toggleIsLoading;
  isLoading: boolean;
}

export const toggleIsLoading = (isLoading: boolean): ToggleIsLoadingAction => {
  return {
    type: ActionTypes.toggleIsLoading,
    isLoading,
  };
};
