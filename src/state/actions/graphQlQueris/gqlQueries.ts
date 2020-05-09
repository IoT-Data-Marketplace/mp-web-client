export const getProducerByContractAddressGQLQuery = (producerAccountContractAddress: string): string => {
  return `{
        getProducerByContractAddress(producerAccountContractAddress:"${producerAccountContractAddress}")
        {
          producerContractAddress
        }
      }`;
};

export const getRegisterSensorGQLQuery = (newSensorContractAddress: string): string => {
  return `mutation{
    registerSensor(
      sensorContractAddress:"${newSensorContractAddress}"
    ) {
        statusCode,
        responseBody
    }
  }`;
};

export const getFetchSensorSummaryGQLQuery = (sensorContractAddress: string): string => {
  return `query{
    getSensorSummary(
      sensorContractAddress:"${sensorContractAddress}"
    ) {
        streamSize
    }
  }`;
};
