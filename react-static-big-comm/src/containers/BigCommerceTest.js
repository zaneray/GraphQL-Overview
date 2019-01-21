import React, { Component } from 'react'
import BigCommerce from 'node-bigcommerce'
import { CartContext } from '../CartContext'

const bigCommerce = new BigCommerce({
  name: 'Sample Store',
  clientId: '5ahrbapu6xyq7sam7ldbprz27ynu3pg',
  accessToken: 'o87y6kvrb4zdyn1b0zsiq2dlwrhus94',
  storeHash: 'dpjwmwci2h',
  responseType: 'json',
  apiVersion: 'v2', // v3 no workie
})

class BigCommerceTest extends Component {
  async loadProducts () {
    const products = await bigCommerce.get('/products')
    console.log(products)
    return products
  }
  render () {
    return (
      <div>
        <button onClick={() => this.loadProducts()}> Get All Orders </button>
        <CartContext.Consumer>
          {
            ({ cart }) => cart.map(item => <div> <h1> {item.name} </h1></div>)
          }
        </CartContext.Consumer>
      </div>
    )
  }
}

export default BigCommerceTest
