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

// recharge
export function recharge(obj, data) {
  return obj.$http.post(base_url + '/wallet/recharge', data)
}

// withdraw
export function withdraw(obj, data) {
  return obj.$http.post(base_url + '/wallet/withdraw', data)
}

/*
pay
data : {saoId : xx,
        walletId : xx
       }
 */

export function payInWallet(obj,data){
  return obj.$http.post(base_url + '/order/pay ', data)
}

export function rechargeWallet(obj,data){
  return obj.$http.post(base_url + "/wallet/recharge", data)
}

export function withdrawWallet(obj,data){
  return obj.$http.post(base_url + "/wallet/withdraw", data)
}
