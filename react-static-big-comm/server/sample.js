const { bigCommerceApiVersion3 } = require('./lib/bigCommerce')

const testFunction = async () => {
  // you can use ES7 with async/await and even TypeScript in your functions :)

  // const cartInfo = {
  //   customer_id: 2,
  //   email: 'doug@zaneray.com',
  //   line_items: [],
  //   gift_certificates: [],
  // }

  const result = await bigCommerceApiVersion3.get('/carts')

  console.log('The Result', result)

  return result
}

testFunction()
