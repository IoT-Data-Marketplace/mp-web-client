import { Dispatch } from 'redux';
import { request } from 'graphql-request';
import { ActionTypes } from './types';
import { getProducerByContractAddressGQLQuery } from './graphQlQueris/gqlQueries';

export interface GetProducerByContractAddressAction {
  type: ActionTypes.getProducerByContractAddress;
  producerContractAddress: string;
}

export const getProducerByContractAddress = (
  producerContractAddress: string
) => {
  return async (dispatch: Dispatch) => {
    try {
      const query = getProducerByContractAddressGQLQuery('injected-address');
      const result = await request('http://localhost:8080/graphql', query);
    } catch (e) {
      console.error(
        'Error while fetching the producer with address: ',
        producerContractAddress,
        '\nError: ',
        e
      );
    }
  };
};
