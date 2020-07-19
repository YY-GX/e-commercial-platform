<template>
    <div>
      <va-card title="Order List">
        <div class="row align--center">
          <div class="flex lg5">
            <va-input
              v-model="term"
              placeholder="Search by order number"
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

        </div>

        <va-data-table
          :fields="fields"
          :data="filteredData"
          :per-page="parseInt(perPage)"
          @row-clicked="showOrderDetail"
          clickable
          class="va-table--hoverable"
        >
          <template slot="marker" slot-scope="props">
            <va-icon name="fa fa-circle" :color="getColor(props.rowData)" size="8px" />
          </template>

          <template slot="orderSts" slot-scope="props">
            <va-badge :color="getColor(props.rowData)">
              {{getTag(props.rowData)}}
            </va-badge>
          </template>

          <template slot="actions" slot-scope="props">

            <va-button flat small color="gray" v-if="props.rowData.orderSts === 2 + ''" @click.stop="ship(props.rowData)" class="ma-0">
<!--              {{ getAction(props.rowData) }} -->
              Ship
            </va-button>

            <va-button flat small color="danger" v-if="props.rowData.orderSts === 3 + ''" @click.stop="cancel(props.rowData)" class="ma-0">
              Cancel
            </va-button>

            <va-button flat small color="info"
                       v-if="props.rowData.orderSts === '3' || props.rowData.orderSts === '4'"
                       @click.stop="track(props.rowData)"
                       class="ma-0">
              Track
            </va-button>

          </template>

        </va-data-table>
      </va-card>

      <va-modal
        v-model="showTrackInfo"
        title=" Tracking logistic information"
        hideDefaultActions="true"
        okText=" Confirm "
        :cancelText=" $t('modal.cancel') ">
        <slot>
          <track-info v-on:close="close" :saoId="saoId"/>
        </slot>
      </va-modal>
    </div>
</template>

<script>
  import {getOrderLs, getOrderList, shipOrder, cancelOrder} from '../../../api/mvo'
  import store from '../../../store/index';
  import trackInfo from "../../../components/trackInfo/trackInfo";
    export default {
      name: "order-main",
      store: store,
      components: {
        trackInfo
      },
      data() {
        return {
          fieldData: [],
          term: '',
          is_ship: false,
          is_cancel: false,

          showTrackInfo: false,
          saoId: null,


          perPage: '10',
          perPageOptions: ['5', '10', '20', '30', '50'],

          fake_data: [
            {
              saoId: '1',
              orderNo: 'S123413879832684237684',
              orderSts: '1',
              price: '1.00',
              productAmount: '3',
              createDate: '2020-07-06 13:05:40.0',
            },
            {
              saoId: '2',
              orderNo: 'S019413879832684237684',
              orderSts: '2',
              price: '1.00',
              productAmount: '3',
              createDate: '2020-07-06 13:05:40.0',
            },
            {
              saoId: '3',
              orderNo: 'S023413879832684237684',
              orderSts: '3',
              price: '1.00',
              productAmount: '3',
              createDate: '2020-07-06 13:05:40.0',
            },
            {
              saoId: '4',
              orderNo: 'S019413879832684237684',
              orderSts: '4',
              price: '1.00',
              productAmount: '3',
              createDate: '2020-07-06 13:05:40.0',
            },
            {
              saoId: '5',
              orderNo: 'S019413879832684237684',
              orderSts: '5',
              price: '1.00',
              productAmount: '3',
              createDate: '2020-07-06 13:05:40.0',
            },
            {
              saoId: '6',
              orderNo: 'S019413879832684237684',
              orderSts: '1',
              price: '1.00',
              productAmount: '3',
              createDate: '2020-07-06 13:05:40.0',
            },
            {
              saoId: '7',
              orderNo: 'S019413879832684237684',
              orderSts: '2',
              price: '1.00',
              productAmount: '3',
              createDate: '2020-07-06 13:05:40.0',
            },
            {
              saoId: '8',
              orderNo: 'S019413879832684237684',
              orderSts: '3',
              price: '1.00',
              productAmount: '3',
              createDate: '2020-07-06 13:05:40.0',
            },
            {
              saoId: '9',
              orderNo: 'S019413879832684237684',
              orderSts: '4',
              price: '1.00',
              productAmount: '3',
              createDate: '2020-07-06 13:05:40.0',
            },
            {
              saoId: '10',
              orderNo: 'S019413879832684237684',
              orderSts: '5',
              price: '1.00',
              productAmount: '3',
              createDate: '2020-07-06 13:05:40.0',
            },
          ]
        }
      },
      methods: {
        showOrderDetail() {

        },
        track(row) {
          this.saoId = row.saoId;
          this.showTrackInfo = true;

        },
        cancel(row) {
          let data = {
            saoId: row.saoId
          };
          this.showToast(
            "Order " + row.orderNo + " has been canceled!",
            {
              theme: 'info',
              icon: 'fa-heart',
              position: 'top-right',
              duration: 1000,
              fullWidth: false,
            },
          );
          this.fieldData.forEach(v=>{
            if (v.saoId === row.saoId) {
              v.orderSts = '5';
            }
          });
          cancelOrder(this, data)
            .then((res)=>{
              console.log(res.data);

            })
        },
        ship(row) {
          let data = {
            saoId: row.saoId
          };
          this.showToast(
            "Order " + row.orderNo + " has been shipped!",
            {
              theme: 'info',
              icon: 'fa-heart',
              position: 'top-right',
              duration: 1000,
              fullWidth: false,
            },
          );
          this.fieldData.forEach(v=>{
            if (v.saoId === row.saoId) {
              v.orderSts = '3';
            }
          });
          shipOrder(this, data)
            .then((res)=>{
              console.log(res.data);

            })
        },
        getColor(row) {
          let state = row.orderSts;
          if (state === 1 + '') {
            return '#05668d';
          } else if (state === 2 + '') {
            return '#028090';
          } else if (state === 3 + '') {
            return '#00a896';
          } else if (state === 4 + '') {
            return '#02c39a';
          } else if (state === 5 + '') {
            return '#f9c74f'
          }
        },
        getTag(row) {
          let state = row.orderSts;
          if (state === 1 + '') {
            return 'To be paid';
          } else if (state === 2 + '') {
            return 'To be shipped';
          } else if (state === 3 + '') {
            return 'Shipped';
          } else if (state === 4 + '') {
            return 'Finished';
          } else if (state === 5 + '') {
            return 'Canceled'
          }
        },
        close(par) {
          this.showTrackInfo = false;
        }
      },
      computed: {
        fields () {
          return [{
            name: '__slot:marker',
            width: '30px',
            dataClass: 'text-center',
          }, {
            name: 'orderNo',
            title: 'Order Number',
          }, {
            name: 'price',
            title: 'Price',
          }, {
            name: 'productAmount',
            title: 'Product Amount',
          }, {
            name: 'createDate',
            title: 'Created Date',
          }, {
            name: '__slot:orderSts',
            title: this.$t('tables.headings.status'),
          }, {
            name: '__slot:actions',
            dataClass: 'text-right',
          }]
        },
        filteredData () {
          if (!this.term || this.term.length < 1) {
            return this.fieldData
          }

          return this.fieldData.filter(item => {
            return item.orderNo.toLowerCase().startsWith(this.term.toLowerCase())
          })
        },
      },
      created() {
        // this.fieldData = this.fake_data; // to be deleted in the future
        let usrId = this.$store.state.mvo.userId;
        let role_ = this.$store.state.mvo.role === 'mvo' ? 1 : 0;
        let data = {
          userId: usrId,
          // operation: role_
        };
        console.log(data);
        getOrderLs(this, data)
          .then((res)=>{
            console.log(res);
            res.data.data.forEach(v=>{
              console.log(v);
              let data_tmp = {
                id: v + '',
                operation: role_
              };
              let fieldLs = [];
              getOrderList(this, data_tmp)
                .then((res) => {
                  console.log(res);
                  console.log(res.data.data);
                  this.fieldData = this.fieldData.concat(res.data.data);
                  // console.log(fieldLs);
                  // this.fieldData = fieldLs;
                  // console.log(this.fieldData)
                })
            });


            // if (res.status === 200) {
            //   this.fieldData = res.data.data;
            // } else {
            //   console.log('Return 500!')
            // }
          })
      }
    }
</script>

<style scoped>

</style>
