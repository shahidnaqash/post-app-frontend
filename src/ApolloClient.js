import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, gql,createHttpLink} from '@apollo/client';
import { setContext } from "apollo-link-context";
import App from './App.js'

const httpLink = createHttpLink({
    uri: 'http://localhost:5000/'
  });


// const client = new ApolloClient({
//     uri: 'http://localhost:5000/',
//     cache: new InMemoryCache(),
//   });

const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('jwtToken');
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      }
    }
  });

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
  });
export default (
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>
)