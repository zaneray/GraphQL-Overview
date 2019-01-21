const { bigCommerceApiVersion3 } = require('../../lib/bigCommerce')


export default async event => {
  // you can use ES7 with async/await and even TypeScript in your functions :)

  const cart = {
    customer_id: event.data.customer_id,
    email: event.data.email,
    line_items: event.data.line_items,
    gift_certificates: event.data.gift_certificates,
  }

  const createCartResponse = await bigCommerceApiVersion3.post('/carts', cart)

  return {
    data: {
      cart: createCartResponse,
    },
  }
}
