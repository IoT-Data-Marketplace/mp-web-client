import { DataStreamEntity } from '../interfaces/dataStreamEntity';

export const populateDataStreamEntity = (
  dataStreamEntityResult: any,
  dataStreamEntityContractAddress: string
): DataStreamEntity => {
  return {
    dataStreamEntityContractAddress,
    iotDataMarketplaceContractAddress: dataStreamEntityResult[0],
    dataStreamEntityOwnerAddress: dataStreamEntityResult[1],
    name: dataStreamEntityResult[2],
    url: dataStreamEntityResult[3],
    email: dataStreamEntityResult[4],
  };
};
