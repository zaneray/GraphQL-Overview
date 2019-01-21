import React from 'react'
import { withRouteData } from 'react-static'

const Product = ({ product }) =>
  (
    <div>
      <h1> {product.name} </h1>
    </div>
  )

export default withRouteData(Product)
