import { ToggleDrawerAction } from './ui';
import { GetProducerByContractAddressAction } from './producer';

export enum ActionTypes {
  toggleDrawer,
  getProducerByContractAddress,
}

export type Action = ToggleDrawerAction | GetProducerByContractAddressAction;
