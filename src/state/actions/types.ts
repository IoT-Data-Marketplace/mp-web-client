import { ToggleDrawerAction, ToggleIsLoadingAction} from './ui';
import { GetProducerByContractAddressAction } from './producer';
import { DescribeDataMarketplaceAction } from './dataMarketplace';
import { SignInAction, SignUpAction } from './auth';

export enum ActionTypes {
  toggleDrawer,
  getProducerByContractAddress,
  getDataMarketplaceByContractAddress,
  signIn,
  signUp,
  toggleIsLoading,
}

export type Action =
  | ToggleDrawerAction
  | GetProducerByContractAddressAction
  | DescribeDataMarketplaceAction
  | SignInAction
  | SignUpAction
  | ToggleIsLoadingAction;
