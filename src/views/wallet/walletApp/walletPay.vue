<template>
  <div>
    <va-card
      class="flex lg12"
      stripe="info"
      style="margin-bottom: 2vh; width: 1000px;"
    >
      <template slot="header">
        <va-icon name="fa fa-info mr-3" color="info"/>
        <h4 class="mt-0 mb-0"> order detail </h4>
      </template>
      <div class="content_container" style="display: flex; flex-direction: column;">
        <div class="order_basic" style="display: flex; flex-direction: row; justify-content: right;">
          <div style="margin-right: 50px;">orderNo: {{orderNo}}</div>
          <div>create time: {{createDate}}</div>
        </div>
        <div class="pdContainer" style="display: flex; flex-direction: row;">
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
            <span class="text--highlighted">￥{{minRetailPrice}}</span>
          </span>
              <label class="labels"></label>[<s>￥{{retailPrice}}</s>]
              <br>
              <label class="labels">category: </label>{{category}}<br>
              <label class="labels">Size: </label>{{width}} × {{height}}<br>
              <label class="labels">Weight: </label>{{weight}}<br>
              <hr>
              <span class="small-title">Other information</span> <br>
              <label class="labels">ReplenishmentPeriod: </label>{{replenishmentPeriod}}<br>
              <label class="labels">WarrantyDay: </label>{{warrantyDay}}<br>
              <label class="labels">Warranty: </label>{{warranty}}<br>
            </va-card>
          </div>
        </div>
        <div class="pay_info" style="display: flex; flex-direction: row; justify-content: right;">
          <div class="amount">amount: {{amount}}</div>
          <div class="total">total: ￥{{total}}</div>
          <div><va-button @click="pay">PAY</va-button></div>
        </div>
      </div>
    </va-card>
    <va-modal
      v-model="showAlert"
      size="small"
      title="money not enough"
      :message="alertMessage"
      okText="recharge"
      :cancelText=" $t('modal.cancel') "
      @ok="recharge"
    />
    <va-modal
      v-model="showSuccess"
      size="small"
      title="Success"
      :message="successMessage"
      hide-default-actions="true"
    />
  </div>
</template>

<script>
  import VaCard from "vuestic-ui/src/components/vuestic-components/va-card/VaCard";
  import VaButton from "vuestic-ui/src/components/vuestic-components/va-button/VaButton";
  import {getBVOProductdetail} from "../../../api/bvo";
  import {getBasicInfo, payInWallet} from "../../../api/wallet";
  import VaModal from "vuestic-ui/src/components/vuestic-components/va-modal/VaModal";
  export default {
    name : "wallet-pay",
    components: {VaModal, VaButton, VaCard},
    created : function(){
      console.log(this.$store.state.wallet.orderInfo);
      console.log(this.$store.state.wallet.productDetail);
      this.orderInfo = this.$store.state.wallet.orderInfo;
      this.orderNo = this.orderInfo.orderNo;
      this.createDate = this.orderInfo.createDate;
      this.amount = this.orderInfo.productAmount;
      this.product_detail = this.$store.state.wallet.productDetail;
      this.pro_id = this.product_detail.pro_id;
      this.img_url = this.product_detail.image_url;
      this.name=this.product_detail.NAME;
      this.skuCd = this.product_detail.sku_cd;
      this.model = this.product_detail.model;
      this.category = this.product_detail.category_name;
      this.width = this.product_detail.width;
      this.height = this.product_detail.height;
      this.weight = this.product_detail.weight;
      this.retailPrice = this.product_detail.retail_price;
      this.minRetailPrice = this.product_detail.min_retail_price;
      this.warrantyDay = this.product_detail.warranty_day;
      this.replenishmentPeriod = this.product_detail.replenishment_period;
      this.warranty = this.product_detail.warranty;
      this.amount = this.orderInfo.productAmount;
    },
    data : function () {
      return {
        product_detail : {},
        orderInfo : {},
        pro_id: 0,
        img_url: "",
        name: "",
        skuCd: "",
        model: "",
        category: "",
        width: "",
        height: "",
        weight: "",
        retailPrice: "",
        minRetailPrice: "",
        warrantyDay: "",
        replenishmentPeriod: "",
        warranty: "",
        amount: 0,
        orderNo: "",
        createDate: "",
        showAlert : false,
        availableMoney : 0,
        showSuccess : false,
        lastSeconds : 5,
        timer : null
      }
    },
    computed :{
      total : function(){
        return this.minRetailPrice * this.amount;
      },
      alertMessage : function(){
        return "your available money in this account is not enough(remaining ￥"+this.availableMoney +") please recharge";
      },
      successMessage : function(){
        return "your payment has been finished, after "+ this.lastSeconds + " seconds we will go back to order management"
      }
    },
    methods : {
      pay : function(){
        var walletId = this.$store.state.wallet.walletId;
        var MoneyData = {"walletId" : walletId}
        getBasicInfo(this,MoneyData).then(res => {
          console.log(res);
          this.availableMoney = parseFloat(res.data.data.availableMoney);
          if(this.availableMoney >= this.total){
            window.localStorage['token'] = this.$store.state.user.token;
            payInWallet(this,{"saoId":this.orderInfo.saoId,"walletId":walletId}).then(response => {
              this.showSuccess = true;
              this.timer = setInterval(()=>{
                if(this.lastSeconds > 0){ //循环定时，当lastSeconds减至0停止
                  this.lastSeconds--;
                }else{
                  this.showSuccess = false;
                  clearInterval(this.timer);
                  this.timer = null;
                  //跳转的页面写在此处
                  this.$router.push({name : 'BVO_order'});
                }
              },1000)
            })
          }
          else{
            this.showAlert = true;
          }
        })
      },
      recharge : function(){
        this.showAlert = false;
        this.$router.push({name : "wallet-bill"})
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
        border-style: solid;
        border-width: 1px;
        border-color: #e3eaeb;
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

  .amount {
    display: flex;
    align-items: center;
    font-weight: bold;
    font-size: 20px;
    margin-right: 50px;
  }

  .total {
    display: flex;
    align-items: center;
    font-weight: bold;
    font-size: 20px;
    margin-right: 20px;
  }
</style>
