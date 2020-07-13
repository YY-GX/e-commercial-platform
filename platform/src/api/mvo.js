let ip = '39.106.57.246';
let port = '4396';
let base_url = 'http://' + ip + ':' + port;
const path = require('path');

// login submit的api
export function login(obj, data) {
  return obj.$http.post(base_url + '/login', data)
}

/*
* Author: Yue Yang
* Module: MVO
* */

// add to wishlist
export function addWaitlist(obj, data) {
  return obj.$http.post(base_url + '/pro/bvo/wishlist/add', data)
}

// get product detail
export function getProductDetail(obj, data) {
  return obj.$http.get(base_url + '/pro/mvo/product/detail/get', {
    params: data
  })
}

// product order things btn
export function buyProduct(obj, data) {
  return obj.$http.post(base_url + '/order/product/buy', data)
}

// get all product information
export function getProductInfos(obj, data) {
  return obj.$http.get(base_url + '/pro/mvo/product/get', {
    params: data
  })
}

// delete one product
export function deleteProduct(obj, data) {
  return obj.$http.post(base_url + '/pro/mvo/product/delete', data)
}

// change status of product
export function changeProductStatus(obj, data) {
  return obj.$http.post(base_url + '/pro/mvo/product/status/update', data)
}

// add product
export function addProductApi(obj, data) {
  return obj.$http.post(base_url + '/pro/mvo/product/add', data)
}

// edit product
export function editProductApi(obj, data) {
  return obj.$http.post(base_url + '/pro/mvo/product/detail/update', data)
}

// upload images
export function uploadImg(obj, data) {
  return obj.$http.post(base_url + '/pro/mvo/product/image/upload', data)
}

// get order list
export function getOrderList(obj, data) {
  return obj.$http.get(base_url + '/order/info/get', {
    params: data
  })
}

// ship order
export function shipOrder(obj, data) {
  return obj.$http.post(base_url + '/order/ship', data)
}

// cancel ship
export function cancelOrder(obj, data) {
  return obj.$http.post(base_url + '/order/ship/cancel', data)
}

// delete company
export function deleteCompany(obj, data) {
  return obj.$http.post(base_url + '/info/company/delete', data)
}

// delete brand
export function deleteBrand(obj, data) {
  return obj.$http.post(base_url + '/info/brand/delete', data)
}

// Add company
export function addCompany(obj, data) {
  return obj.$http.post(base_url + '/info/brand/add', data)
}

// Get company basic information
export function getCompanyInfo(obj, data) {
  console.log(obj.$http.get(base_url + '/info/company/get', {
    params: data
  }))
  return obj.$http.get(base_url + '/info/company/get', {
    params: data
  })
}

/*
* Author: Fangyang Ye
* Module: BVO
* */
