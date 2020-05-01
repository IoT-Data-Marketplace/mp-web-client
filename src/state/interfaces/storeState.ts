import {
  Auth,
  Ui,
  DataMarketplace,
  DefaultValues,
  IDataStreamEntity,
  RegisterSensor
} from './index';

export interface StoreState {
  defaultValues: DefaultValues;
  auth: Auth;
  ui: Ui;
  dataMarketplace: DataMarketplace;
  dataStreamEntity: IDataStreamEntity;
  registerSensor: RegisterSensor;
}
