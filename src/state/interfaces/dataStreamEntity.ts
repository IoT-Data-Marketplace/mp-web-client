export interface DataStreamEntity {
  iotDataMarketplaceContractAddress: string;
  dataStreamEntityContractAddress: string;
  dataStreamEntityContractBalance?: string;
  dataStreamEntityOwnerAddress: string;
  name: string;
  url: string;
  email: string;
  sensors: string[];
}
