import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import fetch from 'node-fetch'

const client = new ApolloClient({
  link: new HttpLink({
    fetch,
    uri: 'https://api.graph.cool/simple/v1/cjiw8gp4k2dyw0149xugcnegh',
  }),
  cache: new InMemoryCache(),
})

export default client
