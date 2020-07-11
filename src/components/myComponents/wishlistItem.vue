<template>
  <div v-if="!isRemoved" class="background" :class="{'hover':ishover}" @click="showDetails" @mouseover="mouseover" @mouseout="mouseout">
    <!-- 删除标签，防止点击事件冒泡（点击删除同时触发查看详细） -->
    <div  v-show="ishover" style="position: absolute; margin-left: 380px; margin-top: 0; z-index: 3;" @click.stop="remove"><va-icon style="color: grey;" name="fa fa-trash fa-1x"/></div>
    <div class="image"><img :src="imageUrl"/></div>
    <div class="info">
        <div class="name"><span>{{name}}</span></div>
        <div class="price"><span>${{price}}</span></div>
    </div>
    <va-modal
      v-model="showConfirm"
      size="small"
      title=" Remove Confirmation"
      :message="remindMessage"
      :okText=" $t('modal.confirm') "
      :cancelText=" $t('modal.cancel') "
      @ok="confirmRemove"
    />
    <va-modal
      v-model="showDetail"
      size="large"
      title=" Product Detail Information"
      hideDefaultActions="true"
      :okText=" $t('modal.confirm') "
      :cancelText=" $t('modal.cancel') ">
      <slot>
        <product-detail v-on:close="closeDetail" :product_detail="product_detail" :usr_id="usr_id"/>
      </slot>
    </va-modal>
  </div>
</template>

<script>
  import VaButton from "vuestic-ui/src/components/vuestic-components/va-button/VaButton";
  import productDetail from "./productDetail"
  export default {
    name : 'wishlistItem',
    components: {VaButton,productDetail},
    props : {
      imageUrl : String,
      name : String,
      price : Number,
      wishListId : Number,
      productId : Number
    },
    data : function () {
      return {
        isRemoved : false,
        ishover : false,
        remindMessage: "are you sure to remove "+this.name+" from wish list?",
        showConfirm : false,
        showDetail : false,
        product_detail : {},
        //deleteLater
        usr_id : 1
      }
    },
    methods : {
      isEmptyObj : function(obj){
        for(var key in obj){
          return false;
        }
        return true;
      },
      showDetails : function () {
        //使用detail 组件(yy)
        /*若暂未拉取product_detail，请求api
        if(this.isEmptyObj(this.product_detail)){
          this.$http({
          method: "get",
          url: "/mvo/product/detail/get",
          data() {
            proId: this.productId
          }
        }).then((result)=>{
          console.log(result);
          this.product_detail = result.data;
        });
        }
        */
        this.product_detail = {
          'pro_id': this.productId,
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
        } // delete in the future
        console.log(this.product_detail)
        this.showDetail = true;
      },
      closeDetail : function(){
        this.showDetail = false;
      },
      remove : function(){
        this.showConfirm = true
      },
      confirmRemove : function(){
        //调用删除接口
        /*
        axios.post("/bvo/wishlist/delete ",{witId : this.wishListID})
          .then(function (response) {
            this.isRemoved = true;
            this.showConfirm = false;
          })

         */
        this.showConfirm = false;
      },
      giveOutId : function(){
        this.$emit("select_wish",this.productId)
      },
      mouseover : function () {
        this.ishover = true;
      },
      mouseout : function () {
        this.ishover = false;
      }
    }
  }
</script>

<style scoped>
  .image {
    margin: 0;
    width: 250px;
    height: 200px;
  }

  .image img {
    width: 100%;
    height: 100%;
    border-bottom-left-radius: 20px;
    border-top-left-radius: 20px;
    display: inline-block;
    vertical-align: middle;
  }

  .background {
    background-color: white;
    border-radius: 20px;
    display: flex;
    flex-direction: row;
    width: 400px;
  }

  .info {
    display: flex;
    flex-direction: column;
    border-left-style: solid;
    border-width: 1px;
    border-color: #0e4ac4;
    width: 150px;
  }

  .name {
    height: 130px;
    text-align: center;
    line-height: 150px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 30px;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  }

  .price {
    height: 70px;
    text-align: center;
  }

  .hover {
    -webkit-transform: translateY(-3px);
    -ms-transform: translateY(-3px);
    transform: translateY(-3px);
    -webkit-box-shadow: 0 0 10px #999999;
    box-shadow: 0 0 10px #999999;
    -webkit-transition: all  ease-out;
    transition: all  ease-out;
    border-radius: 20px;
    cursor: pointer;
  }
</style>
