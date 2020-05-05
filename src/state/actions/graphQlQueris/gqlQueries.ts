export const getProducerByContractAddressGQLQuery = (producerAccountContractAddress: string): string => {
  return `{
        getProducerByContractAddress(producerAccountContractAddress:"${producerAccountContractAddress}")
        {
          producerContractAddress
        }
      }`;
};

export const getRegisterIoTSensorGQLQuery = (newSensorContractAddress: string): string => {
  return `mutation{
    registerIoTSensor(
      sensorContractAddress:"${newSensorContractAddress}"
    ) {
        statusCode,
        responseBody
    }
  }`;
};
