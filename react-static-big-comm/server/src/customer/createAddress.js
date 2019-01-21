const { bigCommerceApiVersion2 } = require('../../lib/bigCommerce')

export default async event => {
  // you can use ES7 with async/await and even TypeScript in your functions :)

  const address = {
    company: event.data.company,
    first_name: event.data.first_name,
    last_name: event.data.last_name,
    email: event.data.email,
    phone: event.data.phone,
    customer_id: event.data.customer_id,
    street_1: event.data.street_1,
    street_2: event.data.street_2,
    city: event.data.city,
    state: event.data.state,
    zip: event.data.zip,
    country: event.data.country,
    address_type: event.data.address_type,
  }

  const createAddressResponse = await bigCommerceApiVersion2.post(`/customers/${event.data.customer_id}/addresses`, address)

  return {
    data: {
      address: createAddressResponse,
    },
  }
}
