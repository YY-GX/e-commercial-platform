let ip = '39.106.57.246';
let port = '4396';
let base_url = 'http://' + ip + ':' + port;

export function getAuditRecords(obj){
  return obj.$http.get(base_url + "/admin/audit/get");
}

export function approveAudit(obj,data){
  return obj.$http.post(base_url + "/admin/audit/pass ",data);
}

export function refuseAudit(obj,data){
  return obj.$http.post(base_url + "/admin/audit/refuse ",data);
}

export function getDictionary(obj){
  return obj.$http.get(base_url + "/admin/dict/get");
}

export function updateDictionary(obj,data){
  return obj.$http.post(base_url + "/admin/dict/update",data);
}

export function addDictionary(obj,data){
  return obj.$http.post(base_url + "/admin/dict/add ",data);
}

export function removeDictionary(obj,data){
  return obj.$http.post(base_url + "/admin/dict/delete",data);
}

export function getUsers(obj){
  return obj.$http.get(base_url + "/admin/menu/get ");
}

export function addPermission(obj,data){
  return obj.$http.post(base_url + "/admin/menu/add  ",data);
}

export function removePermission(obj,data){
  return obj.$http.post(base_url + "/admin/menu/delete ",data);
}
