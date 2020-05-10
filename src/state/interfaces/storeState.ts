import {
  Auth,
  Ui,
  DataMarketplace,
  DefaultValues,
  IDataStreamEntity,
  RegisterSensor,
  SensorState,
  DataStream
} from './index';

export interface StoreState {
  defaultValues: DefaultValues;
  auth: Auth;
  ui: Ui;
  dataMarketplace: DataMarketplace;
  dataStreamEntity: IDataStreamEntity;
  registerSensor: RegisterSensor;
  sensor: SensorState;
  dataStream: DataStream;
}
