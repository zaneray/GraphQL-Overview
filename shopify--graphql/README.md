This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

Having trouble authenticating with Apollo in App.js

However, command line curl does work:

```
$ curl -X POST \
"https://dougs-graphql-test-store.myshopify.com/admin/api/graphql.json" \
-H "Content-Type: application/graphql" \
-H "X-Shopify-Access-Token: 3a14991e23d1a0fe44d78623fb776846" \
-d '
{
  shop {
    products(first: 5) {
      edges {
        node {
          id
          handle
        }
      }
      pageInfo {
        hasNextPage
      }
    }
  }
}
```