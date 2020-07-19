<template>
    <div class="row" style="width: 600px;">

      <div class="container__image flex xs12 md5">
        <img :src=img_url alt="Product Image" class="img" style="width: 100%; height: 70%;">
      </div>

      <div class="container__text flex xs12 md6 offset--md1">
        <va-card
          stripe="info">
          <template slot="header" class="py-2">
            <va-icon class="right-space" name="fa fa-shopping-cart" color="info"/>
            <h5 class="mt-0 mb-0">{{ name }}</h5>
          </template>
          <va-badge class="mb-2 py-1 badge" color="dark" outline>Sku cd: {{skuCd}}</va-badge>
          <va-badge class="mb-2 py-1 badge" color="dark" outline>Model: {{model}}</va-badge>
          <br>
          <span class="small-title">Basic information</span> <br>
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

          <div v-if="is_show">
            <hr>
            <label class="labels">Numbers you want: </label>
            <va-input
              class="input"
              v-model="num_pro"
              placeholder="Type a integer..."
              :error="!is_number"
              error-messages="Please enter an integer number!"
            />

            <div class="row">
              <div class="flex lg5 offset--md2">
                <va-button @click="cancel" small flat color="gray" class="flex lg7 offset--lg5"> Cancel </va-button>
              </div>
              <div class="flex lg5">
                <va-button small @click="addOrder" > Order me! </va-button>
              </div>
            </div>

          </div>


<!--          {{ $t('cards.contentTextLong') }}-->
        </va-card>

      </div>

    </div>
</template>

<script>
  import {buyProduct} from '../../api/mvo.js'
    export default {
      name: "product-detail",
      props: {
        usr_id: Number, // BVO id
        role: String, // bvo or mvo
        product_detail: Object // details of product. The construct can be found in line ~106 in productItem.vue
      },
      data() {
        return {
          pro_id: this.product_detail.pro_id,

          img_url: this.product_detail.image_url,
          name: this.product_detail.NAME,
          skuCd: this.product_detail.sku_cd,
          model: this.product_detail.model,
          width: this.product_detail.width,
          height: this.product_detail.height,
          weight: this.product_detail.weight,
          retailPrice: this.product_detail.retail_price,
          minRetailPrice: this.product_detail.min_retail_price,
          warrantyDay: this.product_detail.warranty_day,
          replenishmentPeriod: this.product_detail.replenishment_period,
          warranty: this.product_detail.warranty,

          num_pro: null,
          is_number: true
        }
      },
      computed: {
        is_show() {
          if (this.role === 'bvo') {
            return true;
          } else {
            return false;
          }
        }
      },
      methods: {
        addOrder() {
          this.is_number = true
          if (!(this.num_pro % 1 === 0) || this.num_pro === null) {
            this.is_number = false
          } else {
            console.log(123);
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
            this.$emit('close', null);
            this.num_pro = null;

            buyProduct(this, {
              dsrId: this.usr_id,
              proId: this.pro_id,
              productAmount: this.num_pro
            }).then((result)=>{
              console.log(result);
            });
          }
        },

        cancel() {
          this.$emit('close', null);
        }
      }
    }
</script>

<style scoped lang="scss">
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
