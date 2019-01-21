const { bigCommerceApiVersion3 } = require('../../lib/bigCommerce')

export default async () => {
  // you can use ES7 with async/await and even TypeScript in your functions :)
  const ordersResponse = await bigCommerceApiVersion3.get('/orders')

  return {
    data: {
      allOrders: ordersResponse,
    },
  }
}
