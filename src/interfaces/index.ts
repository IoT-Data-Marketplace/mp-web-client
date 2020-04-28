import { Account, Ui, DataMarketplace, DefaultValues} from '../state/interfaces';

export interface StoreState {
  defaultValues: DefaultValues;
  account: Account;
  ui: Ui;
  dataMarketplace: DataMarketplace;
}
