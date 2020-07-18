import { ToggleDrawerAction, ToggleIsLoadingAction } from './ui';
import { DescribeDataMarketplaceAction } from './dataMarketplace';
import { SignInAction, SignUpAction, ToggleIsLoggedInAction, SetJWTTokenAction } from './auth';
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
  SetPricePerDataUnitAction,
  SetSensorGeolocationAction,
  SetSensorTypeAction,
} from './sensor/registerSensor';
import {
  AddFetchedSensorAction,
  GetAllDataMarketplaceSensorsAction,
  GetSensorForDataStreamEntityContractAddressAction,
} from './sensor/sensor';
import { SetSensorStatusAction } from './sensor/sensorStatus';
import {
  BuyDataStreamAction,
  CleanUpDataStreamStateAction,
  GetMessagesForSensorAction,
  SetDataStreamRecordsAction,
  SetDataStreamSizeAction,
} from './dataStream';

export enum ActionTypes {
  toggleDrawer,
  getDataMarketplaceByContractAddress,
  signIn,
  signUp,
  toggleIsLoading,
  toggleIsLoggedIn,
  setJWTToken,
  setDataStreamEntity,
  fetchDataStreamEntityContractBalance,
  setDataStreamEntityContractBalance,
  setSensorType,
  setSensorGeolocation,
  registerSensor,
  resetRegisterSensorState,
  setGeneratedSensorContractAddress,
  fetchDataStreamEntity,
  getSensorsForDataStreamContractAddress,
  addFetchedSensor,
  setSensorStatus,
  getMessagesForSensor,
  setDataStreamRecords,
  setDataStreamSize,
  setPricePerDataUnit,
  buyDataStream,
  getAllDataMarketplaceSensors,
  cleanUpDataStreamState,
}

export type Action =
  | ToggleDrawerAction
  | DescribeDataMarketplaceAction
  | SignInAction
  | SignUpAction
  | ToggleIsLoadingAction
  | SetDataStreamEntityAction
  | ToggleIsLoggedInAction
  | SetJWTTokenAction
  | FetchDataStreamEntityContractBalanceAction
  | SetDataStreamEntityContractBalanceAction
  | SetSensorTypeAction
  | SetSensorGeolocationAction
  | RegisterSensorAction
  | ResetRegisterSensorStateAction
  | SetGeneratedSensorContractAddressAction
  | FetchDataStreamEntityAction
  | GetSensorForDataStreamEntityContractAddressAction
  | AddFetchedSensorAction
  | SetSensorStatusAction
  | GetMessagesForSensorAction
  | SetDataStreamRecordsAction
  | SetDataStreamSizeAction
  | SetPricePerDataUnitAction
  | BuyDataStreamAction
  | CleanUpDataStreamStateAction
  | GetAllDataMarketplaceSensorsAction;
