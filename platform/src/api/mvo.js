import https from 'https';

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
  // const instance = obj.$http.create({
  //   httpsAgent: new https.Agent({
  //     rejectUnauthorized: false
  //   })
  // });
  // console.log(instance);
  // console.log(instance.post(base_url + '/oauth/token', data));
  console.log(obj.$http.post(base_url + '/oauth/token', data,{
    httpsAgent: new https.Agent({
      rejectUnauthorized: false
    })
  }));
  const httpsAgent = new https.Agent({
    rejectUnauthorized: false, // (NOTE: this will disable client verification)
    cert: fs.readFileSync("./usercert.pem"),
    key: fs.readFileSync("./key.pem"),
    passphrase: "YYY"
  })
  return obj.$http.post(base_url + '/oauth/token', data,{ httpsAgent })
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

// Add company
export function addCompany(obj, data) {
  return obj.$http.post(base_url + '/info/brand/add', data)
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
