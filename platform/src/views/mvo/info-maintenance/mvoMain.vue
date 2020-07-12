<template>
    <div>

      <div class="flex lg12">

        <va-card
          stripe="info"
        >
          <template slot="header">
            <va-icon name="fa fa-suitcase mr-3" color="success"/>
            <h4 class="mt-0 mb-0"> Company List </h4>
            <va-button @click="click_add" small outline style="margin-left: 80%; margin-top: 2%;"> Add Company </va-button>
          </template>

          <div class="container">
            <div class="container_item"
                 v-for="company in company_list.slice((activePage - 1) * pageSize, activePage * pageSize)"
                 :key="company.manId">
              <cube-item
                :img_url="company.imageUrl"
                :img_title="company.nameEn"
                :img_intro="company.description"
                type="company"
                :cube_id="company.manId"
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
        v-model="showAddCompany"
        size="large"
        title=" Add New Product"
        okText=" Add Company "
        :cancelText=" $t('modal.cancel') ">
        <slot>
          <!--   nameEn & nameCn   -->
          <div class="layout gutter--md fluid">
            <div class="row">

              <div class="flex lg6">
                <va-input
                  v-model="add_company.nameEn"
                  type="text"
                  label="Company Name (English)"
                  :error="!!nameEnErrors.length"
                  :error-messages="nameEnErrors"
                />
              </div>

              <div class="flex lg6">
                <va-input
                  v-model="add_company.nameCn"
                  type="text"
                  label="Company Name (Chinese)"
                  :error="!!nameCnErrors.length"
                  :error-messages="nameCnErrors"
                />
              </div>

            </div>
          </div>

          <!--   gmcType & gmcUrl   -->
          <div class="layout gutter--md fluid">
            <div class="row">

              <div class="flex lg6">
                <va-select
                  label="Gmc type"
                  v-model="add_company.gmcType"
                  textBy="description"
                  :options="typeOptions"
                />
              </div>

              <div class="flex lg6">
                <va-input
                  v-model="add_company.gmcUrl"
                  type="text"
                  label="GMC url"
                  :error="!!gmcUrlErrors.length"
                  :error-messages="gmcUrlErrors"
                />
              </div>

            </div>
          </div>

          <!--   description   -->
          <div class="layout gutter--md fluid">
            <div class="row">

              <div class="flex lg12">
                <va-input
                  v-model="add_company.description"
                  type="textarea"
                  label="Description"
                  :error="!!descriptionErrors.length"
                  :error-messages="descriptionErrors"
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
      name: "mvo-main",
      components: {
        cubeItem
      },
      store: store,
      data() {
        return {
          activePage : 1,
          pageSize: 10,
          showAddCompany: false,
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

          add_company: {
            userId: '',
            nameEn: '',
            nameCn: '',
            description: '',
            gmcType: '',
            gmcUrl: ''
          },

          nameEnErrors: [],
          nameCnErrors: [],
          descriptionErrors: [],
          gmcTypeErrors: [],
          gmcUrlErrors: [],

          company_list: null,
          fake_data: [
            {
              manId: '1',
              nameEn: 'Cyber',
              nameCn: '赛博',
              description: 'good company good company',
              gmcType: '1',
              gmcUrl: 'https://segmentfault.com/a',
              imageUrl: 'https://picsum.photos/300/200/?image=1043',
            },
            {
              manId: '2',
              nameEn: 'Cyber',
              nameCn: '赛博',
              description: 'good company good company',
              gmcType: '1',
              gmcUrl: 'https://segmentfault.com/a',
              imageUrl: 'https://picsum.photos/300/200/?image=1043',
            },
            {
              manId: '3',
              nameEn: 'Cyber',
              nameCn: '赛博',
              description: 'good company good company',
              gmcType: '1',
              gmcUrl: 'https://segmentfault.com/a',
              imageUrl: 'https://picsum.photos/300/200/?image=1043',
            },
            {
              manId: '4',
              nameEn: 'Cyber',
              nameCn: '赛博',
              description: 'good company good company',
              gmcType: '1',
              gmcUrl: 'https://segmentfault.com/a',
              imageUrl: 'https://picsum.photos/300/200/?image=1043',
            },
            {
              manId: '5',
              nameEn: 'Cyber',
              nameCn: '赛博',
              description: 'good company good company',
              gmcType: '1',
              gmcUrl: 'https://segmentfault.com/a',
              imageUrl: 'https://picsum.photos/300/200/?image=1043',
            },
            {
              manId: '6',
              nameEn: 'Cyber',
              nameCn: '赛博',
              description: 'good company good company',
              gmcType: '1',
              gmcUrl: 'https://segmentfault.com/a',
              imageUrl: 'https://picsum.photos/300/200/?image=1043',
            },
            {
              manId: '7',
              nameEn: 'Cyber',
              nameCn: '赛博',
              description: 'good company good company',
              gmcType: '1',
              gmcUrl: 'https://segmentfault.com/a',
              imageUrl: 'https://picsum.photos/300/200/?image=1043',
            },
            {
              manId: '8',
              nameEn: 'Cyber',
              nameCn: '赛博',
              description: 'good company good company',
              gmcType: '1',
              gmcUrl: 'https://segmentfault.com/a',
              imageUrl: 'https://picsum.photos/300/200/?image=1043',
            },
            {
              manId: '9',
              nameEn: 'Cyber',
              nameCn: '赛博',
              description: 'good company good company',
              gmcType: '1',
              gmcUrl: 'https://segmentfault.com/a',
              imageUrl: 'https://picsum.photos/300/200/?image=1043',
            },
            {
              manId: '10',
              nameEn: 'Cyber',
              nameCn: '赛博',
              description: 'good company good company',
              gmcType: '1',
              gmcUrl: 'https://segmentfault.com/a',
              imageUrl: 'https://picsum.photos/300/200/?image=1043',
            },
            {
              manId: '1',
              nameEn: 'Cyber',
              nameCn: '赛博',
              description: 'good company good company',
              gmcType: '1',
              gmcUrl: 'https://segmentfault.com/a',
              imageUrl: 'https://picsum.photos/300/200/?image=1043',
            },
            {
              manId: '2',
              nameEn: 'Cyber',
              nameCn: '赛博',
              description: 'good company good company',
              gmcType: '1',
              gmcUrl: 'https://segmentfault.com/a',
              imageUrl: 'https://picsum.photos/300/200/?image=1043',
            },
            {
              manId: '3',
              nameEn: 'Cyber',
              nameCn: '赛博',
              description: 'good company good company',
              gmcType: '1',
              gmcUrl: 'https://segmentfault.com/a',
              imageUrl: 'https://picsum.photos/300/200/?image=1043',
            },
            {
              manId: '4',
              nameEn: 'Cyber',
              nameCn: '赛博',
              description: 'good company good company',
              gmcType: '1',
              gmcUrl: 'https://segmentfault.com/a',
              imageUrl: 'https://picsum.photos/300/200/?image=1043',
            },
            {
              manId: '5',
              nameEn: 'Cyber',
              nameCn: '赛博',
              description: 'good company good company',
              gmcType: '1',
              gmcUrl: 'https://segmentfault.com/a',
              imageUrl: 'https://picsum.photos/300/200/?image=1043',
            },
            {
              manId: '6',
              nameEn: 'Cyber',
              nameCn: '赛博',
              description: ' ',
              gmcType: '1',
              gmcUrl: 'https://segmentfault.com/a',
              imageUrl: 'https://picsum.photos/300/200/?image=1043',
            },
            {
              manId: '7',
              nameEn: 'Cyber',
              nameCn: '赛博',
              description: 'good company good companygood company good company',
              gmcType: '1',
              gmcUrl: 'https://segmentfault.com/a',
              imageUrl: 'https://picsum.photos/300/200/?image=1043',
            },
            {
              manId: '8',
              nameEn: 'Cyber',
              nameCn: '赛博',
              description: 'good company good company',
              gmcType: '1',
              gmcUrl: 'https://segmentfault.com/a',
              imageUrl: 'https://picsum.photos/300/200/?image=1043',
            },
            {
              manId: '9',
              nameEn: 'Cyber',
              nameCn: '赛博',
              description: 'good company good company',
              gmcType: '1',
              gmcUrl: 'https://segmentfault.com/a',
              imageUrl: 'https://picsum.photos/300/200/?image=1043',
            },
            {
              manId: '10',
              nameEn: 'Cyber',
              nameCn: '赛博',
              description: 'good company good company',
              gmcType: '1',
              gmcUrl: 'https://segmentfault.com/a',
              imageUrl: 'https://picsum.photos/300/200/?image=1043',
            }
          ]
        }
      },

      methods: {
        click_add() {
          this.showAddCompany = true;
        },
        onOk() {
          this.add_company.gmcType = this.add_company.gmcType.id;
          this.add_company.userId = this.$store.state.mvo.userId;
          console.log(this.add_company);
          this.showAddCompany = false;
          addCompany(this, this.add_company)
            .then(res=>{
              console.log(res);
            })
        }
      },

      created() {
        this.company_list = this.fake_data; // to be deleted...
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
