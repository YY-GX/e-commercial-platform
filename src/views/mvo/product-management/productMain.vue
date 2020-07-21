<template>
    <div>
      <va-card title="Product List">
        <div class="row align--center">
          <div class="flex lg5">
            <va-input
              v-model="term"
              placeholder="Search by product name"
              @input="search"
              removable
            >
              <va-icon name="fa fa-search" slot="prepend" />
            </va-input>
          </div>

          <div class="flex lg2">
            <va-select
              v-model="perPage"
              :label="$t('tables.perPage')"
              :options="perPageOptions"
              noClear
            />
          </div>

          <div @click="addProduct" class="flex lg2 offset--lg2">
            <va-button> Add product </va-button>
          </div>
        </div>

        <va-data-table
          :fields="fields"
          :data="filteredData"
          :per-page="parseInt(perPage)"
          @row-clicked="showProduct"
          clickable
          class="va-table--hoverable"
        >

          <template slot="marker" slot-scope="props">
            <va-icon name="fa fa-circle" :color="props.rowData.stsCd === 1 + ''? '#ba5a31' : '#e59f71'" size="8px" />
          </template>

          <template slot="stsCd" slot-scope="props">
            <va-badge :color="props.rowData.stsCd === 1 + '' ? '#ba5a31' : '#e59f71'">
              {{ props.rowData.stsCd  === 1 + '' ? 'On Shelf' : 'Off Shelf' }}
            </va-badge>
          </template>

          <template slot="actions" slot-scope="props">
            <va-button flat small color="gray" @click.stop="changeState(props.rowData)" class="ma-0">
              {{ props.rowData.stsCd  === 0 + '' ? 'On' : 'Off' }}
            </va-button>

            <va-button flat small color="info" @click.stop="editProduct(props.rowData)" class="ma-0">
              Edit
            </va-button>

            <va-button flat small color="danger" @click.stop="deleteProduct(props.rowData)" class="ma-0">
              Remove
            </va-button>

          </template>

        </va-data-table>
      </va-card>

      <va-modal
        v-model="showModal"
        size="small"
        title=" Remove Confirmation"
        message=" Are you sure to remove this product?"
        :okText=" $t('modal.confirm') "
        :cancelText=" $t('modal.cancel') "
        @ok="onOk"
      />

      <va-modal
        v-model="showProductDetail"
        size="large"
        title=" Product Detail Information"
        hideDefaultActions="true"
        :okText=" $t('modal.confirm') "
        :cancelText=" $t('modal.cancel') ">
        <slot>
          <product-detail v-on:close="close" :product_detail="product_detail" :usr_id="usr_id" role="mvo"/>
        </slot>
      </va-modal>

      <va-modal
        v-model="showAddProduct"
        size="large"
        title=" Add New Product"
        hideDefaultActions="true"
        okText=" Add Product "
        :cancelText=" $t('modal.cancel') ">
        <slot>
          <add-product v-on:close="closeAddPro" v-on:addPro="addPro"/>
        </slot>
      </va-modal>

      <va-modal
        v-model="showEditProduct"
        size="large"
        title=" Edit Product"
        hideDefaultActions="true"
        okText=" Confirm "
        :cancelText=" $t('modal.cancel') ">
        <slot>
          <edit-product :proId="editId" v-on:close="closeEditPro" v-on:editPro="editPro"/>
        </slot>
      </va-modal>


    </div>
</template>

<script>
  import {getProductInfosByUsr, deleteProduct, changeProductStatus, getProductDetail} from '../../../api/mvo.js'
  import ProductDetail from "../../../components/productDetail/productDetail";
  import AddProduct from "../../../components/productDetail/AddProduct";
  import EditProduct from "../../../components/productDetail/EditProduct";

    export default {
      name: "product-main",
      components: {
        ProductDetail,
        AddProduct,
        EditProduct,
      },
      data() {
        return {
          usr_id: 1,
          fieldData: [],
          toggles: {
            label: 'On Shelf',
            selected: true,
          },
          term: null,
          perPage: '6',
          perPageOptions: ['4', '6', '10', '20'],
          options: [
            { label: 'On Shelf', value: 'on' },
            { label: 'Off Shelf', value: 'off' },
          ],
          showModal: false,
          showProductDetail: false,
          showAddProduct: false,
          showEditProduct: false,
          editId: null,
          deleteRow: null,
          product_detail: null,
          fake_data: {
            data: [
              {
                proId: "1",
                name: "yfy",
                skuCd: '4139431679614897236',
                model: 'V2',
                description: 'good good good good good good good good',
                brdName: "Xbox",
                stsCd: 1
              },
              {
                proId: "2",
                name: "yy",
                skuCd: '4139431679614897236',
                model: 'V2',
                description: 'good good good good good good good good',
                brdName: "Xbox",
                stsCd: 1
              },
              {
                proId: "3",
                name: "yfy",
                skuCd: '4139431679614897236',
                model: 'V2',
                description: 'good good good good good good good good',
                brdName: "Xbox",
                stsCd: 1
              },
              {
                proId: "4",
                name: "yfy",
                skuCd: '4139431679614897236',
                model: 'V2',
                description: 'good good good good good good good good',
                brdName: "Xbox",
                stsCd: 0
              },
              {
                proId: "5",
                name: "chj",
                skuCd: '4139431679614897236',
                model: 'V2',
                description: 'good good good good good good good good',
                brdName: "Xbox",
                stsCd: 0
              },
              {
                proId: "6",
                name: "yfy",
                skuCd: '4139431679614897236',
                model: 'V2',
                description: 'good good good good good good good good',
                brdName: "Xbox",
                stsCd: 1
              },
              {
                proId: "7",
                name: "yfy",
                skuCd: '4139431679614897236',
                model: 'V2',
                description: 'good good good good good good good good',
                brdName: "Xbox",
                stsCd: 1
              },
              {
                proId: "8",
                name: "yfy",
                skuCd: '4139431679614897236',
                model: 'V2',
                description: 'good good good good good good good good',
                brdName: "Xbox",
                stsCd: 0
              }
            ]
          }
        }
      },
      created() {
        // this.fieldData = this.fake_data.data; // to be deleted in the future

        // get usrId from vuex
        let data = {'userId': this.$store.state.mvo.userId};
        getProductInfosByUsr(this, data)
          .then((res)=>{
            console.log(res);
            if (res.status === 200) {
              console.log(1234);
              this.fieldData = res.data.data;
            } else {
              console.log('Get all product info fails. Status=500.')
            }
          })
      },
      computed: {
        fields () {
          return [{
            name: '__slot:marker',
            width: '30px',
            dataClass: 'text-center',
          }, {
            name: 'name',
            title: 'Product Name',
          }, {
            name: 'skuCd',
            title: 'skuCd',
          }, {
            name: 'model',
            title: 'model',
          }, {
            name: '__slot:stsCd',
            title: this.$t('tables.headings.status'),
          }, {
            name: 'description',
            title: 'description',
          }, {
            name: '__slot:actions',
            dataClass: 'text-right',
          }]
        },
        filteredData () {
          if (!this.term || this.term.length < 1) {
            console.log(this.fieldData);
            return this.fieldData
          }

          return this.fieldData.filter(item => {
            return item.name.toLowerCase().startsWith(this.term.toLowerCase())
          })
        },
      },
      methods: {
        showProduct(row) {
          console.log(row);
          // this.product_detail = {
          //   'pro_id': row.proId,
          //   'imageUrl': "https://picsum.photos/300/200/?image=1043",
          //   'name': 'fengjinghua',
          //   'skuCd': '1e212312321232',
          //   'model': 'V2',
          //   'width': 1,
          //   'height': 2,
          //   'length': 3,
          //   'weight': 10,
          //   'retailPrice':  12,
          //   'minRetailPrice': 10,
          //   'warrantyDay': 60,
          //   'replenishmentPeriod': 10,
          //   'warranty': 'Never Never Never Never Never Never Never ',
          // }; // delete in the future


          getProductDetail(this, {
            proId: row.proId
          }).then((result)=>{
            console.log(result);
            this.product_detail = result.data.data[0];
            this.showProductDetail = true;
            console.log(this.product_detail)
          });
        },

        deleteProduct(row) {
          this.showModal = true;
          this.deleteRow = row;
        },

        onOk() {
          let row = this.deleteRow;
          const idx = this.fieldData.findIndex(u => u.proId === row.proId);
          this.fieldData.splice(idx, 1);

          this.showToast(
            "You have deleted the product " + row.name,
            {
              theme: 'danger',
              icon: 'fa-heart',
              position: 'top-right',
              duration: 1000,
              fullWidth: false,
            },
          );

          this.showModal = false;

          deleteProduct(this, {
            proId: row.proId
          }).then((res)=>{
            console.log(res.data)
          })
        },

        changeState(row) {
          const idx = row.proId + '';
          let crr_state = '';
          this.fieldData.forEach(v=>{
            if (v.proId === idx) {
              v.stsCd = v.stsCd === '1' ? '0' : '1';
              crr_state = v.stsCd;
            }
          });

          this.showToast(
            "Product " + row.name + "'s status changed!",
            {
              theme: 'info',
              icon: 'fa-heart',
              position: 'top-right',
              duration: 1000,
              fullWidth: false,
            },
          );

          changeProductStatus(this, {
            proId: idx,
            stsCd: crr_state
          }).then((res) => {
            console.log(res.data)

          })
        },

        addProduct() {
          this.showAddProduct = true;
        },

        close(par) {
          this.showProductDetail = false;
        },

        closeAddPro(par) {
          this.showAddProduct = false;
        },

        closeEditPro(par) {
          this.showEditProduct = false;
        },

        addPro(product) {
          this.showAddProduct = false;
          let basicInfo = {
            proId: product.proId,
            name: product.name,
            skuCd: product.skuCd,
            model: product.model,
            description: product.description,
            stsCd: '0',
          };

          this.fieldData.push(basicInfo);
        },

        editPro(product) {
          this.showEditProduct = false;
          this.fieldData.forEach(v=>{
            if (v.proId === product.proId + '') {
               v.name = product.name;
               v.skuCd = product.skuCd;
               v.model = product.model;
               v.description = product.description;
               // break
          }
          })
        },

        editProduct(product) {
          let proId = product.proId;
          this.editId = proId;
          this.showEditProduct = true;
        }
      }
    }

  //     .btn-color {
  //   color: linear-gradient(to right, hsl(12,100%,78%), hsl(1,91%,70%));
  // }
</script>

<style scoped>
  .btn-state {
    margin-right: 1vw;
  }
</style>
