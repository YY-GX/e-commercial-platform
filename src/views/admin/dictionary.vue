<template>
  <div>
    <va-card title="Order List">
      <div class="row align--center">
        <div class="flex lg4">
          <va-input
            v-model="term"
            placeholder="Search by codeType or description"
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

        <div class="flex lg2" v-show="isloading">
          <hollow-dots-spinner
            :animation-duration="1000"
            :size="100"
            color="skyblue"
          />
        </div>

        <div class="flex lg3">
          <va-button style="margin-top: 0;" color="success" @click.stop="showAdd=true"> add </va-button>
        </div>

      </div>

      <va-data-table
        :fields="fields"
        :data="showList"
        :per-page="parseInt(perPage)"
      >

        <template slot="operateType" slot-scope="props">
          <va-badge :color="getColor(props.rowData)">
            {{getTag(props.rowData)}}
          </va-badge>
        </template>

        <template slot="actions" slot-scope="props">

          <va-button flat small color="green" @click.stop="update(props.rowData)" class="ma-0">
            <!--              {{ getAction(props.rowData) }} -->
            update
          </va-button>

          <va-button flat small color="grey"
                     @click.stop="remove(props.rowData)"
                     class="ma-0">
            remove
          </va-button>

        </template>

      </va-data-table>
    </va-card>

    <va-modal
      v-model="showAdd"
      title="add item in dictionary"
      okText="add"
      :cancelText=" $t('modal.cancel') "
      @ok="confirmAdd"
    >
      <div>
        <div><va-input label="codeType" v-model="my_codeType" :error="codeTypeIsWrong" error-messages="please enter codeType"></va-input></div>
        <div><va-input label="description" v-model="my_description" :error="descriptionIsWrong" error-messages="please enter description"></va-input></div>
        <div><va-input label="typeCd" v-model="my_typeCd" :error="typeCdIsWrong" error-messages="please enter Integer"></va-input></div>
        <div><va-input label="codeVal" v-model="my_codeVal" :error="codeValIsWrong" error-messages="please enter codeVal"></va-input></div>
      </div>
    </va-modal>

    <va-modal
      v-model="showUpdate"
      title="update item in dictionary"
      okText="update"
      :cancelText=" $t('modal.cancel') "
      @ok="confirmUpdate"
    >
      <div>
        <div><va-input label="codeType" v-model="my_codeType" :error="codeTypeIsWrong" error-messages="please enter codeType"></va-input></div>
        <div><va-input label="description" v-model="my_description" :error="descriptionIsWrong" error-messages="please enter description"></va-input></div>
        <div><va-input label="typeCd" v-model="my_typeCd" :error="typeCdIsWrong" error-messages="please enter Integer"></va-input></div>
        <div><va-input label="codeVal" v-model="my_codeVal" :error="codeValIsWrong" error-messages="please enter codeVal"></va-input></div>
      </div>
    </va-modal>

  </div>
</template>

<script>
  import {
    addDictionary,
    approveAudit,
    getAuditRecords,
    getDictionary,
    refuseAudit, removeDictionary,
    updateDictionary
  } from "../../api/admin";
  import HollowDotsSpinner from "epic-spinners/src/components/lib/HollowDotsSpinner";
  import VaInput from "vuestic-ui/src/components/vuestic-components/va-input/VaInput";
  import VaButton from "vuestic-ui/src/components/vuestic-components/va-button/VaButton";
  export default {
    name: "order-main",
    components: {
      VaInput,
      HollowDotsSpinner,
      VaButton
    },
    data() {
      return {
        fieldData: [],
        term: '',
        perPage: '10',
        perPageOptions: ['5', '10', '20', '30', '50'],
        typeOptions: [{id : 1, typeName : "recharge"},{id : 2, typeName : "withdraw"}],
        type : 0,
        showList : [],
        isloading : false,
        my_codeType : "",
        my_description: "",
        my_typeCd: "",
        my_codeVal: "",
        showAdd : false,
        showUpdate : false,
        updateId : 0
      }
    },
    methods: {

      remove(row){
        var data = {"cdmId" : row.cdmId}
        removeDictionary(this,data).then(res=>{
          console.log(res);
          getDictionary(this).then(response=>{
            console.log(response);
            if (response.status == 200) {
              this.fieldData = response.data.data;
              this.showList = this.fieldData;
              console.log(this.fieldData);
            } else {
              console.log('Return 500!')
            }
          })
        })
      },

      update(row) {
        this.updateId = row.cdmId;
        this.my_codeType = row.codeType;
        this.my_description = row.description;
        this.my_typeCd = row.typeCd;
        this.my_codeVal = row.codeVal;
        this.showUpdate = true;
      },

      getColor(row) {
        let state = row.operateType;
        if (state === '1') {
          return "#fcbf49"
        } else {
          return '#6a6b83'
        }
      },
      getTag(row) {
        let state = row.operateType;
        if (state === '1') {
          return "Recharge";
        } else {
          return 'Withdraw'
        }
      },
      confirmAdd(){
        if(!(this.codeTypeIsWrong||this.descriptionIsWrong||this.typeCdIsWrong||this.codeValIsWrong)){
          var data = {"codeType" : this.my_codeType, "description" : this.my_description,
            "typeCd" : this.my_typeCd, "codeVal" : this.my_codeVal}
          addDictionary(this,data).then(res=>{
            console.log(res);
            this.my_codeType = "";
            this.my_description = "";
            this.my_typeCd = "";
            this.my_codeVal = "";
            getDictionary(this).then(response=>{
              console.log(response);
              if (response.status == 200) {
                this.fieldData = response.data.data;
                this.showList = this.fieldData;
                console.log(this.fieldData);
              } else {
                console.log('Return 500!')
              }
            })
          })
        }
      },
      confirmUpdate(){
        if(!(this.codeTypeIsWrong||this.descriptionIsWrong||this.typeCdIsWrong||this.codeValIsWrong)){
          var data = {"cdmId" : this.updateId,"codeType" : this.my_codeType, "description" : this.my_description,
            "typeCd" : this.my_typeCd, "codeVal" : this.my_codeVal};
          updateDictionary(this,data).then(res=>{
            console.log(res);
            this.updateId = 0;
            this.my_codeType = "";
            this.my_description = "";
            this.my_typeCd = "";
            this.my_codeVal = "";
            getDictionary(this).then(response=>{
              console.log(response);
              if (response.status == 200) {
                this.fieldData = response.data.data;
                this.showList = this.fieldData;
                console.log(this.fieldData);
              } else {
                console.log('Return 500!')
              }
            })
          })
        }
      },
      searchTransaction(){
        var newList = []
        if (!this.term || this.term.length < 1) {
          newList = this.fieldData
        }
        else{
          newList = this.fieldData.filter(item => {
            return item.codeType.toLowerCase().includes(this.term.toLowerCase()) || item.description.toLowerCase().includes(this.term.toLowerCase())
          })
        }
        this.showList = newList;
      }
    },
    watch : {
      term : function(val,oldval){
        clearTimeout(this.timer); //清除之前的定时器

        this.timer = setTimeout(()=>{
          this.isloading = true;
          setTimeout(()=>{this.isloading=false;
            this.searchTransaction();
          },2000)
        },1000)
      }
    },
    computed: {
      codeTypeIsWrong (){
        return this.my_codeType === "";
      },
      descriptionIsWrong (){
        return this.my_description === "";
      },
      typeCdIsWrong (){
        var data = Number(this.my_typeCd);
        if(isNaN(data)){
          return true;
        } else if(this.my_typeCd === ""||this.my_typeCd === null){
          return true;
        }
        return false;
      },
      codeValIsWrong(){
        return this.my_codeVal === "";
      },
      fields () {
        return [{
          name: 'codeType',
          title: 'code Type',
        }, {
          name: 'description',
          title: 'description',
        }, {
          name: 'typeCd',
          title: 'code',
        },
          {
            name: 'codeVal',
            title: 'codeVal',
          },
          {
            name: '__slot:actions',
            dataClass: 'text-right',
          }
        ]
      },
      filteredData () {
        if (!this.term || this.term.length < 1) {
          return this.fieldData
        }
        return this.fieldData.filter(item => {
          return item.transactionAuditId.toLowerCase().startsWith(this.term.toLowerCase()) || item.username.toLowerCase().includes(this.term.toLowerCase())
        })
      },
    },
    created() {
      getDictionary(this).then(res=>{
        console.log(res.data);
        if (res.status == 200) {
          this.fieldData = res.data.data;
          this.showList = this.fieldData;
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
