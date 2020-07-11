const base_url = "xxx";

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
  return obj.$http.get(path.join(base_url,"/bvo/product/sell/get "),{params:{strId:id}});
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
export function getProduct_detail(obj,id){
  return obj.$http.get(path.join(base_url,"/pro/bvo/product/detail/get"),{params:{proId:id}});
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
  return obj.$http.post(path.join(base_url,"/order/product/sell/delete "),{bsoId:id});
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
  return obj.imageUpload.post(path.join(base_url,"/info/store/image/upload "),formData) //imageUpload方法为新定义axios方法，在main.js中可见定义
}
