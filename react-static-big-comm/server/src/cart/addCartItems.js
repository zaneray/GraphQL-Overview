const { bigCommerceApiVersion3 } = require('../../lib/bigCommerce')


export default async event => {
  // you can use ES7 with async/await and even TypeScript in your functions :)

  const cart = {
    line_items: JSON.parse(event.data.line_items),
    gift_certificates: event.data.gift_certificates,
  }

  const addItemsResponse = await bigCommerceApiVersion3.post(`/carts/${event.data.cartId}`, cart)

  return {
    data: {
      cart: addItemsResponse,
    },
  }
}
