import { GraphQLClient } from 'graphql-request';

const endpoint = process.env.NODE_ENV === 'production' ? 'https://iot-data-mp.com/graphql' : 'http://localhost:8050/graphql';

// eslint-disable-next-line import/prefer-default-export
// @ts-ignore
export const graphQLClient = new GraphQLClient(endpoint, {});
