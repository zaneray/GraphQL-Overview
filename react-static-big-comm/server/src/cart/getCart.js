const { bigCommerceApiVersion3 } = require('../../lib/bigCommerce')

// 6f35c3ca-f78e-490f-a552-ae50e781253a

export default async event => {
  // you can use ES7 with async/await and even TypeScript in your functions :)

  const getCartResponse = await bigCommerceApiVersion3.get(`/carts/${event.data.cartId}`)

  return {
    data: {
      cart: getCartResponse,
    },
  }
}
