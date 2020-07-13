<template>
  <div>

    <div class="flex lg12">



      <va-card
        stripe="info"
        style="margin-bottom: 2vh;"
      >
        <template slot="header">
          <va-icon name="fa fa-info mr-3" color="info"/>
          <h4 class="mt-0 mb-0"> Company basic information </h4>
        </template>

        <div class="row">

          <div class="flex lg3">
            <img :src='company_info.imageUrl' alt="Company Image" class="img">
          </div>

          <div class="flex lg8 offset-lg1">
            <label class="labels">Company Name(En): </label>{{ company_info.nameEn }}<br>
            <label class="labels">Company Name(Cn): </label>{{ company_info.nameCn }}<br>
            <label class="labels">Gmc type: </label>{{ company_info.gmcType }}<br>
            <label class="labels">Gmc url: </label>{{ company_info.gmcUrl }}<br>
            <label class="labels">Company introduction: </label>{{ company_info.description }}<br>
          </div>


        </div>

      </va-card>


      <va-card
        stripe="info"
      >

        <template slot="header">
          <va-icon name="fa fa-suitcase mr-3" color="info"/>
          <h4 class="mt-0 mb-0"> Brand List </h4>
          <va-button @click="click_add" small outline style="margin-left: 80%; margin-top: 2%;"> Add Brand </va-button>
        </template>

        <div class="container">
          <div class="container_item"
               v-for="brand in brand_list.slice((activePage - 1) * pageSize, activePage * pageSize)"
               :key="brand.brdId">
            <cube-item
              :img_url="brand.imageUrl"
              :img_title="brand.nameEn"
              type="brand"
              :cube_id="brand.brdId"
              usr_id=1
            />
          </div>
        </div>

        <div class="pagination">
          <!-- 分页按钮， 绑定activePage -->
          <va-pagination
            :pages="totalPage"
            :visible-pages="3"
            :boundary-links="false"
            v-model="activePage"
          />
        </div>

      </va-card>


    </div>


    <va-modal
      @ok="onOk"
      v-model="showAddBrand"
      size="large"
      title=" Add New Brand"
      okText=" Add Brand "
      :cancelText=" $t('modal.cancel')"
      >
      <slot>
        <!--   nameEn & nameCn   -->
        <div class="layout gutter--md fluid">
          <div class="row">

            <div class="flex lg6">
              <va-input
                v-model="add_brand.nameEn"
                type="text"
                label="Company Name (English)"
                :error="!!nameEnErrors.length"
                :error-messages="nameEnErrors"
              />
            </div>

            <div class="flex lg6">
              <va-input
                v-model="add_brand.nameCn"
                type="text"
                label="Company Name (Chinese)"
                :error="!!nameCnErrors.length"
                :error-messages="nameCnErrors"
              />
            </div>

          </div>
        </div>

      </slot>
    </va-modal>

  </div>
</template>

<script>
  import cubeItem from '../../../components/cubes/cubeItem'
  import {addCompany, getCompanyInfo} from '../../../api/mvo'
  import store from '../../../store/index';

  export default {
    name: "company-detail",
    components: {
      cubeItem
    },
    store: store,
    data() {
      return {
        activePage : 1,
        pageSize: 10,
        showAddBrand: false,
        company_info: null,
        typeOptions: [
          {
            id: 1,
            description: 'TÜV',
          },
          {
            id: 2,
            description: 'UL',
          }
        ],

        add_brand: {
          manId: '',
          nameEn: '',
          nameCn: '',
        },

        nameEnErrors: [],
        nameCnErrors: [],

        brand_list: null,
        fake_data: [
          {
            brdId: '1',
            nameEn: 'Tex',
            nameCn: '泰格斯',
            imageUrl: 'https://picsum.photos/300/200/?image=1043'
          },
          {
            brdId: '2',
            nameEn: 'Tex',
            nameCn: '泰格斯',
            imageUrl: 'https://picsum.photos/300/200/?image=1043'
          },
          {
            brdId: '3',
            nameEn: 'Tex',
            nameCn: '泰格斯',
            imageUrl: 'https://picsum.photos/300/200/?image=1043'
          },
          {
            brdId: '4',
            nameEn: 'Tex',
            nameCn: '泰格斯',
            imageUrl: 'https://picsum.photos/300/200/?image=1043'
          },
          {
            brdId: '5',
            nameEn: 'Tex',
            nameCn: '泰格斯',
            imageUrl: 'https://picsum.photos/300/200/?image=1043'
          },
        ]
      }
    },
    computed: {
      formReady () {
        return !this.nameEnErrors.length && !this.nameCnErrors.length
      },
    },


    methods: {
      click_add() {
        this.showAddBrand = true;
      },
      onOk() {
        this.nameEnErrors = this.add_brand.nameEn ? [] : ['English name is required'];
        this.nameCnErrors = this.add_brand.nameCn ? [] : ['Chinese name is required'];
        if (!this.formReady) {
          this.showAddBrand = true;
          return;
        }
        this.add_brand.manId = this.$store.state.mvo.manId;
        console.log(this.add_brand);
        this.showAddBrand = false;
        addCompany(this, this.add_brand)
          .then(res=>{
            console.log(res);
            this.showToast(
              "You have added one brand!",
              {
                theme: 'success',
                icon: 'fa-space-shuttle',
                position: 'top-right',
                duration: 2500,
                fullWidth: false,
              },
            );
          })
      }
    },

    created() {
      this.brand_list = this.fake_data; // to be deleted...
      console.log(this.$store.state.mvo.userId)
      getCompanyInfo(this, {
        userId: this.$store.state.mvo.userId
      }).then((res)=>{
        let company_ls = res.data.data;
        console.log(company_ls);
        console.log(company_ls[0].manId);
        console.log(this.$store.state.mvo.manId);
        for (let i = 0; i < company_ls.length; i++) {
          if (company_ls[i].manId + '' === this.$store.state.mvo.manId + '') {
            this.company_info = company_ls[i];
            break;
          }
        }

        });

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
    max-width: 250px;
    max-height: 200px;
    min-width: 100px;
    min-height: 80px;
  }
</style>
