const BigCommerce = require('node-bigcommerce')

const bigCommerceApiVersion2 = new BigCommerce({
  name: 'Sample Store',
  clientId: '5ahrbapu6xyq7sam7ldbprz27ynu3pg',
  accessToken: 'o87y6kvrb4zdyn1b0zsiq2dlwrhus94',
  storeHash: 'dpjwmwci2h',
  responseType: 'json',
  apiVersion: 'v2', // v3 no workie
})

const bigCommerceApiVersion3 = new BigCommerce({
  clientId: '5ahrbapu6xyq7sam7ldbprz27ynu3pg',
  accessToken: 'o87y6kvrb4zdyn1b0zsiq2dlwrhus94',
  storeHash: 'dpjwmwci2h',
  responseType: 'json',
  apiVersion: 'v3',
})

module.exports = {
  bigCommerceApiVersion2, bigCommerceApiVersion3,
}
