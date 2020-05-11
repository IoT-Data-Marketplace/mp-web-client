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

export const getGetMessagesForSensorGQLQuery = (sensorContractAddress: string, offset: number, count: number): string => {
  return `query{
    getMessagesForSensor(
      sensorContractAddress:"${sensorContractAddress}",
      offset:${offset},
      count:${count}
    ) {
        records {
          key
          value
          offset
        }
      }
  }`;
};
