import { GraphQLClient } from 'graphql-request';

const endpoint = process.env.REACT_APP_GRAPHQL_ENDPOINT || 'http://localhost:8050/graphql';

// eslint-disable-next-line import/prefer-default-export
export const graphQLClient = new GraphQLClient(endpoint, {});
