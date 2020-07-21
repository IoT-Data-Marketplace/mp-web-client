import { GraphQLClient } from 'graphql-request';
import { baseEndpoint } from '../constants';
import configureStore from './configureStore';

const endpoint = `${baseEndpoint}/graphql`;
export const store = configureStore();

// eslint-disable-next-line import/prefer-default-export
// @ts-ignore
export const graphQLClient = new GraphQLClient(endpoint, {
  headers: {
    Authorization: `Bearer ${store.getState().auth.jwt}`,
  },
});

export const getGraphQLClient = (includeAuthHeader = true): GraphQLClient => {
  return new GraphQLClient(endpoint, {
    headers: includeAuthHeader
      ? {
          Authorization: `Bearer ${store.getState().auth.jwt}`,
        }
      : {},
  });
};
