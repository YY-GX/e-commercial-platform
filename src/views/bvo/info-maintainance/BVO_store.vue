<template>
  <div>
    <div class="store_info">
      <div><va-button icon="fa fa-arrow-left" @click="backtoMain">back</va-button></div>
      <div class="content">
        <va-card title="store information">
          <div style="display: flex; flex-direction: row;">
            <div class="image" style="position: relative; display: flex; justify-content: center; width: 20%; height: 300px; border-radius: 20px;" @mouseover="imageIsHover=true" @mouseout="imageIsHover=false"  >
              <img style="border-radius: 20px; height: 80%; width: 80%;" :src="storeImageSrc"/><!-- 假图片 -->
              <!-- 遮罩层 -->
              <div v-show="imageIsHover" style="position: absolute; z-index: 2; background: rgba(0, 0, 0, 0.6); left: 20px; top: 0; width: 85%; height: 85%; border-radius: 20px; display: flex; flex-direction: column; justify-content: center; align-items: center;">
                <va-file-upload
                  type="single"
                  v-model="storePicture"
                />
              </div>

            </div>

            <div style="margin-left: 15px;">
              <label class="labels">name: </label>{{storeName}}<br>
              <label class="labels">platform: </label>{{platform}}<br>
              <label class="labels">status: </label>{{status}}<br>
              <label class="labels">description: </label>{{stsDc}}<br>


<!--              &lt;!&ndash; 展示的某一项数据  &ndash;&gt;-->
<!--              <div class="storeName" style="display: flex; flex-direction: row; justify-content: space-around; width: 300px;">-->
<!--                <div class="param">name:</div>-->
<!--                &lt;!&ndash; 数据 &ndash;&gt;-->
<!--                <div class="data">{{storeName}}</div>-->
<!--              </div>-->
<!--              &lt;!&ndash; 展示的某一项数据  &ndash;&gt;-->
<!--              <div class="platform" style="display: flex; flex-direction: row; justify-content: space-around; width: 300px;">-->
<!--                <div class="param">platform:</div>-->
<!--                &lt;!&ndash; 数据 &ndash;&gt;-->
<!--                <div class="data">{{platform}}</div>-->
<!--              </div>-->
<!--              &lt;!&ndash; 展示的某一项数据  &ndash;&gt;-->
<!--              <div class="status" style="display: flex; flex-direction: row; justify-content: space-around; width: 300px;">-->
<!--                <div class="param">status:</div>-->
<!--                &lt;!&ndash; 数据 &ndash;&gt;-->
<!--                <div class="data">{{status}}</div>-->
<!--              </div>-->
<!--              &lt;!&ndash; 展示的某一项数据  &ndash;&gt;-->
<!--              <div class="description" style="display: flex; flex-direction: row; justify-content: space-around; width: 300px;">-->
<!--                <div class="param">description:</div>-->
<!--                &lt;!&ndash; 数据 &ndash;&gt;-->
<!--                <div class="data">{{stsDc}}</div>-->
<!--              </div>-->
            </div>

          </div>
        </va-card>
      </div>
    </div>

    <div class="product_table" style="margin-top: 10px;">
      <div class="data_table">
        <va-card title="products on sell">
          <div>
            <va-data-table
              :fields="field"
              :data="products"
              :per-page="pageSize"
              @row-clicked="showDetail"
              clickable
            >
              <template slot="price" slot-scope="props">
                ${{props.rowData.price}}
              </template>

              <template slot="actions" slot-scope="props">
                <va-button icon="fa fa-trash" color="gray" @click.stop="remove(props.rowData)">
                  remove
                </va-button>
              </template>
            </va-data-table>
          </div>
        </va-card>
      </div>
    </div>
    <va-modal
      v-model="detailIsShowed"
      size="large"
      :hideDefaultActions="true"
      :okText=" $t('modal.confirm') "
      :cancelText=" $t('modal.cancel') ">
      <template slot="header">
        <div style="position: relative; top: 0; margin-bottom: 10px;">
          <div class="title">Product Details</div>
          <div class="close_icon" :class="{hover : ishover}" @click="detailIsShowed=false" @mouseover="closeIconHover" @mouseout="closeIconOut"><va-icon name="fa fa-close"></va-icon></div>
        </div>
      </template>
      <slot>
        <view-product-detail :product_detail="productDetail"></view-product-detail>
      </slot>
    </va-modal>
    <va-modal
      v-model="confirmRemoveShowed"
      title="confirm remove"
      size="medium"
      @ok="confirmRemove"
      :okText=" $t('modal.confirm') "
      :cancelText=" $t('modal.cancel') ">
      <div> are you sure to remove {{removeName}} (id: {{removeBsoId}})?</div>
    </va-modal>
  </div>
</template>

<script>
  import {getBVOProductdetail, getStore_product, removeProduct, uploadImage} from "../../../api/bvo.js";
  import VaDataTable from "vuestic-ui/src/components/vuestic-components/va-data-table/VaDataTable";
  import VaCard from "vuestic-ui/src/components/vuestic-components/va-card/VaCard";
  import VaButton from "vuestic-ui/src/components/vuestic-components/va-button/VaButton";
  import VaModal from "vuestic-ui/src/components/vuestic-components/va-modal/VaModal";
  import ViewProductDetail from "../../../components/myComponents/viewProductDetail";
  import VaIcon from "vuestic-ui/src/components/vuestic-components/va-icon/VaIcon";
  import VaFileUpload from "vuestic-ui/src/components/vuestic-components/va-file-upload/VaFileUpload";

  export default {
    components: {
      VaFileUpload,
      VaIcon, ViewProductDetail, VaModal, VaButton, VaCard, VaDataTable},
    created : function(){
      var obj = this.$store.state.bvo.storeInfo;
      console.log(obj);
      this.storeName = obj.storeName;
      this.platformType = parseInt(obj.platformType);
      this.strId  = parseInt(obj.strId);
      this.storeStsCd = parseInt(obj.storeStsCd) //api对接状态（1.刚授权 2.正常对接 3. token 过期 4. token 出错 5.网店关闭）
      this.stsDc = obj.stsDc //备注
      this.storeImageSrc = obj.imageUrl;

      getStore_product(this,this.strId).then(
        res => {
          if(res.status == 200){
            console.log(res);
            this.products = res.data.data;
            for(var i=0;i<this.products.length;i++){
              this.products[i].bsoId = parseInt(this.products[i].bsoId);
              this.products[i].price = parseFloat(this.products[i].price);
              this.products[i].proId = parseInt(this.products[i].proId);
              this.products[i].strId = parseInt(this.products[i].strId);
            }
          }
          else{
            console.log(res.message);
          }
        }
      )

      /*
      //假数据（待删除）
      this.products = [
        { "bsoId" : 1,
          "strId" : 1,
          "proId" : 1,
          "name" : "shoe",
          "price" : 11,
          "createTime" : "2020/5/3"
        },
        { "bsoId" : 1,
          "strId" : 1,
          "proId" : 1,
          "name" : "shoe",
          "price" : 11,
          "createTime" : "2020/5/3"
        },
        { "bsoId" : 1,
          "strId" : 1,
          "proId" : 1,
          "name" : "shoe",
          "price" : 11,
          "createTime" : "2020/5/3"
        },
        { "bsoId" : 1,
          "strId" : 1,
          "proId" : 1,
          "name" : "shoe",
          "price" : 11,
          "createTime" : "2020/5/3"
        },
        { "bsoId" : 1,
          "strId" : 1,
          "proId" : 1,
          "name" : "shoe",
          "price" : 11,
          "createTime" : "2020/5/3"
        },
        { "bsoId" : 1,
          "strId" : 1,
          "proId" : 1,
          "name" : "shoe",
          "price" : 11,
          "createTime" : "2020/5/3"
        },
        { "bsoId" : 1,
          "strId" : 1,
          "proId" : 1,
          "name" : "shoe",
          "price" : 11,
          "createTime" : "2020/5/3"
        },
      ];
      */
    },
    data : function(){
      return {
        storeName : "",
        platformType : 1,
        strId : 0,
        storePicture : [],
        storeStsCd : 0, //api对接状态（1.刚授权 2.正常对接 3. token 过期 4. token 出错 5.网店关闭）
        stsDc : "", //备注
        products : [], //借卖中的商品
        pageSize : 5,//分页每页的商品数
        field : [{
          name: 'name',
          width: '25%',
        }, {
          name: '__slot:price',
          title: 'price',
          width: '25%',
        }, {
          name: 'createTime',
          width: '30%',
        },
          {
            name: '__slot:actions',
            width: '20%'
          }
        ],
        detailIsShowed : false, //详细信息是否显示的flag
        productDetail : {}, //详细信息
        ishover : false, //弹窗的关闭按钮hover 的 flag
        removeName : '', //将移除商品的名称
        removeBsoId : 0, //将移除商品的id
        confirmRemoveShowed : false,
        imageIsHover : false,  //image hover 的 flag
        storeImageSrc : "" //商店图片url 尚未绑定img src
      }
    },
    watch: {
      storePicture : { //当storePicture数组变化（用户新上传时）
        handler : function(val,oldVal){
          if(val.length == 0){ //无文件
            return;
          }
          else{
            var index = val.length-1;//最新选择的文件
            var fileName = val[index].name;
            var fileSplit = fileName.split(".");
            var fileType = fileSplit[fileSplit.length - 1];
            fileType = fileType.toLowerCase();
            if(fileType == "png"||fileType == "jpg" || fileType == "jpeg"){
              console.log(fileName)

              var formData = new FormData();
              formData.append("file",val[index]);
              formData.append("strId",this.strId);
              console.log(uploadImage(this,formData));
              uploadImage(this,formData).then(
                res => {
                  console.log(res);
                  if(res.status == 200){
                    this.storeImageSrc = res.data.data;
                  }
                  else{
                    console.log(res.message)
                  }
                }
              )
            }
            else{
              console.log(fileType);
              this.showToast(
                "file is not an image, please choose an image file",
                {
                  icon: 'fa-exclamation',
                  position: 'top-right',
                  duration: 2500,
                  fullWidth: false,
                }
              );
              this.storePicture = [];
            }
          }
        },
        deep : true
      }
    },
    computed : {
      status : function(){
        switch (this.storeStsCd) {
          case 1:
            return "just Authorized";
          case 2:
            return "connected successfully";
          case 3:
            return "token outdated";
          case 4:
            return "token wrong";
          case 5:
            return "closed";
          default:
            return "status unknown"
        }
      },
      platform : function(){
        switch (this.platformType) {
          case 1:
            return "Amazon";
          case 2:
            return "ebay";
          default:
            return "platform unknown"
        }
      }
    },
    methods : {
        backtoMain(){
          this.$router.push({name : "BVO_info"})
        },

        showDetail : function (rowData) {
          var proId = rowData.proId;
          getBVOProductdetail(this,proId
          ).then((result)=>{
            console.log(result);
            this.productDetail = result.data.data[0];
            this.detailIsShowed = true;
          });

/*
          // 假数据 delete in the future
          this.productDetail = {
            'pro_id': proId,
            'imageUrl': "https://picsum.photos/300/200/?image=1043",
            'name': 'fengjinghua',
            'skuCd': '1e212312321232',
            'model': 'V2',
            'width': 1,
            'height': 2,
            'length': 3,
            'weight': 10,
            'retailPrice':  12,
            'minRetailPrice': 10,
            'warrantyDay': 60,
            'replenishmentPeriod': 10,
            'warranty': 'Never Never Never Never Never Never Never ',
          }
          */
        },
        closeIconHover : function () {
          this.ishover = true;
        },
        closeIconOut : function (){
          this.ishover = false;
        },
        remove : function(obj){
          this.confirmRemoveShowed = true;
          this.removeName = obj.name;
          this.removeBsoId = obj.bsoId;
        },
        confirmRemove : function(){

          removeProduct(this,this.removeBsoId).then(
            res =>{
              if(res.status == 200){
                var newProducts = [];
                for(var i=0;i<this.products.length;i++ ){
                  if(this.products[i].bsoId == this.removeBsoId){
                    continue;
                  }
                  else{
                    newProducts = newProducts.concat(this.products[i]);
                  }
                }
                this.products = newProducts;
                console.log(this.products.length);
              }
          })
        }
    }
  }
</script>

<style scoped>
  .hover {
    background-color: orangered;
    cursor: pointer;
  }

  .close_icon {
    position: absolute;
    top: 0;
    left: 100%;
    width: 15px;
    height: 15px;
    border-radius: 5px;
    display: flex;
    justify-content: center;
  }

  .labels {
    font-weight: bold;
  }
</style>
