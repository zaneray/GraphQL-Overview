import gql from 'graphql-tag'
import React from 'react'
import { graphql } from 'react-apollo'


const FindAllProducts = ({ children, data }) => {
  if (data.loading) {
    return <p>Loading...</p>
  } else if (data.error) {
    return <p>Error!</p>
  }
  const products = data.products.allProducts.map(p => ({
    id: p.id,
    name: p.name,
    description: p.description,
    price: p.price,
  }))
  return children(products)
}

const FindAllProductsWithData = graphql(gql`
  query {
    products {
      allProducts
    }
  }
`)(FindAllProducts)


export default FindAllProductsWithData
