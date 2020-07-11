const base_url = "xxx";

/*
接口9.获取bvo基本信息 get [BVO_main]
id : userid  (from vuex)
response : {
     “status”: 200, （成功返回 200，出现异常返回 500）
  “msg”: “success!”,
  “data”: {“dsrId”: xx,   (保存至vuex)
              "name" : xx
            }
}
 */
export function getBVO_basic(obj,id){
  return obj.$http.get(path.join(base_url,"/bvo/info/get"),{params:{userId:id}});
}

/*
接口10。更改bvo基本信息  post [BVO_main]
data : {dsrID: xx
        name: xx
       }
response : {
     “status”: 200, （成功返回 200，出现异常返回 500）
  “msg”: “success!”,
  “data”: null
 */
export function editBVO_basic(obj,data){
  return obj.$http.post(path.join(base_url,"/bvo/info/update"),data);
}

/*
接口11.获得bvo stores  get [BVO_main]
id : dsrId
response : {
     “status”: 200, （成功返回 200，出现异常返回 500）
  “msg”: “success!”,
  “data”: [{
            strId : xx
            platformType : xx
            storeName : xx
            storeStsCd : xx api对接状态
            stsDc : xx 备注
            imageUrl : xx 图片地址
            }]
}

 */
export function getBVO_stores(obj,id){
  return obj.$http.get(path.join(base_url,"/bvo/store/get"),{params:{'dsrId':id}});
}

/*
接口12. 添加网店  post  [BVO_main]
data : {
  dsrId : xx ,
  platformType : xx,
  storeName : xx
}
response : {
     “status”: 200, （成功返回 200，出现异常返回 500）
  “msg”: “success!”,
  ?“data”: {
            strId : xx
            platformType : xx
            storeName : xx
            storeStsCd : xx api对接状态
            stsDc : xx 备注
            }
}
 */
export function addBVO_stores(obj,data){
  return obj.$http.post(path.join(base_url,"/bvo/store/add"),data);
}

