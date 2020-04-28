import { ToggleDrawerAction } from './ui';
import { GetProducerByContractAddressAction } from './producer';
import { DescribeDataMarketplaceAction } from './dataMarketplace';

export enum ActionTypes {
  toggleDrawer,
  getProducerByContractAddress,
  getDataMarketplaceByContractAddress,
}

export type Action =
  | ToggleDrawerAction
  | GetProducerByContractAddressAction
  | DescribeDataMarketplaceAction;
