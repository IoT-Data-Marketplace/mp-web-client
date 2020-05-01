import { ToggleDrawerAction, ToggleIsLoadingAction } from './ui';
import { DescribeDataMarketplaceAction } from './dataMarketplace';
import { SignInAction, SignUpAction, ToggleIsLoggedInAction } from './auth';
import {
  FetchDataStreamEntityAction,
  FetchDataStreamEntityContractBalanceAction,
  SetDataStreamEntityAction,
  SetDataStreamEntityContractBalanceAction,
} from './dataStreamEntity';
import {
  RegisterSensorAction,
  ResetRegisterSensorStateAction,
  SetGeneratedSensorContractAddressAction,
  SetSensorGeolocationAction,
  SetSensorTypeAction,
} from './registerSensor';

export enum ActionTypes {
  toggleDrawer,
  getDataMarketplaceByContractAddress,
  signIn,
  signUp,
  toggleIsLoading,
  toggleIsLoggedIn,
  setDataStreamEntity,
  fetchDataStreamEntityContractBalance,
  setDataStreamEntityContractBalance,
  setSensorType,
  setSensorGeolocation,
  registerSensor,
  resetRegisterSensorState,
  setGeneratedSensorContractAddress,
  fetchDataStreamEntity,
}

export type Action =
  | ToggleDrawerAction
  | DescribeDataMarketplaceAction
  | SignInAction
  | SignUpAction
  | ToggleIsLoadingAction
  | SetDataStreamEntityAction
  | ToggleIsLoggedInAction
  | FetchDataStreamEntityContractBalanceAction
  | SetDataStreamEntityContractBalanceAction
  | SetSensorTypeAction
  | SetSensorGeolocationAction
  | RegisterSensorAction
  | ResetRegisterSensorStateAction
  | SetGeneratedSensorContractAddressAction
  | FetchDataStreamEntityAction;
