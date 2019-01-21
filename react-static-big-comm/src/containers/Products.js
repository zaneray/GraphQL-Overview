
import React from 'react'
import { Link, withRouteData } from 'react-static'
import { Card, Typography, Button } from '../components/mui'
import { ThreeColumnGrid, TwoColumnGrid, CenterFlex } from '../components/layouts'
import { CartContext } from '../CartContext'

const Products = ({ products }) => (
  <div>
    <h1>Products</h1>
    <ThreeColumnGrid>
      {products.map(prod =>
        (
          <Card key={prod.id}>
            <div>
              <CenterFlex>
                <Typography kind="title">{prod.name}</Typography>
                <Typography kind="subheading">{prod.description}</Typography>
              </CenterFlex>
              <TwoColumnGrid>
                <Link style={{ textDecoration: 'none' }} to={`/products/product/${prod.id}`}> <Button> View </Button> </Link>
                <Button> Add To Cart </Button>
              </TwoColumnGrid>
            </div>
          </Card>
      ))}
    </ThreeColumnGrid>
  </div>
)

export default withRouteData(Products)
