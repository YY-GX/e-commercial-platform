<template>
  <div>
    <va-card
      title="Basic information"
    >


      <!--   company and brand   -->
      <div class="layout gutter--md fluid">
        <div class="row">

          <div class="flex lg6">
            <va-select
              label="company"
              v-model="searchableSelectCompany"
              searchable
              textBy="nameEn"
              key-by="manId"
              :options="companyOptions"
            />
          </div>

          <div class="flex lg6">
            <va-select
              label="brand"
              v-model="searchableSelectBrand"
              searchable
              textBy="nameEn"
              key-by="brdId"
              :options="brandOptions"
            />
          </div>

        </div>
      </div>


      <!--   name & skuCd   -->
      <div class="layout gutter--md fluid">
        <div class="row">

          <div class="flex lg6">
            <va-input
              v-model="name"
              type="text"
              label="Product Name"
              :error="!!nameErrors.length"
              :error-messages="nameErrors"
            />
          </div>

          <div class="flex lg6">
            <va-input
              v-model="skuCd"
              type="text"
              label="Sku Cd"
              :error="!!skuCdErrors.length"
              :error-messages="skuCdErrors"
            />
          </div>

        </div>
      </div>






      <!--   model & retailPrice & minRetailPrice   -->
      <div class="layout gutter--md fluid">
        <div class="row">

          <div class="flex lg4">
            <va-input
              v-model="model"
              type="text"
              label="Product Model"
              :error="!!modelErrors.length"
              :error-messages="modelErrors"
            />
          </div>

          <div class="flex lg4">
            <va-input
              v-model="retailPrice"
              type="text"
              label="Retail Price"
              :error="!!retailPriceErrors.length"
              :error-messages="retailPriceErrors"
            />
          </div>

          <div class="flex lg4">
            <va-input
              v-model="minRetailPrice"
              type="text"
              label="Minimum Retail Price"
              :error="!!minRetailPriceErrors.length"
              :error-messages="minRetailPriceErrors"
            />
          </div>

        </div>
      </div>

      <!--   width & height & length & weight   -->
      <div class="layout gutter--md fluid">
        <div class="row">

          <div class="flex lg3">
            <va-input
              v-model="width"
              type="text"
              label="Width"
              :error="!!widthErrors.length"
              :error-messages="widthErrors"
            />
          </div>

          <div class="flex lg3">
            <va-input
              v-model="height"
              type="text"
              label="Height"
              :error="!!heightErrors.length"
              :error-messages="heightErrors"
            />
          </div>

          <div class="flex lg3">
            <va-input
              v-model="length"
              type="text"
              label="Length"
              :error="!!lengthErrors.length"
              :error-messages="lengthErrors"
            />
          </div>

          <div class="flex lg3">
            <va-input
              v-model="weight"
              type="text"
              label="Weight"
              :error="!!weightErrors.length"
              :error-messages="weightErrors"
            />
          </div>

        </div>
      </div>


      <!--   description   -->
      <div class="layout gutter--md fluid">
        <div class="row">

          <div class="flex lg12">
            <va-input
              v-model="description"
              type="textarea"
              label="Description"
              :error="!!descriptionErrors.length"
              :error-messages="descriptionErrors"
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

    </va-card>



    <va-card
      title="Other information"
    >

      <!--   warrantyDay & replenishmentPeriod & categoryName   -->
      <div class="layout gutter--md fluid">
        <div class="row">

          <div class="flex lg4">
            <va-date-picker
              label="Warranty Day"
              v-model="warrantyDay"
              :error="!!warrantyDayErrors.length"
              :error-messages="warrantyDayErrors"
            />
          </div>

          <div class="flex lg4">
            <va-input
              v-model="replenishmentPeriod"
              type="text"
              label="Replenishment Period"
              :error="!!replenishmentPeriodErrors.length"
              :error-messages="replenishmentPeriodErrors"
            />
          </div>

          <div class="flex lg4">
            <va-input
              v-model="categoryName"
              type="text"
              label="Category Name"
              :error="!!categoryNameErrors.length"
              :error-messages="categoryNameErrors"
            />
          </div>


        </div>
      </div>



      <!--   warranty   -->
      <div class="layout gutter--md fluid">
        <div class="row">

          <div class="flex lg12">
            <va-input
              v-model="warranty"
              type="textarea"
              label="Warranty"
              :error="!!warrantyErrors.length"
              :error-messages="warrantyErrors"
            />
          </div>

        </div>
      </div>


      <va-card
        title="Batch Addition"
      >

        <!--   warrantyDay & replenishmentPeriod & categoryName   -->
        <div class="layout gutter--md fluid">
          <div class="row">

            <div class="flex lg6">
              <va-toggle
                v-model="is_selected"
                label="Whether batch addition or not?"
              />
            </div>

            <div class="flex lg6" v-show="is_selected">
              <va-input
                v-model="batchNum"
                type="text"
                label="Number of batches"
                :error="!!batchNumErrors.length"
                :error-messages="batchNumErrors"
              />
            </div>


          </div>
        </div>




      </va-card>


      <!--    Button: Confirm & Cancel    -->
      <div class="layout gutter--md fluid">
        <div class="row">

          <va-button @click="cancel" small flat color="gray" class="flex lg2 offset--lg7"> Cancel </va-button>
          <va-button @click="addProduct" small class="flex lg2"> Add Product </va-button>

        </div>
      </div>


    </va-card>



  </div>
</template>

<script>
  import {addProductApi,getCompanyInfo, getBrandInfo, uploadImage} from '../../api/mvo'
  export default {
    name: "add-product",
    data() {
      return {
        is_selected: false,
        batchNum: '',
        batchNumErrors: [],

        brdId: '1',
        manId: '1',
        name: '',
        skuCd: '',
        model: '',
        description: '',
        retailPrice: '',
        minRetailPrice: '',
        width: '',
        height: '',
        length: '',
        weight: '',
        warrantyDay: '',
        replenishmentPeriod: '',
        warranty: '',
        categoryName: '',
        imgArr: [],
        imgForm: new FormData(),
        imgUrl: '',

        brdIdErrors: [],
        manIdErrors: [],
        nameErrors: [],
        skuCdErrors: [],
        modelErrors: [],
        descriptionErrors: [],
        retailPriceErrors: [],
        minRetailPriceErrors: [],
        widthErrors: [],
        heightErrors: [],
        lengthErrors: [],
        weightErrors: [],
        warrantyDayErrors: [],
        replenishmentPeriodErrors: [],
        warrantyErrors: [],
        categoryNameErrors: [],


        searchableSelectCompany: '',
        searchableSelectBrand: '',
        companyOptions: [
          {
            id: 1,
            description: 'Company1',
          },
          {
            id: 2,
            description: 'Company2',
          },
          {
            id: 3,
            description: 'Company3',
          },
        ],
        brandOptions: []

      }
    },
    props: {
      companyList: Object,
      brandList: Object,
    },
    created() {
      getCompanyInfo(this, {
        userId: this.$store.state.mvo.userId
      }).then((res) => {
        console.log(res);
        this.companyOptions = res.data.data;
      })
    },
    watch: {
      searchableSelectCompany: function (val, oldVal) {
        console.log('new: %s, old: %s', val, oldVal);
        getBrandInfo(this, {
          manId: this.searchableSelectCompany.manId
        }).then((res) => {
          console.log(res);
          this.brandOptions = res.data.data;
        })
      },

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

              // formData.append("proId",this.strId);
              // uploadImage(this,formData).then(
              //   res => {
              //     console.log(res);
              //     if(res.status == 200){
              //       this.storeImageSrc = res.data.data;
              //     }
              //     else{
              //       console.log(res.message)
              //     }
              //   }
              // )
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
    computed: {
      updateBrandLs() {
        console.log(this.searchableSelectCompany);
        getBrandInfo(this, {
          manId: this.searchableSelectCompany.manId
        }).then((res) => {
          console.log(res);
          return res.data.data;
        })
      },
      formReady () {
        return !(
          this.brdIdErrors.length ||
          this.manIdErrors.length ||
          this.nameErrors.length ||
          this.skuCdErrors.length ||
          this.modelErrors.length ||
          this.descriptionErrors.length ||
          this.retailPriceErrors.length ||
          this.minRetailPriceErrors.length ||
          this.widthErrors.length ||
          this.heightErrors.length ||
          this.lengthErrors.length ||
          this.weightErrors.length ||
          this.warrantyDayErrors.length ||
          this.replenishmentPeriodErrors.length ||
          this.warrantyErrors.length ||
          this.categoryNameErrors.length
        ) ;
        // return !(this.emailErrors.length || this.passwordErrors.length || this.agreedToTermsErrors.length)
      },
    },
    methods: {
      async addProduct() {

        this.brdIdErrors = this.brdId ? [] : ['Brand is required!'];
        this.manIdErrors = this.manId ? [] : ['Company is required!'];
        this.nameErrors = this.name ? [] : ['Name is required!'];
        this.skuCdErrors = this.skuCd ? [] : ['SkuCd is required!'];
        this.modelErrors = this.model ? [] : ['Model is required!'];
        this.descriptionErrors = this.description ? [] : ['Description is required!'];
        this.retailPriceErrors = this.retailPrice ? [] : ['RetailPrice is required!'];
        this.minRetailPriceErrors = this.minRetailPrice ? [] : ['Minmum retail price is required!'];
        this.widthErrors = this.width ? [] : ['Width is required!'];
        this.heightErrors = this.height ? [] : ['Height is required!'];
        this.lengthErrors = this.length ? [] : ['Length is required!'];
        this.weightErrors = this.weight ? [] : ['Weight is required!'];
        this.warrantyDayErrors = this.warrantyDay ? [] : ['Warranty day is required!'];
        this.replenishmentPeriodErrors = this.replenishmentPeriod ? [] : ['Replenishment period is required!'];
        this.warrantyErrors = this.warranty ? [] : ['Warranty is required!'];
        this.categoryNameErrors = this.categoryName ? [] : ['Category Name is required!'];

        if (!this.formReady) {
          return;
        }


        if (this.is_selected) {
          this.batchNumErrors = this.batchNum ? [] : ['Batch number is required!'];
          if (this.batchNumErrors.length) {
            return;
          }

          for (let i = 0; i < parseInt(this.batchNum); i++) {
            await this.addProItem();
          }

        } else {
          this.addProItem();
        }
      },

      addProItem() {
        let postData = {
          brdId: this.searchableSelectBrand.brdId,
          manId: this.searchableSelectCompany.manId,
          name: this.name,
          skuCd: this.skuCd,
          model: this.model,
          description: this.description,
          retailPrice: this.retailPrice,
          minRetailPrice: this.minRetailPrice,
          width: this.width,
          height: this.height,
          length: this.length,
          weight: this.weight,
          warrantyDay: this.warrantyDay,
          replenishmentPeriod: this.replenishmentPeriod,
          warranty: this.warranty,
          categoryName: this.categoryName,
        };

        addProductApi(this, postData)
          .then((res)=>{
            let proId = res.data.data.proId;
            postData['proId'] = proId;
            this.$emit('addPro', postData);
            this.imgForm.append("proId", proId);
            uploadImage(this, this.imgForm)
              .then(res => {
                  console.log('img upload success!');
                  console.log(res);
                  this.imgUrl = res.data.data.imageUrl;
                  // if(res.status == 200){
                  //   this.storeImageSrc = res.data.data;
                  // }
                  // else{
                  //   console.log(res.message)
                  // }
                }
              )
          });
      },

      cancel() {
        this.$emit('close', null);
      }
    }
  }
</script>

<style scoped lang="scss">
  .small-title {
    font-style: italic;
    text-decoration: underline;
  }
</style>
