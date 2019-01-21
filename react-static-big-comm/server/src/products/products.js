const { bigCommerceApiVersion3 } = require('../../lib/bigCommerce')


export default async () => {
  // you can use ES7 with async/await and even TypeScript in your functions :)
  const productsResponse = await bigCommerceApiVersion3.get('/catalog/products')

  return {
    data: {
      allProducts: productsResponse,
    },
  }
}
