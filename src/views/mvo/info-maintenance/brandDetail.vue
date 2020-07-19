<template>
  <div>

    <div class="flex lg12">



      <va-card
        stripe="info"
        style="margin-bottom: 2vh;"
      >
        <template slot="header">
          <va-icon name="fa fa-info mr-3" color="info"/>
          <h4 class="mt-0 mb-0"> Brand basic information </h4>
        </template>

        <div class="row">

          <div class="flex lg3">
            <img :src='brand_info.imageUrl' alt="Company Image" class="img">
          </div>

          <div class="flex lg8 offset-lg1">
            <label class="labels">Brand Name(En): </label>{{ brand_info.nameEn }}<br>
            <label class="labels">Brand Name(Cn): </label>{{ brand_info.nameCn }}<br>
          </div>


        </div>

      </va-card>


      <va-card
        stripe="info"
      >

        <template slot="header">
          <va-icon name="fa fa-suitcase mr-3" color="info"/>
          <h4 class="mt-0 mb-0"> Product table </h4>
          <va-button @click="jump" small outline style="margin-left: 80%; margin-top: 2%;"> See more details </va-button>
        </template>

        <va-data-table
          :fields="fields"
          :data="filteredData"
          :per-page="parseInt(perPage)"
          class="va-table--hoverable"
        >
          <template slot="marker" slot-scope="props">
            <va-icon name="fa fa-circle" :color="props.rowData.sts_cd === '1' ? '#ba5a31' : '#e59f71'" size="8px" />
          </template>

          <template slot="sts_cd" slot-scope="props">
            <va-badge :color="props.rowData.sts_cd === '1' ? '#ba5a31' : '#e59f71'">
              {{ props.rowData.sts_cd  === '1'  ? 'On Shelf' : 'Off Shelf'  }}
            </va-badge>
          </template>

        </va-data-table>


      </va-card>


    </div>

  </div>
</template>

<script>
  import cubeItem from '../../../components/cubes/cubeItem'
  import {addBrand, addCompany, getBrandInfo, getProductInfosByBrd} from '../../../api/mvo'
  import store from '../../../store/index';

  export default {
    name: "company-detail",
    components: {
      cubeItem
    },
    store: store,
    data() {
      return {
        // table related
        fieldData: [],
        perPage: '6',

        // basic info
        brand_info: null,
        brand_list: null,
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
              name: "yy",
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
              name: "chj",
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
          name: '__slot:sts_cd',
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
          return this.fieldData
        }

        return this.fieldData.filter(item => {
          return item.name.toLowerCase().startsWith(this.term.toLowerCase())
        })
      },
    },


    methods: {
      jump() {
        this.$router.push({name: 'product-main'})
      },

      // showState(row) {
      //   console.log(row);
      //   console.log(row.stsCd);
      //   console.log(row.stsCd === "1");
      //   if (row.stsCd === "1") {
      //     return 'On Shelf';
      //   } else {
      //     return 'Off Shelf';
      //   }
      // }
    },



    created() {
      // this.fieldData = this.fake_data.data;
      console.log(this.fieldData);
      console.log(this.$store.state.mvo.manId);
      getBrandInfo(this, {
        manId: this.$store.state.mvo.manId
      }).then((res)=>{
        console.log(res);
        let brand_ls = res.data.data;
        for (let i = 0; i < brand_ls.length; i++) {
          if (brand_ls[i].brdId + '' === this.$store.state.mvo.brdId + '') {
            this.brand_info = brand_ls[i];
            break;
          }
        }
      });

      getProductInfosByBrd(this, {
        brdId: this.$store.state.mvo.brdId
      }).then((res) => {
        console.log(res);
        this.fieldData = res.data.data;
      })
    }
  }
</script>

<style scoped>
  .container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: left;
  }

  .container_item {
    display: flex;
    width: calc(100% / 5);
    justify-content: center;
  }

  .pagination {
    display: flex;
    width: 100%;
    justify-content: center;
  }

  .small-title {
    font-style: italic;
    text-decoration: underline;
  }

  .labels {
    font-weight: bold;
  }

  .img {
    width: 100%;
    height: 100%;
  }
</style>
