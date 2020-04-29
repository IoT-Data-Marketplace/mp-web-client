import {
  Auth,
  Ui,
  DataMarketplace,
  DefaultValues,
  DataStreamEntity,
} from './index';

export interface StoreState {
  defaultValues: DefaultValues;
  auth: Auth;
  ui: Ui;
  dataMarketplace: DataMarketplace;
  dataStreamEntity: DataStreamEntity;
}
