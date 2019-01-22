## Introduction to GraphQL

By Doug Walter for The ZaneRay Group

----

### Overview

![overview]("./assets/graphql-overview.png")

GraphQL is a query language that is very different then REST.

- You can build and maintain your own GraphQL servers using Node. See "GraphQL-Express" Demo

- You can use BAAS (backend-as-a-service) tools like GraphCool which provide the GraphQL infrastructure, and allow you to focus on writing code. (think google cloud functions)

- You can consume a third party GraphQL API such as [shopify](https://help.shopify.com/en/api/graphql-admin-api)

---

### Resources And Links

[GraphQL.org](https://graphql.org/)

----


### Apollo

( If you do not want to use Apollo you can use graphql-request)

Regardless of where you GraphQL source is coming from, your web application is always going to use Apollo to provide a networking interface between your web application and your graphQL server.

Apollo gives you some great out of box tools:
 - query and mutation components
 - polling and fetching
 - local state management
 - loading and error state
 - subscriptions 
 - data caching
 - fragments


```
import ApolloClient from "apollo-boost";

const client = new ApolloClient({
  uri: "https://48p1r2roz4.sse.codesandbox.io"
});
```


Then query your data using the `client.query()` promise:

```
import gql from "graphql-tag";

...

client
  .query({
    query: gql`
      {
        rates(currency: "USD") {
          currency
        }
      }
    `
  })
  .then(result => console.log(result));
```

---

#### React Example

```
import React from "react";
import { render } from "react-dom";

import { ApolloProvider } from "react-apollo";

const App = () => (
  <ApolloProvider client={client}>
    <div>
      <h2>My first Apollo app 🚀</h2>
    </div>
  </ApolloProvider>
);

render(<App />, document.getElementById("root"));
```

#### Query Component

```
import gql from "graphql-tag";
import { Query } from "react-apollo";

const GET_DOGS = gql`
  {
    dogs {
      id
      breed
    }
  }
`;

const Dogs = ({ onDogSelected }) => (
  <Query query={GET_DOGS}>
    {({ loading, error, data }) => {
      if (loading) return "Loading...";
      if (error) return `Error! ${error.message}`;

      return (
        <select name="dog" onChange={onDogSelected}>
          {data.dogs.map(dog => (
            <option key={dog.id} value={dog.breed}>
              {dog.breed}
            </option>
          ))}
        </select>
      );
    }}
  </Query>
);
```

----

#### Demos

- react-static-big-comm
    - react-static static site generator
    - GraphCool wraps BigCommerce API
    - Apollo client providing networking interface


#### GraphCool

- use command line tool


#### Shopify

https://accounts.shopify.com/store-login

"dougs-graphql-test-store.myshopify.com"

```
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
```