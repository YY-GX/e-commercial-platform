let base_url = '';

// login submit的api
export function login(obj, data) {
  return obj.$http.post(path.join(base_url, '/login'), data)
}

/*
* Author: Yue Yang
* Module: MVO
* */

// add to wishlist
export function addWaitlist(obj, data) {
  return obj.$http.post(path.join(base_url, '/bvo/wishlist/add'), data)
}

// get product detail
export function getProductDetail(obj, data) {
  return obj.$http.post(path.join(base_url, '/mvo/product/detail/get'), data)
}

// product buy things btn
export function buyProduct(obj, data) {
  return obj.$http.post(path.join(base_url, '/bvo/product/buy'), data)
}

// get all product information
export function getProductInfos(obj, data) {
  return obj.$http.post(path.join(base_url, '/mvo/product/get'), data)
}

// delete one product
export function deleteProduct(obj, data) {
  return obj.$http.post(path.join(base_url, '/mvo/product/delete'), data)
}

// change status of product
export function changeProductStatus(obj, data) {
  return obj.$http.post(path.join(base_url, '/mvo/product/status/update'), data)
}

// add product
export function addProductApi(obj, data) {
  return obj.$http.post(path.join(base_url, '/mvo/product/add'), data)
}

// edit product
export function editProductApi(obj, data) {
  return obj.$http.post(path.join(base_url, '/pro/mvo/product/detail/update'), data)
}

// upload images
export function uploadImg(obj, data) {
  return obj.$http.post(path.join(base_url, '/pro/mvo/product/image/upload'), data)
}

// get order list
export function getOrderList(obj, data) {
  return obj.$http.get(path.join(base_url, '/order/info/get'), data)
}

// ship order
export function shipOrder(obj, data) {
  return obj.$http.post(path.join(base_url, '/order/ship'), data)
}

// cancel ship
export function cancelOrder(obj, data) {
  return obj.$http.post(path.join(base_url, '/order/ship/cancel'), data)
}

/*
* Author: Fangyang Ye
* Module: BVO
* */
