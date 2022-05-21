import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://connectr-swapi.herokuapp.com/',
  cache: new InMemoryCache(),
});

export default client;
