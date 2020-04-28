import { Account, Ui, DataMarketplace, DefaultValues} from './index';

export interface StoreState {
  defaultValues: DefaultValues;
  account: Account;
  ui: Ui;
  dataMarketplace: DataMarketplace;
}
