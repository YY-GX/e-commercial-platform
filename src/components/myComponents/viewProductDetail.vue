<template>
  <div class="container">

    <div class="container__image">
      <img :src=img_url alt="Product Image" class="img">
    </div>

    <div class="container__text">
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

        <label class="labels">Size: </label>{{width}} × {{height}}<br>
        <label class="labels">Weight: </label>{{weight}}<br>
        <hr>
        <span class="small-title">Other information</span> <br>
        <label class="labels">ReplenishmentPeriod: </label>{{replenishmentPeriod}}<br>
        <label class="labels">WarrantyDay: </label>{{warrantyDay}}<br>
        <label class="labels">Warranty: </label>{{warranty}}<br>
        <!--
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
        -->
        <!--          {{ $t('cards.contentTextLong') }}-->
      </va-card>

    </div>

  </div>
</template>

<script>
  export default {
    name: "view-product-detail",
    props: {
      //usr_id: Number, // BVO id
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

        //num_pro: null,
        //is_number: true
      }
    },
    methods: {
      /*
      addOrder() {
        this.is_number = true
        if (!(this.num_pro % 1 === 0) || this.num_pro === null) {
          this.is_number = false
        } else {
          console.log(123)
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
      }
       */
    }
  }
</script>

<style scoped lang="scss">

  .container {
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
      display: inline-block;
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
</style>
