import { ToggleDrawerAction, ToggleIsLoadingAction } from './ui';
import { GetProducerByContractAddressAction } from './producer';
import { DescribeDataMarketplaceAction } from './dataMarketplace';
import { SignInAction, SignUpAction, ToggleIsLoggedInAction } from './auth';
import { SetDataStreamEntityAction } from './dataStreamEntity';

export enum ActionTypes {
  toggleDrawer,
  getProducerByContractAddress,
  getDataMarketplaceByContractAddress,
  signIn,
  signUp,
  toggleIsLoading,
  toggleIsLoggedIn,
  setDataStreamEntity,
}

export type Action =
  | ToggleDrawerAction
  | GetProducerByContractAddressAction
  | DescribeDataMarketplaceAction
  | SignInAction
  | SignUpAction
  | ToggleIsLoadingAction
  | SetDataStreamEntityAction
  | ToggleIsLoggedInAction;
