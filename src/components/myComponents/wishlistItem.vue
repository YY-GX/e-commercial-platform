<template>
  <div v-if="!isRemoved" class="background" :class="{'hover':ishover}" @click="showDetails" @mouseover="mouseover" @mouseout="mouseout">
    <!-- 删除标签，防止点击事件冒泡（点击删除同时触发查看详细） -->
    <div  v-show="ishover" style="position: absolute; margin-left: 90%; margin-top: 0; z-index: 3;" @click.stop="remove"><va-icon style="color: grey;" name="fa fa-trash fa-1x"/></div>
    <div class="image"><img :src="imageUrl"/></div>
    <div class="info">
      <span><label class="labels">Product Name: </label>{{name}}</span>
      <br>
      <span class="right-space"><label class="labels">Product Price: </label>
            <span class="text--highlighted">${{price}}</span>
      </span>

<!--        <div class="name">{{name}}</div>-->
<!--        <div class="price">${{price}}</div>-->
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
        <product-detail v-on:close="closeDetail" :product_detail="product_detail" :usr_id="dsrId"/>
      </slot>
    </va-modal>
  </div>
</template>

<script>
  import VaButton from "vuestic-ui/src/components/vuestic-components/va-button/VaButton";
  import productDetail from "./productDetail"
  import {getBVOProductdetail} from "../../api/bvo.js";
  export default {
    name : 'wishlistItem',
    components: {VaButton,productDetail},
    props : {
      imageUrl : String,
      name : String,
      price : Number,
      wishListId : Number,
      productId : Number,
      dsrId : Number
    },
    data : function () {
      return {
        isRemoved : false,
        ishover : false,
        remindMessage: "are you sure to remove "+this.name+" from wish list?",
        showConfirm : false,
        showDetail : false,
        product_detail : {},
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
        getBVOProductdetail(this,this.productId
        ).then((result)=>{
          console.log(result);
          this.product_detail = result.data.data[0];
          this.showDetail = true;
        });
        /*
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

         */
      },
      closeDetail : function(){
        this.showDetail = false;
      },
      remove : function(){
        this.showConfirm = true
      },
      confirmRemove : function(){
        this.$emit("remove_wishlist",{witId : this.wishListId});
        this.showConfirm = false;
      },
      giveOutId : function(){
        this.$emit("select_wish",{witId : this.wishListId})
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
    width: 40%;
    height: 100%;
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
    border-style: solid;
    border-width: 1px;
    border-color: #e3eaeb;
    width: 90%;
    height: 100%;
  }

  .info {
    display: flex;
    flex-direction: column;
    padding-left: 5px;
    border-left-style: solid;
    border-width: 1px;
    border-color: #e3eaeb;
    width: 60%;
  }

  .name {
    width: 100%;
    height: 60%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 30px;
    color: #6c7fee;
    font-family: "Source Sans Pro";
    font-weight: 700;
    text-transform: uppercase;
  }

  .price {
    height: 40%;
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

  .labels {
    font-weight: bold;
  }
</style>
