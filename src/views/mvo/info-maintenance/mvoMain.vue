<template>
    <div>

      <div class="flex lg12">

        <va-card
          stripe="info"
        >
          <template slot="header">
            <va-icon name="fa fa-suitcase mr-3" color="info"/>
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

          <!--   upload   -->
          <div class="layout gutter--md fluid">
            <div class="row">

              <div class="flex lg12">
                <va-file-upload
                  type="single"
                  dropzone
                  v-model="imgArr"
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
  import {addCompany, getCompanyInfo, uploadCompanyImage} from '../../../api/mvo'
  import store from '../../../store/index';

    export default {
      name: "mvo-main",
      components: {
        cubeItem
      },
      store: store,
      data() {
        return {
          imgArr: [],
          imgForm: new FormData(),
          imgUrl: '',

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
            gmcType: {
              id: 1,
              description: 'TÜV',
            },
            gmcUrl: ''
          },

          nameEnErrors: [],
          nameCnErrors: [],
          descriptionErrors: [],
          gmcTypeErrors: [],
          gmcUrlErrors: [],

          company_list: null,
          fake_data: []
        }
      },

      computed: {
        formReady () {
          return !this.nameEnErrors.length &&
                !this.nameCnErrors.length &&
                !this.descriptionErrors.length &&
                !this.gmcTypeErrors.length &&
                !this.gmcUrlErrors.length
        },
      },


      watch: {
        imgArr : { //当storePicture数组变化（用户新上传时）
          handler : function(val, oldVal){
            console.log(val);
            if(val.length === 0){ //无文件
              return;
            }
            else{
              var index = val.length - 1;//最新选择的文件
              var fileName = val[index].name;
              var fileSplit = fileName.split(".");
              var fileType = fileSplit[fileSplit.length - 1];
              fileType = fileType.toLowerCase();
              if(fileType === "png"||fileType === "jpg" || fileType === "jpeg"){
                console.log(fileName);
                var formData = new FormData();
                formData.append("file",val[index]);

                this.imgForm = formData;
              }
              else{
                console.log(fileType);
                this.showToast(
                  "file is not an image, please choose an image file",
                  {
                    icon: 'fa-exclamation',
                    position: 'top-right',
                    duration: 2500,
                    fullWidth: false,
                  }
                );
                this.imgArr = [];
              }
            }
          },
          deep : true
        }

      },

      methods: {
        click_add() {
          this.showAddCompany = true;
        },
        onOk() {
          this.add_company.gmcType = this.add_company.gmcType.id;
          this.add_company.userId = this.$store.state.mvo.userId;

          this.nameEnErrors = this.add_company.nameEn ? [] : 'nameEn is required';
          this.nameCnErrors = this.add_company.nameCn ? [] : 'nameCn is required';
          this.descriptionErrors = this.add_company.description ? [] : 'description is required';
          this.gmcTypeErrors = this.add_company.gmcType ? [] : 'gmcType is required';
          this.gmcUrlErrors = this.add_company.gmcUrl ? [] : 'gmcUrl is required';
          if (!this.formReady) {
            this.showAddCompany = true;
            return;
          }

          console.log(this.add_company);
          this.showAddCompany = false;

          // add to the current page
          // this.add_company['imageUrl'] ='https://picsum.photos/300/200/?image=1043'; // to be deleted...
          // this.company_list.push(this.add_company);

          addCompany(this, this.add_company)
            .then(res=>{
              console.log(res);
              let manId = res.data.data.manId;
              this.imgForm.append("manId", manId);
              uploadCompanyImage(this, this.imgForm)
                .then(res => {
                  console.log(res);
                  this.add_company['imageUrl'] = res.data.data;
                  this.company_list.push(this.add_company);
                })
            })
        }
      },

      created() {
        // this.company_list = this.fake_data; // to be deleted...
        console.log(this.$store.state.mvo);
        getCompanyInfo(this, {userId: this.$store.state.mvo.userId})
          .then((res) => {
            console.log(123)
            console.log(res);
            console.log(123)
            this.company_list = res.data.data;
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
</style>
