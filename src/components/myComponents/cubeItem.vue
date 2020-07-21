<template>
  <div style="width: 100%; display: flex; justify-content: center;">
    <div v-if="!is_remove" class="container">

      <div @mouseover="mouseover" @mouseout="mouseout" class="product" @click="see_detail">
        <div v-if="!is_product" v-show="ishover" @click.stop="remove" class="removeIcon">
          <va-button
            small
            icon="ion-md-close ion"/>
        </div>

        <va-card
          :image= "img_url"
        >
          <template slot="header">
            <h5 class="mt-0 mb-0 title">{{ img_title }}</h5>
<!--            <div v-if="is_product">${{price}}</div>-->
            <div @click.stop="like_" v-if="is_product">
              <va-icon class="like" name='fa fa-heart-o' color="pink" v-if="!is_like"/>
              <va-icon class="like" name='fa fa-heart' color="pink" v-if="is_like"/>
            </div>
          </template>

          <span class="right-space" v-if="is_product">
            <label class="labels">Product Price: </label>
            <span class="text--highlighted">${{price}}</span>
          </span><br>
          {{img_intro}}

        </va-card>
      </div>

    </div>

    <va-modal
      v-model="showModal"
      size="large"
      :hideDefaultActions="true"
      :okText=" $t('modal.confirm') "
      :cancelText=" $t('modal.cancel') ">
      <template slot="header">
        <div style="position: relative; top: 0; margin-bottom: 10px;">
          <div class="title">Product Details</div>
          <div class="close_icon" :class="{hover : ishover}" @click="showModal=false" @mouseover="closeIconHover" @mouseout="closeIconOut"><va-icon name="fa fa-close"></va-icon></div>
        </div>
      </template>
      <slot>
        <product-detail v-on:close="close" :product_detail="product_detail" :usr_id="usr_id" role="bvo"/>
      </slot>
    </va-modal>

    <va-modal
      v-model="remove_confirm"
      size="small"
      title="Remove Confirmation"
      message="Are you sure to remove?"
      :okText=" $t('modal.confirm') "
      :cancelText=" $t('modal.cancel') "
      @ok="confirmRemove"
    />

  </div>
</template>

<script>
  import ProductDetail from "./productDetail";
  import {addWaitlist, getProductDetail, deleteCompany, deleteBrand} from '../../api/mvo.js'
  import {addWishlist, getWishlist, removeWsihlist,deleteBVO_stores,getBVOProductdetail} from "../../api/bvo.js";
  export default {
    name: "cube-item",
    components: {ProductDetail},
    created : function(){
      if(this.witId != 0){
        this.is_like=true;
        this.wishId = this.witId;
      }
    },
    props: {
      img_url: String,
      img_title: String,
      img_intro: String,
      usr_id: Number, // BVO id
      cube_id: Number, // id of product, company, brand, store
      type: String, // product, company, brand, store
      wholeData : Object, //for store, there's no api to get info by id, so you should use wholeData to transfer
      price : Number,//for store, need price
      witId : Number // for store, need check if it's in wishlist
    },
    computed: {
      is_product() {
        return this.type === 'product';
      }
    },
    data() {
      return {
        is_like: false,
        like_icon: false,
        dislike: true,
        isVisible: false,
        toastText: false,
        showModal: false,
        product_detail: {},
        is_remove: false,
        ishover: false,
        remove_confirm: false,
        wishId : 0
      }
    },
    methods: {
      like_() {
        this.is_like = !this.is_like;
        if (this.is_like === true) {
          // Show notification
          this.showToast(
            "You have starred this product! \n You can see it in the waillist.",
            {
              theme: 'info',
              icon: 'fa-heart',
              position: 'top-right',
              duration: 1500,
              fullWidth: false,
            },
          );
          // Tell back to add it to waillist
          addWishlist(this,{'dsrId' : this.usr_id, 'proId' : this.cube_id}).then(res=>{
            if(res.status == 500){
              console.log(res.message);
            }
            else{
              console.log(res);
              getWishlist(this,this.usr_id).then(response=>{
                if(response.status==200){
                  console.log(response);
                  var wlist = response.data.data;
                  for(var i=0;i<wlist.length;i++){
                    if(this.cube_id == wlist[i].pro_id){
                      this.wishId = wlist[i].wit_id;
                    }
                  }
                }
              })
            }
          });
        }
        else {
          removeWsihlist(this,{'witId' : this.wishId}).then(res=>{
            console.log(res);
            if(res.status==500){
              console.log(res.message)
            }
          })
        }
      },
      see_detail() {
        if (this.type === 'product') {
          /*
          this.product_detail = {
            'pro_id': this.cube_id,
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
          }; // delete in the future

           */
          getBVOProductdetail(this,this.cube_id
          ).then((result)=>{
            console.log(result);
            this.product_detail = result.data.data[0];
            this.showModal = true;
          });
        } else if (this.type === 'company') {
          this.$router.push({name: 'company-detail'})
        } else if (this.type === 'brand') {
          this.$router.push("/info/branddetail")
        } else if (this.type === 'store') { // store
          var permission = this.$store.state.user.permissions;

          for(var i=0;i<permission.length;i++){
            if(Number(permission[i].permissionId) == 5){
              this.$store.commit("changeStoreID",this.id);//save the storeId
              this.$store.commit("saveStoreInfo",this.wholeData); // save the store info because no api get info by id
              this.$router.push("BVO_store") // YYGX: change the path by yourself. It jump to the store detail page.
              return;
            }
          }
          this.showToast(
            "sorry, you have no authority to visit",
            {
              icon: 'fa-exclamation',
              position: 'top-right',
              duration: 2500,
              fullWidth: false,
            });
        } else {
          console.log('>> Error: the prop of cube_id should be product, company, brand or store!')
        }
      },
      mouseover : function () {
        this.ishover = true;
      },
      mouseout : function () {
        this.ishover = false;
      },
      remove() {
        this.remove_confirm = true;
      },
      confirmRemove() {
        this.remove_confirm = false;
        //this.is_remove = true;
        if (this.type === 'company') {
          deleteCompany(this, {manId: this.cube_id})
            .then((res)=>{
              console.log(res)
            })
        } else if (this.type === 'brand') {
          deleteBrand(this, {brdId: this.cube_id})
            .then((res)=>{
              console.log(res)
            })
        }  else if (this.type === 'store') { // store
          // YYGX: Use your api to delete

          deleteBVO_stores(this,{strId : this.cube_id})
            .then(res =>{
              if(res.status==200){
                this.$emit("deletestore",{strId : this.cube_id});
              }
              else{
                console.log(res.message);
              }
          });

        } else {
          console.log('>> Error: the prop of cube_id should be product, company, brand or store!')
        }
      },
      close(par) {
        this.showModal = false
      },
      closeIconHover : function () { //for product detail close
        this.ishover = true;
      },
      closeIconOut : function (){ //for product detail close
        this.ishover = false;
      },
    }
  }
</script>

<style lang="scss" scoped>
  .container {
    width: 80%;

    .va-card {
      margin: 0;
    }
  }

  .title {
    margin-right: 70%;
  }

  .like {
    float: right;
  }

  .container:hover {
    -webkit-transform: translateY(-3px);
    -ms-transform: translateY(-3px);
    transform: translateY(-3px);
    -webkit-box-shadow: 0 0 6px #999999;
    box-shadow: 0 0 6px #999999;
    -webkit-transition: all  ease-out;
    transition: all  ease-out;
    border-radius: 20px;
  }

  .product {
    position: relative;
  }

  .removeIcon {
    position: absolute;
    margin-left: 85%;
    margin-top: 1%;
    z-index: 3;
  }

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

  .right-space {
    margin-right: 10px;
  }

  .labels {
    font-weight: bold;
  }
</style>
