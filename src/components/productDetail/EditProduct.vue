<template>
  <div>
    <va-card
      title="Basic information"
    >
      <!--   name & skuCd   -->
      <div class="layout gutter--md fluid">
        <div class="row">

          <div class="flex lg6">
            <va-input
              v-model="details.name"
              type="text"
              label="Product Name"
              :error="!!nameErrors.length"
              :error-messages="nameErrors"
            />
          </div>

          <div class="flex lg6">
            <va-input
              v-model="details.skuCd"
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
              v-model="details.model"
              type="text"
              label="Product Model"
              :error="!!modelErrors.length"
              :error-messages="modelErrors"
            />
          </div>

          <div class="flex lg4">
            <va-input
              v-model="details.retailPrice"
              type="text"
              label="Retail Price"
              :error="!!retailPriceErrors.length"
              :error-messages="retailPriceErrors"
            />
          </div>

          <div class="flex lg4">
            <va-input
              v-model="details.minRetailPrice"
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
              v-model="details.width"
              type="text"
              label="Width"
              :error="!!widthErrors.length"
              :error-messages="widthErrors"
            />
          </div>

          <div class="flex lg3">
            <va-input
              v-model="details.height"
              type="text"
              label="Height"
              :error="!!heightErrors.length"
              :error-messages="heightErrors"
            />
          </div>

          <div class="flex lg3">
            <va-input
              v-model="details.length"
              type="text"
              label="Length"
              :error="!!lengthErrors.length"
              :error-messages="lengthErrors"
            />
          </div>

          <div class="flex lg3">
            <va-input
              v-model="details.weight"
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
              v-model="details.description"
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
              v-model="imgUrl"
            />
          </div>

        </div>
      </div>

    </va-card>



    <va-card
      title="Other information"
    >

      <!--   warrantyDay & replenishmentPeriod  -->
      <div class="layout gutter--md fluid">
        <div class="row">

          <div class="flex lg6">
            <va-date-picker
              label="Warranty Day"
              v-model="details.warrantyDay"
              :error="!!warrantyDayErrors.length"
              :error-messages="warrantyDayErrors"
            />
          </div>

          <div class="flex lg6">
            <va-input
              v-model="details.replenishmentPeriod"
              type="text"
              label="Replenishment Period"
              :error="!!replenishmentPeriodErrors.length"
              :error-messages="replenishmentPeriodErrors"
            />
          </div>


        </div>
      </div>



      <!--   warranty   -->
      <div class="layout gutter--md fluid">
        <div class="row">

          <div class="flex lg12">
            <va-input
              v-model="details.warranty"
              type="textarea"
              label="Warranty"
              :error="!!warrantyErrors.length"
              :error-messages="warrantyErrors"
            />
          </div>

        </div>
      </div>

      <!--    Button: Confirm & Cancel    -->
      <div class="layout gutter--md fluid">
        <div class="row">

          <va-button @click="cancel" small flat color="gray" class="flex lg2 offset--lg7"> Cancel </va-button>
          <va-button @click="editProduct" small class="flex lg2"> Edit Product </va-button>

        </div>
      </div>


    </va-card>



  </div>
</template>

<script>
  import {editProductApi, getProductDetail} from '../../api/mvo'
  export default {
    name: "edit-product",
    data() {
      return {
        details: {
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
        },
        imgUrl: '',

        fake_data: {
          name: 'xb',
          skuCd: '125313',
          model: 'V3',
          description: 'goodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgood',
          retailPrice: '12',
          minRetailPrice: '10',
          width: '5',
          height: '5',
          length: '5',
          weight: '5',
          warrantyDay: '2017-05-02',
          replenishmentPeriod: '45',
          warranty: '34135431543454',
        },

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
      }
    },
    props: {
      companyList: Object,
      brandList: Object,
      proId: Number
    },
    created() {
      // To be deleted
      console.log(123)
      this.details = this.fake_data;
      console.log(this.details)
      getProductDetail(this, {
        proId: this.proId
      }).then((res)=>{
        console.log(res.data)
        this.details = res.data.data[0];
        var details = this.details;
        this.details.name = details.NAME;
        this.details.skuCd =  details.sku_cd;
        this.details.model = details.model;
        this.details.description = details.description;
        this.details.retailPrice = details.retail_price;
        this.details.minRetailPrice = details.min_retail_price;
        this.details.width = details.width;
        this.details.height = details.height;
        this.details.length = details.length;
        this.details.weight =  details.weight;
        this.details.warrantyDay = details.warranty_day;
        this.details.replenishmentPeriod =  details.replenishment_period;
        this.details.warranty = details.warranty;
      })
    },
    computed: {
      formReady () {
        return !(
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
          this.warrantyErrors.length
        ) ;
        // return !(this.emailErrors.length || this.passwordErrors.length || this.agreedToTermsErrors.length)
      },
    },
    watch: {
      imgUrl : {
        handler : function(val,oldVal){
          if(val.length == 0){ //无文件
            return;
          }
          else{
            var index = val.length-1;//最新选择的文件
            var fileName = val[index].name;
            var fileSplit = fileName.split(".");
            var fileType = fileSplit[fileSplit.length - 1];
            fileType = fileType.toLowerCase();
            if(fileType == "png"||fileType == "jpg" || fileType == "jpeg"){
              console.log(fileName)

              var formData = new FormData();
              formData.append("file",val[index]);
              formData.append("strId",this.strId);
              console.log(uploadImage(this,formData));
              uploadImage(this,formData).then(
                res => {
                  console.log(res);
                  if(res.status == 200){
                    this.storeImageSrc = res.data.data;
                  }
                  else{
                    console.log(res.message)
                  }
                }
              )
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
              this.imgUrl = [];
            }
          }
        },
        deep : true
      }
    },
    methods: {
      editProduct() {
        this.nameErrors = this.details.name ? [] : ['Name is required!'];
        this.skuCdErrors = this.details.skuCd ? [] : ['SkuCd is required!'];
        this.modelErrors = this.details.model ? [] : ['Model is required!'];
        this.descriptionErrors = this.details.description ? [] : ['Description is required!'];
        this.retailPriceErrors = this.details.retailPrice ? [] : ['RetailPrice is required!'];
        this.minRetailPriceErrors = this.details.minRetailPrice ? [] : ['Minmum retail price is required!'];
        this.widthErrors = this.details.width ? [] : ['Width is required!'];
        this.heightErrors = this.details.height ? [] : ['Height is required!'];
        this.lengthErrors = this.details.length ? [] : ['Length is required!'];
        this.weightErrors = this.details.weight ? [] : ['Weight is required!'];
        this.warrantyDayErrors = this.details.warrantyDay ? [] : ['Warranty day is required!'];
        this.replenishmentPeriodErrors = this.details.replenishmentPeriod ? [] : ['Replenishment period is required!'];
        this.warrantyErrors = this.details.warranty ? [] : ['Warranty is required!'];

        if (!this.formReady) {
          return;
        }

        let postData = {
          proId: this.proId,
          name: this.details.name,
          skuCd: this.details.skuCd,
          model: this.details.model,
          description: this.details.description,
          retailPrice: this.details.retailPrice,
          minRetailPrice: this.details.minRetailPrice,
          width: this.details.width,
          height: this.details.height,
          length: this.details.length,
          weight: this.details.weight,
          warrantyDay: this.details.warrantyDay,
          replenishmentPeriod: this.details.replenishmentPeriod,
          warranty: this.details.warranty,
        };
        this.$emit('editPro', postData);
        editProductApi(this, postData)
          .then((res)=>{
            console.log(res.data)
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
