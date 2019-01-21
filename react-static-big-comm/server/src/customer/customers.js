const { bigCommerceApiVersion2 } = require('../../lib/bigCommerce')

export default async () => {
  // you can use ES7 with async/await and even TypeScript in your functions :)
  const customersResponse = await bigCommerceApiVersion2.get('/customers')

  return {
    data: {
      allCustomers: customersResponse,
    },
  }
}
