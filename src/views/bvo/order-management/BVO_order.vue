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

          <va-button flat small color="green" v-if="props.rowData.orderSts === 1 + ''" @click.stop="pay(props.rowData)" class="ma-0">
            <!--              {{ getAction(props.rowData) }} -->
            pay
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
        <track-info v-on:close="close"/>
      </slot>
    </va-modal>

    <va-modal
      v-model="detailIsShowed"
      size="large"
      :hideDefaultActions="true"
      :okText=" $t('modal.confirm') "
      :cancelText=" $t('modal.cancel') ">
      <template slot="header">
        <div style="position: relative; top: 0; margin-bottom: 10px;">
          <div class="title">Product Details</div>
          <div class="close_icon" :class="{hover : ishover}" @click="detailIsShowed=false" @mouseover="closeIconHover" @mouseout="closeIconOut"><va-icon name="fa fa-close"></va-icon></div>
        </div>
      </template>
      <slot>
        <view-product-detail :product_detail="productDetail"></view-product-detail>
      </slot>
    </va-modal>
  </div>
</template>

<script>
  import {getOrderList} from '../../../api/mvo';
  import {getBVOProductdetail} from "../../../api/bvo.js";
  import ViewProductDetail from "../../../components/myComponents/viewProductDetail";
  import trackInfo from "../../../components/myComponents/trackInfo";
  export default {
    name: "order-main",
    components: {
      ViewProductDetail,
      trackInfo
    },
    data() {
      return {
        fieldData: [],
        term: '',
        is_ship: false,
        is_cancel: false,
        showTrackInfo: false,
        perPage: '10',
        perPageOptions: ['5', '10', '20', '30', '50'],
        detailIsShowed : false,
        productDetail : {},
        ishover : false
      }
    },
    methods: {
      showOrderDetail: function(row){
        var proId = parseInt(row.proId);
        getBVOProductdetail(this,proId
        ).then((result)=>{
          console.log(result);
          this.productDetail = result.data.data[0];
          this.detailIsShowed = true;
        });
      },
      closeIconHover : function () {
        this.ishover = true;
      },
      closeIconOut : function (){
        this.ishover = false;
      },
      track(row) {
        this.showTrackInfo = true;
      },
      pay : function(row){
        getBVOProductdetail(this,row.proId).then(res=>{
          console.log(res);
          this.$store.commit("changeIsPay",true);
          this.$store.commit("changeOrderInfo",row);
          var product_detail = res.data.data[0];
          this.$store.commit("changeProductDetail",product_detail);
          this.$router.push({name : "wallet-login"});
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
      // to be deleted in the future
      let usrId = this.$store.state.bvo.dsrId;
      let data = {
        id: usrId,
        operation: 1
      };
      console.log(data);
      getOrderList(this, data)
        .then((res)=>{
          console.log(res.data);
          if (res.status == 200) {
            this.fieldData = res.data.data;
            console.log(this.fieldData);
          } else {
            console.log('Return 500!')
          }
        })
    }
  }
</script>

<style scoped>
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
</style>
