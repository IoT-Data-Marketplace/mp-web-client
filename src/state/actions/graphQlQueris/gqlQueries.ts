export const getProducerByContractAddressGQLQuery = (
  producerAccountContractAddress: string
): string => {
  return `{
        getProducerByContractAddress(producerAccountContractAddress:"${producerAccountContractAddress}")
        {
          producerContractAddress
        }
      }`;
};
