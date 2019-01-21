const { bigCommerceApiVersion2 } = require('../../lib/bigCommerce')

export default async event => {
  // you can use ES7 with async/await and even TypeScript in your functions :)

  const customer = {
    company: event.data.company,
    first_name: event.data.first_name,
    last_name: event.data.last_name,
    email: event.data.email,
    phone: event.data.phone,
  }

  const createCustomerResponse = await bigCommerceApiVersion2.post('/customers', customer)

  return {
    data: {
      customer: createCustomerResponse,
    },
  }
}
