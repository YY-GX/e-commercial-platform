let ip = '39.106.57.246';
let port = '4396';
let base_url = 'http://' + ip + ':' + port;

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
  return obj.$http.get(base_url + "/info/bvo/get",{params:{'userId':id}});
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
  return obj.$http.post(base_url+"/info/bvo/update",data);
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
  return obj.$http.get(base_url+"/info/store/get",{params:{'dsrId':id}});
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
  “data”: {
            null
            }
}
 */
export function addBVO_stores(obj,data){
  return obj.$http.post(base_url+"/info/store/add",data);
}


/*
接口12. 删除网店  post  [BVO_main]
data : {strId : id}
response : {
     “status”: 200, （成功返回 200，出现异常返回 500）
  “msg”: “success!”,
  “data”: null
}
 */
export function deleteBVO_stores(obj,data){
  return obj.$http.post(base_url+"/info/store/delete",data);
}

/*
接口12. 获得商城商品  get  [BVO_shop]
data : null
response : {
     “status”: 200, （成功返回 200，出现异常返回 500）
  “msg”: “success!”,
  “data”: {proId 商品 ID
            name 商品名称
            retailPrice 建议零售价
            minRetailPrice 最低零售价
            imageUrl 商品图片地址
            description 描述
            }
}
 */
export function getAll_shop_product(obj){
  return obj.$http.get(base_url+"/pro/bvo/product/get");
}

/*
接口11. 添加商品进心愿单  post  [BVO_shop]
data : {dsrId : BVOId
        proId : productId
        }
response : {
     “status”: 200, （成功返回 200，出现异常返回 500）
  “msg”: “success!”,
  “data”:  null
}
 */
export function addWishlist(obj, data) {
  return obj.$http.post(base_url + '/pro/bvo/wishlist/add', data)
}


/*
接口11. 商品从心愿单删除  post  [BVO_shop]
data : {witId : wishlistId
}
response : {
“status”: 200, （成功返回 200，出现异常返回 500）
“msg”: “success!”,
“data”:  null
}
*/
export function removeWsihlist(obj, data) {
  return obj.$http.post(base_url + '/pro/bvo/wishlist/delete', data)
}

/*
接口12. 获取心愿单商品  get  [BVO_shop]
data : dsrId      BVOId
response : {
“status”: 200, （成功返回 200，出现异常返回 500）
“msg”: “success!”,
“data”:  {witId 心愿单 ID
            proId 商品 ID
            name 商品名称
            retailPrice 建议零售价
            minRetailPrice 最低零售价
            imageUrl 商品图片地址 }
}
*/
export function getWishlist(obj, data) {
  return obj.$http.get(base_url + '/pro/bvo/wishlist/get', {params : {dsrId : data}})
}

/*
接口6. 购买商品  post  [BVO_shop]
data: {
          dsrId: this.usr_id,
          proId: this.pro_id,
          productAmount: this.num_pro
      }
response : {
“status”: 200, （成功返回 200，出现异常返回 500）
“msg”: “success!”,
“data”:  null
*/
export function buyProduct(obj, data) {
  return obj.$http.post(base_url + '/order/product/buy', data)
}

/*
接口6. 推送商品  post  [BVO_shop]
data: {
          strId  网店 ID
          proId 商品 ID
          price 商品价格
      }
response : {
“status”: 200, （成功返回 200，出现异常返回 500）
“msg”: “success!”,
“data”:  null
*/
export function pushProduct(obj, data) {
  return obj.$http.post(base_url + '/order/product/sell', data)
}


/*
接口8.获取bvo某一网店进行借卖的商品 get [BVO_store]
id : strId  网店id
response : {
     “status”: 200, （成功返回 200，出现异常返回 500）
  “msg”: “success!”,
  “data”: { "bsoId" : xx 借卖商品ID
              "strId" : xx 商店ID
             “proId" : xx 商品 ID
              "name" : xx 商品名称
              "price" : xx 商品借卖单价
              "creatTime" : xx 创建借卖时间
            }
}
 */
export function getStore_product(obj,id){
  return obj.$http.get(base_url + "/order/product/sell/get",{params:{strId:id}});
}


/*
接口11.获取商品的详细信息 get [BVO_store]
id : proId  商品id
response : {
     “status”: 200, （成功返回 200，出现异常返回 500）
  “msg”: “success!”,
  “data”: { name 商品名称
              skuCd 商品 sku 编码
              model 型号
              width 宽
              height 高
              length 长
              weight 重量
              retailPrice 建议零售价
              minRetailPrice 最低零售价
              warrantyDay 保修期（年/月/日）
              replenishmentPeriod 补货期
              warranty 保修政策说明
              description 商品描述
              imageUrl 商品图片地址
            }
}
 */
export function getBVOProductdetail(obj,id){
  console.log("hello");
  return obj.$http.get(base_url+"/pro/bvo/product/detail",{params:{proId:id}});
}

/*
接口9.删除一借卖商品 post [BVO_store]
id : bsoId  借卖商品id
response : {
     “status”: 200, （成功返回 200，出现异常返回 500）
  “msg”: “success!”,
  “data”: null
}
 */
export function removeProduct(obj,id){
  return obj.$http.post(base_url +"/order/product/sell/delete ",{bsoId:id});
}


/*
接口16.上传商品照片 post [BVO_store]
formData  包含file 和 strId
response : {
     “status”: 200, （成功返回 200，出现异常返回 500）
  “msg”: “success!”,
  “data”: {imageUrl : xx}
}
 */
export function uploadImage(obj,formData){
  obj.imageUpload.defaults.headers.Authorization = "Bearer " + localStorage.token;
  console.log(obj.imageUpload.defaults.headers);
  return obj.imageUpload.post(base_url + "/info/store/image/upload ",formData) //imageUpload方法为新定义axios方法，在main.js中可见定义
}


/*
接口8.删除bvo心愿单商品 post [BVO_wishlist]
data : {witId : xx wishlist id}
response : {
     “status”: 200, （成功返回 200，出现异常返回 500）
  “msg”: “success!”,
  “data”: null
}
 */
export function remove_Wishlist(obj,data){
  return obj.$http.post( base_url+"/pro/bvo/wishlist/delete",data);
}
