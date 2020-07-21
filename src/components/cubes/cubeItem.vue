<template>
  <div>
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
            <div @click.stop="like_" v-if="is_product">
              <va-icon class="like" name='fa fa-heart-o' color="pink" v-if="dislike"/>
              <va-icon class="like" name='fa fa-heart' color="pink" v-if="like_icon"/>
            </div>
          </template>

          {{img_intro}}
        </va-card>
      </div>

    </div>

    <va-modal
      v-model="showModal"
      size="large"
      title=" Product Detail Information"
      hideDefaultActions="true"
      :okText=" $t('modal.confirm') "
      :cancelText=" $t('modal.cancel') ">
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
    import ProductDetail from "../productDetail/productDetail";
    import {addWaitlist, getProductDetail, deleteCompany, deleteBrand} from '../../api/mvo.js'

    export default {
      name: "cube-item",
      components: {ProductDetail},
      props: {
        img_url: String,
        img_title: String,
        img_intro: String,
        usr_id: Number, // BVO id
        cube_id: Number, // id of product, company, brand, store
        type: String // product, company, brand, store
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
            remove_confirm: false
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
            addWaitlist(this, {
              dsrId: this.usr_id,
              proId: this.cube_id
            }).then((result)=>{
              console.log(result)
            })
          } else {
            this.like_icon = false;
            this.dislike = true;
          }
        },

        see_detail() {
          if (this.type === 'product') {
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
            console.log(this.product_detail);
            this.showModal = true;

            getProductDetail(this, {
              proId: this.cube_id
            }).then((result)=>{
              console.log(result);
              this.product_detail = result.data;
            });
          } else if (this.type === 'company') {
            var permission = this.$store.state.user.permissions;

            for(var i=0;i<permission.length;i++){
              if(Number(permission[i].permissionId) == 1){
                this.$store.commit("changeCompanyID", this.cube_id);
                this.$router.push({name: 'company-detail'})
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
          } else if (this.type === 'brand') {
            var permission = this.$store.state.user.permissions;

            for(var i=0;i<permission.length;i++){
              if(Number(permission[i].permissionId) == 2){
                this.$store.commit("changeBrandID", this.cube_id);
                this.$router.push({name: 'brand-detail'})
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
          } else if (this.type === 'store') { // store
            this.$router.push({name: 'brand-detail'}) // YYGX: change the path by yourself. It jump to the store detail page.
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
          this.is_remove = true;
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

          } else {
            console.log('>> Error: the prop of cube_id should be product, company, brand or store!')
          }
        },

        close(par) {
          this.showModal = false
        }
      }
    }
</script>

<style scoped>
  .container {
    margin: 2vh;
    min-width: 13vw;
  }

  .title {
    margin-right: 50%;
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
</style>
