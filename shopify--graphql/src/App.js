import React, { Component } from 'react';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import gql from "graphql-tag";
import logo from './logo.svg';
import './App.css';

const httpLink = createHttpLink({
  uri: "https://dougs-graphql-test-store.myshopify.com/admin/api/graphql.json"
});

const authLink = setContext((_, { headers }) => {
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      'Content-Type': "application/graphql",
      'X-Shopify-Access-Token': "3a14991e23d1a0fe44d78623fb776846"
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

console.log(client)

client
  .query({
    query: gql`
      {
        shop {
          products(first: 5) {
            edges {
              node {
                id
                handle
                title
              }
            }
            pageInfo {
              hasNextPage
            }
          }
        }
      }
    `
  })
  .then(result => console.log(result));

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h4>Shopify GraphQL Demo</h4>
          <h5>In Theory</h5>
        </header>
      </div>
    );
  }
}

export default App;


