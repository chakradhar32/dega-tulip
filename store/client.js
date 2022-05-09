import { ApolloClient, InMemoryCache } from '@apollo/client';
import 'isomorphic-unfetch';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

export const client = new ApolloClient({
  uri: publicRuntimeConfig.apiUrl,
  headers: {
    'X-Dega-API-Key': publicRuntimeConfig.degaAPIKey,
    'X-Space': parseInt(publicRuntimeConfig.spaceId),
  },
  cache: new InMemoryCache(),
});
