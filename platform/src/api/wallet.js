/*
* Author: Yue Yang
* Module: Wallet
* */

let ip = '39.106.57.246';
let port = '4396';
let base_url = 'http://' + ip + ':' + port;

// Login
export function login(obj, data) {
  return obj.$http.post(base_url + '/wallet/login', data)
}

// Register wallet
export function register(obj, data) {
  return obj.$http.post(base_url + '/wallet/register', data)
}

// Get wallet basic information
export function getBasicInfo(obj, data) {
  return obj.$http.get(base_url + '/wallet/info/get', {
    params: data
  })
}

// Get all transactions
export function getTransaction(obj, data) {
  return obj.$http.get(base_url + '/wallet/transaction', {
    params: data
  })
}

// Edit wallet
export function editBasicInfo(obj, data) {
  return obj.$http.post(base_url + '/wallet/info/update', data)
}
