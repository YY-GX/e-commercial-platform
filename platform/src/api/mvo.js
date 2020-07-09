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

/*
* Author: Fangyang Ye
* Module: BVO
* */
