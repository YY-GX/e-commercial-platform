<template>
  <div @click="see_detail" v-if="!is_remove" class="product">
    <div >
      <va-card
        :image= "img_url"
      >
        <template slot="header">
          <h5 class="mt-0 mb-0 title">{{ img_title }}</h5>
          <div @click.stop="like_">
            <va-icon class="like" name='fa fa-heart-o' color="pink" v-if="dislike"/>
            <va-icon class="like" name='fa fa-heart' color="pink" v-if="like_icon"/>
          </div>
        </template>

        {{img_intro}}
      </va-card>
    </div>

    <va-modal
      v-model="showModal"
      size="large"
      title=" Product Detail Information"
      hideDefaultActions="true"
      :okText=" $t('modal.confirm') "
      :cancelText=" $t('modal.cancel') ">
      <slot>
        <product-detail v-on:close="close" :product_detail="product_detail" :usr_id="usr_id"/>
      </slot>
    </va-modal>

  </div>
</template>

<script>
  import ProductDetail from "./productDetail";
  export default {
    name: "product-item",
    components: {ProductDetail},
    props: {
      img_url: String,
      img_title: String,
      img_intro: String,
      usr_id: Number, // BVO id
      product_id: Number // product id
    },
    is_remove: false,
    data() {
      return {
        is_like: false,
        like_icon: false,
        dislike: true,
        isVisible: false,
        toastText: false,
        showModal: false,
        product_detail: {}
      }
    },
    methods: {
      like_() {
        this.is_like = !this.is_like;
        if (this.is_like === true) {
          this.like_icon = true;
          this.dislike = false;
          // Show notification
          this.showToast(
            "You have starred this product! \n You can see it in the willist.",
            {
              theme: 'info',
              icon: 'fa-heart',
              position: 'top-right',
              duration: 1500,
              fullWidth: false,
            },
          );
          // Tell back to add it to waillist
          this.$http({
            method: "post",
            url: '/bvo/wishlist/add',
            data: {
              dsrId: this.usr_id,
              proId: this.product_id
            }
          }).then((result)=>{
            console.log(result)
          })
        } else {
          this.like_icon = false;
          this.dislike = true;
        }
      },
      see_detail() {
        this.$http({
          method: "get",
          url: "/mvo/product/detail/get",
          data() {
            proId: this.product_id
          }
        }).then((result)=>{
          console.log(result);
          this.product_detail = result.data;
        });
        this.product_detail = {
          'pro_id': this.product_id,
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
        this.showModal = true;
      },
      close(par) {
        this.showModal = false
      }
    }
  }
</script>

<style scoped>
  .title {
    margin-right: 50%;
  }

  .like {
    float: right;
  }

  .product:hover {
    -webkit-transform: translateY(-3px);
    -ms-transform: translateY(-3px);
    transform: translateY(-3px);
    -webkit-box-shadow: 0 0 6px #999999;
    box-shadow: 0 0 6px #999999;
    -webkit-transition: all  ease-out;
    transition: all  ease-out;
    border-radius: 20px;
  }
</style>
