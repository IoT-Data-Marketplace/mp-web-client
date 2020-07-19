import { GraphQLClient } from 'graphql-request';
import { store } from '../index';
import { baseEndpoint } from '../constants';

const endpoint = `${baseEndpoint}/graphql`;

// eslint-disable-next-line import/prefer-default-export
// @ts-ignore
export const graphQLClient = new GraphQLClient(endpoint, {
  headers: {
    Authorization: `Bearer ${store.getState().auth.jwt}`,
  },
});
