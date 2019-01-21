import React from 'react'


export const CartContext = React.createContext({
  cart: [{ id: 29, name: 'Lamp' }],
  addItemToCart: item => this.cart.push(item),
})
