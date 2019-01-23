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


### Additional Examples



```
// DB Component
import {INSERT, withQuery} from '@dimg/apollo-tag'
import gql from 'graphql-tag'
import {Tables} from '../Tables'
import {displayCustomerFragment} from './displayCustomerFragment'

const findCustomersByForeignKey = gql`
  query findCustomersByForeignKey($ownerId: ID!) {
    allCustomers(filter: {owner: {id: $ownerId}}) {
      ...displayCustomerFragment
    }
  }
  ${displayCustomerFragment}
`

const dependencies = {
  [Tables.CUSTOMER]: [INSERT],
}

export const FindCustomersByForeignKey = withQuery(findCustomersByForeignKey, {
  dependencies,
})
````


```
// in usage

const MyCustomersTable = ({userId}) => (
  <FindCustomersByForeignKey ownerId={userId}>
    {({customers}) => {
      const mapCustomersToRow = customers.map(c => ({
        name: <Link to={Routes.customers.customer.info.url(c.id)}>{c.name}</Link>,
        classification: c.classification,
        id: c.id,
      }))
      return (
        <GraphPanel header={'This Weeks Customers'}>
          <EnhancedTable
            data={mapCustomersToRow}
            sortBy="name"
            orderBy="name"
            headers={headers}
            colSpan={2}
          />
        </GraphPanel>
      )
    }}
  </FindCustomersByForeignKey>
```