<template>
  <div class="pdContainer">

    <div class="pdContainer__image">
      <img :src=img_url alt="Product Image" class="img">
    </div>

    <div class="pdContainer__text">
      <va-card
        stripe="info">
        <template slot="header" class="py-2">
          <va-icon class="right-space" name="fa fa-shopping-cart" color="info"/>
          <h5 class="mt-0 mb-0">{{ name }}</h5>
        </template>
        <va-badge class="mb-2 py-1 badge" color="dark" outline>Sku cd: {{skuCd}}</va-badge>
        <va-badge class="mb-2 py-1 badge" color="dark" outline>Model: {{model}}</va-badge>
        <br>
        <span class="right-space"><label class="labels">RetailPrice: </label>
            <span class="text--highlighted">${{minRetailPrice}}</span>
          </span>
        <label class="labels"></label>[<s>${{retailPrice}}</s>]
        <br>
        <label class="labels">category: </label>{{category}}<br>
        <label class="labels">Size: </label>{{width}} × {{height}}<br>
        <label class="labels">Weight: </label>{{weight}}<br>
        <hr>
        <span class="small-title">Other information</span> <br>
        <label class="labels">ReplenishmentPeriod: </label>{{replenishmentPeriod}}<br>
        <label class="labels">WarrantyDay: </label>{{warrantyDay}}<br>
        <label class="labels">Warranty: </label>{{warranty}}<br>

        <hr>
        <label class="labels">Numbers you want: </label>
        <va-input
          class="input"
          v-model="num_pro"
          placeholder="Type a integer..."
          :error="!is_number"
          error-messages="Please enter an integer number!"
        />

        <va-button @click="addOrder" class="btn"> Buy me! </va-button>

        <!--          {{ $t('cards.contentTextLong') }}-->
      </va-card>

    </div>

    <va-modal
      v-model="showPush"
      size="medium"
      :hideDefaultActions="true"
      :okText=" $t('modal.confirm') "
      :cancelText=" $t('modal.cancel') "
    >
      <template slot="header">
        <div style="position: relative; top: 0; margin-bottom: 10px; display: flex; flex-direction: row; justify-content: space-between;">
          <div class="title">push Confirmation</div>
          <div class="close_icon" :class="{hover : ishover}" @click="showPush=false" @mouseover="closeIconHover" @mouseout="closeIconOut"><va-icon name="fa fa-close"></va-icon></div>
        </div>
      </template>
      <template>
        <div class="loading" v-show="isloading">
          <hollow-dots-spinner
            :animation-duration="1000"
            :size="80"
            color="skyblue">
          </hollow-dots-spinner>
        </div>
        <div v-show="!isloading">
          <div class="selectStore">please select one store to push
            <va-select
              label="platform"
              v-model="pushStore"
              textBy="storeName"
              :options="storelist"
            />
          </div>
          <div class="inputPrice">please input the price you want to sell
            <va-input v-model="sellPrice"
                      :error="!price_is_number"
                      error-messages="Please enter an integer number!"
            >
              <va-icon
                slot="prepend"
                color="gray"
                name="fa fa-usd"
              />
            </va-input>
          </div>
        </div>
        <div class="confirmPush"><va-button @click="confirmPush">push</va-button></div>
      </template>
    </va-modal>

  </div>
</template>

<script>
  import VaModal from "vuestic-ui/src/components/vuestic-components/va-modal/VaModal";
  import VaSelect from "vuestic-ui/src/components/vuestic-components/va-select/VaSelect";
  import VaInput from "vuestic-ui/src/components/vuestic-components/va-input/VaInput";
  import VaButton from "vuestic-ui/src/components/vuestic-components/va-button/VaButton";
  import HollowDotsSpinner from "epic-spinners/src/components/lib/HollowDotsSpinner";
  import {getBVO_stores,buyProduct, pushProduct} from "../../api/bvo.js";
  export default {
    name: "product-detail",
    components: {HollowDotsSpinner, VaButton, VaInput, VaSelect, VaModal},
    props: {
      usr_id: Number, // BVO id
      product_detail: Object // details of product. The construct can be found in line ~106 in productItem.vue
    },
    data() {
      return {
        pro_id: this.product_detail.pro_id,

        img_url: this.product_detail.image_url,
        name: this.product_detail.NAME,
        skuCd: this.product_detail.sku_cd,
        model: this.product_detail.model,
        category : this.product_detail.category_name,
        width: this.product_detail.width,
        height: this.product_detail.height,
        weight: this.product_detail.weight,
        retailPrice: this.product_detail.retail_price,
        minRetailPrice: this.product_detail.min_retail_price,
        warrantyDay: this.product_detail.warranty_day,
        replenishmentPeriod: this.product_detail.replenishment_period,
        warranty: this.product_detail.warranty,

        num_pro: null,
        is_number: true,
        showPush : false,
        isloading : false,
        storelist : [{'id':1}],
        sellPrice : null,
        price_is_number : true,
        pushStore : 0,
        ishover : false

      }
    },
    methods: {
      addOrder() {
        this.is_number = true;
        if (!(this.num_pro % 1 === 0) || this.num_pro === null) {
          this.is_number = false
        } else {
          this.showPush = true;
          this.isloading = true;
          getBVO_stores(this,this.usr_id).then(res=>{
            if(res.status = 200){
              console.log(res);
              var list = res.data.data;
              this.storelist = [];
              for(var i=0;i<list.length;i++){
                this.storelist[i] = {'id':parseInt(list[i].strId),'storeName': list[i].storeName};
              }
              this.isloading = false;
              console.log(this.storelist);
            }
            else{
              console.log(res.message);
            }
          })
        }
          /*
          console.log(123);
          this.$http({
            method: "post",
            url: "/bvo/product/buy",
            data: {
              dsrId: this.usr_id,
              proId: this.pro_id,
              productAmount: this.num_pro
            }
          }).then((result)=>{
            console.log(result);
          });


          this.showToast(
            "You have ordered this product! \n You can see it in the order management page.",
            {
              theme: 'info',
              icon: 'fa-cart-plus',
              position: 'top-right',
              duration: 2500,
              fullWidth: false,
            },
          );
          this.$emit('close', null)
          this.num_pro = null;
        }

           */
      },



      confirmPush : function(){
        this.price_is_number = true;
        if (!(this.sellPrice % 1 === 0) || this.sellPrice === null) {
          this.price_is_number = false
        } else {
          if(this.pushStore == 0){
            this.showToast(
              "You must select one store to push, please check",
              {
                icon: 'fa-exclamation',
                position: 'top-right',
                duration: 2500,
                fullWidth: false,
              }
            )
          }
          else{
            console.log(this.pushStore);
            buyProduct(this,{
              'dsrId': this.usr_id,
              'proId': this.pro_id,
              'productAmount': this.num_pro
            }).then(res=>{
              if(res.status == 200){
                console.log(res);
                pushProduct(this,{
                  'strId' : this.pushStore.id,
                  'proId' : this.pro_id,
                  'price' : this.sellPrice
                }).then(response =>{
                  console.log(response);
                  if(response.status == 200){
                    this.showToast(
                      "You have ordered this product! \n You can see it in the order management page.",
                      {
                        theme: 'info',
                        icon: 'fa-cart-plus',
                        position: 'top-right',
                        duration: 2500,
                        fullWidth: false,
                      },
                    );
                    this.showPush = false;
                    this.$emit('close', null);
                    this.num_pro = null;
                    this.pushStore = null;
                    this.sellPrice = null;
                  }
                  else{
                    console.log(response.message)
                  }
                })
              }
              else{
                console.log(res.message);
              }
            })
          }
        }
      },
      closeIconHover : function () {
        this.ishover = true;
      },
      closeIconOut : function (){
        this.ishover = false;
      }
    }
  }
</script>

<style scoped lang="scss">

  .pdContainer {
    display: flex;
    flex-direction: row;

    &__image {
      vertical-align: top;
      width: 40%;
      margin-right: 10px;

      img {
        width: 100%;
        height: auto;
      }
    }

    &__text {
      width: 60%;

      @media (max-width: 620px) {
        width: 100%;
      }
    }
  }

  .img {
    border-radius: 2.5%;
  }

  .right-space {
    margin-right: 10px;
  }

  .labels {
    font-weight: bold;
  }

  .small-title {
    font-style: italic;
    text-decoration: underline;
  }

  .btn {
    margin-left: 20vw;
  }

  .input {
    width: 15vw;
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

  .title {
    font-size: 30px;
  }
</style>
