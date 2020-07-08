<template>
    <div>
      <va-card title="Product List">
        <va-data-table
          :fields="fields"
          :data="fieldData"
          :per-page="parseInt(perPage)"
          @row-clicked="showProduct"
          clickable
        >
          <template slot="marker" slot-scope="props">
            <va-icon name="fa fa-circle" :color="props.rowData.color" size="8px" />
          </template>

          <template slot="stsCd" slot-scope="props">
            <va-badge :color="props.rowData.color">
              {{ props.rowData.stsCd }}
            </va-badge>
          </template>

          <template slot="actions" slot-scope="props">
            <va-button small color="danger" class="ma-0" @click="deleteProduct(props.rowData)">
              Remove
            </va-button>
          </template>

<!--          <template slot="actions" slot-scope="props">-->
<!--            <va-toggle-->
<!--              v-model="props.toggles.selected"-->
<!--              small-->
<!--              :label="props.toggles.label"-->
<!--            />-->
<!--          </template>-->



        </va-data-table>
      </va-card>
    </div>
</template>

<script>
  import {getProductInfos, deleteProduct} from '../../../api/api.js'

    export default {
      name: "product-main",
      data() {
        return {
          fieldData: null,
          toggles: {
            label: 'On Shelf',
            selected: true,
          },
          perPage: '6',
          fake_data: {
            data: [
              {
                proId: "1",
                name: "yfy",
                skuCd: '4139431679614897236',
                model: 'V2',
                description: 'good good good good good good good good',
                stsCd: 1
              },
              {
                proId: "2",
                name: "yfy",
                skuCd: '4139431679614897236',
                model: 'V2',
                description: 'good good good good good good good good',
                stsCd: 1
              },
              {
                proId: "3",
                name: "yfy",
                skuCd: '4139431679614897236',
                model: 'V2',
                description: 'good good good good good good good good',
                stsCd: 1
              },
              {
                proId: "4",
                name: "yfy",
                skuCd: '4139431679614897236',
                model: 'V2',
                description: 'good good good good good good good good',
                stsCd: 0
              },
              {
                proId: "5",
                name: "yfy",
                skuCd: '4139431679614897236',
                model: 'V2',
                description: 'good good good good good good good good',
                stsCd: 0
              },
              {
                proId: "6",
                name: "yfy",
                skuCd: '4139431679614897236',
                model: 'V2',
                description: 'good good good good good good good good',
                stsCd: 1
              },
              {
                proId: "7",
                name: "yfy",
                skuCd: '4139431679614897236',
                model: 'V2',
                description: 'good good good good good good good good',
                stsCd: 1
              },
              {
                proId: "8",
                name: "yfy",
                skuCd: '4139431679614897236',
                model: 'V2',
                description: 'good good good good good good good good',
                stsCd: 0
              }
            ]
          }
        }
      },
      created() {
        this.fieldData = this.fake_data.data; // to be deleted in the future
        this.fieldData.forEach(v=>{
          v['color'] = v['stsCd'] === 1 ? '#8DDC88' : '#F8706D';
          v['stsCd'] = v['stsCd'] === 1 ? 'On Shelf' : 'Off Shelf';
        });
        postData = {'brdId': 1};
        getProductInfos(this, postData)
          .then((res)=>{
            if (res.status === 200) {
              console.log(res.data)
              this.fieldData = res.data
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
            name: 'description',
            title: 'description',
          }, {
            name: '__slot:stsCd',
            title: this.$t('tables.headings.status'),
          }, {
            name: '__slot:actions',
            dataClass: 'text-right',
          }]
        }
      },
      methods: {
        showProduct() {

        },
        deleteProduct(row) {
          const idx = this.fieldData.findIndex(u => u.proId === row.proId);
          this.fieldData.splice(idx, 1);

          this.showToast(
            "You have deleted the product " + row.name,
            {
              theme: 'danger',
              icon: 'fa-heart',
              position: 'top-right',
              duration: 500,
              fullWidth: false,
            },
          );
          deleteProduct(this, {
            proId: row.proId
          }).then((res)=>{
            console.log(res.data)
          })
        }
      }
    }
</script>

<style scoped>

</style>
