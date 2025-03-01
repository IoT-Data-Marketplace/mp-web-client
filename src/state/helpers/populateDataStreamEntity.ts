import { IDataStreamEntity } from '../interfaces';

export const populateDataStreamEntity = (
  dataStreamEntityResult: any,
  dataStreamEntityContractAddress: string
): IDataStreamEntity => {
  return {
    dataStreamEntityContractAddress,
    iotDataMarketplaceContractAddress: dataStreamEntityResult[0],
    dataStreamEntityOwnerAddress: dataStreamEntityResult[1],
    name: dataStreamEntityResult[2],
    url: dataStreamEntityResult[3],
    email: dataStreamEntityResult[4],
    rsaPublicKey: dataStreamEntityResult[5],
    sensorContractAddresses: dataStreamEntityResult[6],
  };
};
