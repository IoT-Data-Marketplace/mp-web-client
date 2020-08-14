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
        streamSize,
        jwt
    }
  }`;
};

export const getGetMessagesForSensorGQLQuery = (
  entityContractAddress: string,
  sensorContractAddress: string,
  offset: number,
  count: number
): string => {
  return `query{
    getMessagesForSensor(
      entityContractAddress:"${entityContractAddress}",
      sensorContractAddress:"${sensorContractAddress}",
      offset:${offset},
      count:${count}
    ) {
        statusCode,
        records {
          key
          value
          offset
        }
      }
  }`;
};

export const getGetAuthNonceGQLQuery = (dspAccountAddress: string, dspContractAddress: string): string => {
  return `mutation{
    getAuthNonce(
      dspAccountAddress:"${dspAccountAddress}",
      dspContractAddress:"${dspContractAddress}"
    ) {
        statusCode,
        responseBody
    }
  }`;
};

export const getVerifyAuthChallengeGQLQuery = (
  signature: string,
  nonce: string,
  dspAccountAddress: string,
  dspContractAddress: string
): string => {
  return `mutation{
    verifyAuthChallenge(
      signature:"${signature}",
      nonce:"${nonce}",
      dspAccountAddress:"${dspAccountAddress}",
      dspContractAddress:"${dspContractAddress}"
    ) {
        statusCode,
        responseBody
    }
  }`;
};
