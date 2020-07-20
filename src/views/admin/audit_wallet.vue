<template>
  <div>
    <va-card title="Order List">
      <div class="row align--center">
        <div class="flex lg4">
          <va-input
            v-model="term"
            placeholder="Search by transaction id or username"
            @input="search"
            removable
          >
            <va-icon name="fa fa-search" slot="prepend" />
          </va-input>
        </div>

        <div class="flex lg3">
          <va-select
            v-model="type"
            label="operate type"
            :options="typeOptions"
            textBy="typeName"
          />
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

          <va-button flat small color="green" @click.stop="approve(props.rowData)" class="ma-0">
            <!--              {{ getAction(props.rowData) }} -->
            approve
          </va-button>

          <va-button flat small color="grey"
                     @click.stop="refuse(props.rowData)"
                     class="ma-0">
            refuse
          </va-button>

        </template>

      </va-data-table>
    </va-card>

  </div>
</template>

<script>
  import {approveAudit, getAuditRecords, refuseAudit} from "../../api/admin";
  import HollowDotsSpinner from "epic-spinners/src/components/lib/HollowDotsSpinner";
  export default {
    name: "order-main",
    components: {
      HollowDotsSpinner
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
        isloading : false
      }
    },
    methods: {

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
      approve(row){
        var data = {"walletId" : row.walletId, "transactionAuditId" : row.transactionAuditId}
        approveAudit(this,data).then(res=>{
          console.log(res);
          var newList = [];
          for(var i=0;i<this.fieldData.length;i++){
            if(row.walletId == this.fieldData[i].walletId && row.transactionAuditId == this.fieldData[i].transactionAuditId){
              continue;
            }
            else{
              newList = newList.concat(this.fieldData[i]);
            }
          }
          this.fieldData = newList;
          this.searchTransaction();
        })
      },
      refuse(row){
        var data = {"walletId" : row.walletId, "transactionAuditId" : row.transactionAuditId}
        refuseAudit(this,data).then(res=>{
          console.log(res);
          var newList = [];
          for(var i=0;i<this.fieldData.length;i++){
            if(row.walletId == this.fieldData[i].walletId && row.transactionAuditId == this.fieldData[i].transactionAuditId){
              continue;
            }
            else{
              newList = newList.concat(this.fieldData[i]);
            }
          }
          this.fieldData = newList;
          this.searchTransaction();
        })
      },
      searchTransaction(){
        var newList = []
        if (!this.term || this.term.length < 1) {
          newList = this.fieldData
        }
        else{
          newList = this.fieldData.filter(item => {
            return item.transactionAuditId.toLowerCase().startsWith(this.term.toLowerCase()) || item.username.toLowerCase().includes(this.term.toLowerCase())
          })
        }
        var newnewList = [];
        console.log(this.type.id);
        if(this.type != 0) {
          for (var i = 0; i < newList.length; i++) {
            if (Number(newList[i].operateType) == this.type.id) {
              newnewList = newnewList.concat(newList[i]);
            } else {
              continue;
            }
          }
          this.showList = newnewList;
        }
        else{
          this.showList = newList;
        }
      }
    },
    watch : {
      type : function(val,oldval){
        clearTimeout(this.timer); //清除之前的定时器

        this.timer = setTimeout(()=>{
          this.isloading = true;
          setTimeout(()=>{this.isloading=false;
            this.searchTransaction();
          },2000)
        },1000)
      },
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
      fields () {
        return [{
          name: 'transactionAuditId',
          title: 'transaction ID',
        }, {
          name: 'username',
          title: 'username',
        }, {
          name: '__slot:operateType',
          title: 'operateType',
        },
          {
          name: 'operateMoney',
          title: 'operate money',
        },
          {
            name: 'createTime',
            title: 'create time'
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
      getAuditRecords(this).then(res=>{
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
