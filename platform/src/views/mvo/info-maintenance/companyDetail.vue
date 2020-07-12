<template>
  <div>

    <div class="flex lg12">

      <va-card
        stripe="info"
      >
        <template slot="header">
          <va-icon name="fa fa-suitcase mr-3" color="success"/>
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
      :cancelText=" $t('modal.cancel') ">
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
  import {addCompany} from '../../../api/mvo'
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
        console.log(this.add_brand.nameEn )
        this.nameEnErrors = this.add_brand.nameEn ? [] : ['English name is required'];
        console.log(this.nameEnErrors)
        this.nameCnErrors = this.add_brand.nameCn ? [] : ['Chinese name is required'];

        if (!this.formReady) {
          return;
        }

        this.add_brand.manId = this.$store.state.mvo.manId;
        console.log(this.add_brand);
        this.showAddBrand = false;
        addCompany(this, this.add_brand)
          .then(res=>{
            console.log(res);
          })
      }
    },

    created() {
      this.brand_list = this.fake_data; // to be deleted...
      // console.log(this.brand_list)
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
</style>
