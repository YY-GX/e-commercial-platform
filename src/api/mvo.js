let ip = '39.106.57.246';
let port = '4396';
let base_url = 'http://' + ip + ':' + port;

// login submit的api
export function login(obj, data) {
  console.log(obj.$http.post(base_url + '/user/login', data))
  return obj.$http.post(base_url + '/user/login', data)
}

// Get code
export function getCode(obj) {
  return obj.$http.get(base_url + '/user/code', {responseType: 'arraybuffer'})
}

// Get token
export function getToken(obj, data) {
  return obj.tokenGet.post(base_url + '/oauth/token', data);
}

// Sign up
export function register(obj, data) {
  return obj.$http.post(base_url + '/user/register', data);
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

// get all product information by brdId
export function getProductInfosByBrd(obj, data) {
  return obj.$http.get(base_url + '/pro/mvo/product/get', {
    params: data
  })
}

// get all product information by usrId
export function getProductInfosByUsr(obj, data) {
  return obj.$http.get(base_url + '/pro/mvo/product/all', {
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

// // upload images
// export function uploadImg(obj, data) {
//   return obj.$http.post(base_url + '/pro/mvo/product/image/upload', data)
// }

// get order list
export function getOrderList(obj, data) {
  return obj.$http.get(base_url + '/order/info/get', {
    params: data
  })
}

// Get tracking information
export function getTracking(obj, data) {
  return obj.$http.get(base_url + '/order/detail', {
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

// Add brand
export function addBrand(obj, data) {
  return obj.$http.post(base_url + '/info/brand/add', data)
}

// Add company
export function addCompany(obj, data) {
  return obj.$http.post(base_url + '/info/company/add', data)
}

// Get company information
export function getCompanyInfo(obj, data) {
  console.log(obj.$http.get(base_url + '/info/company/get', {
    params: data
  }))
  return obj.$http.get(base_url + '/info/company/get', {
    params: data
  })
}

// Get brand information
export function getBrandInfo(obj, data) {
  return obj.$http.get(base_url + '/info/brand/get', {
    params: data
  })
}

// upload product image
export function uploadImage(obj, data) {
  obj.imageUpload.defaults.headers.Authorization = 'Bearer ' + localStorage.token;
  return obj.imageUpload.post(base_url + '/pro/mvo/product/image/upload', data);
}

// upload company image
export function uploadCompanyImage(obj, data) {
  obj.imageUpload.defaults.headers.Authorization = 'Bearer ' + localStorage.token;
  return obj.imageUpload.post(base_url + '/info/company/image/upload', data);
}

// upload brand image
export function uploadBrandImage(obj, data) {
  obj.imageUpload.defaults.headers.Authorization = 'Bearer ' + localStorage.token;
  return obj.imageUpload.post(base_url + '/info/brand/image/upload', data);
}


// Get orderList
export function getOrderLs(obj, data) {
  return obj.$http.get(base_url + '/info/brand/getAllByUserId', {
    params: data
  })
}
