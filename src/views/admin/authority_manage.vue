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


      </div>

      <va-data-table
        :fields="fields"
        :data="showList"
        :per-page="parseInt(perPage)"
      >

        <template slot="role" slot-scope="props">
          <va-badge :color="getColor(props.rowData.role.roleId)">
            {{props.rowData.role.name}}
          </va-badge>
        </template>

        <template slot="actions" slot-scope="props">

          <va-button flat small color="green" @click.stop="edit(props.rowData)" class="ma-0">
            <!--              {{ getAction(props.rowData) }} -->
            edit authority
          </va-button>

        </template>

      </va-data-table>
    </va-card>

    <va-modal
      v-model="showEdit"
      title="edit user's authority"
      okText="confirm"
      :cancelText=" $t('modal.cancel') "
      @ok="confirmEdit"
    >
      <div style="width: 300px;">
        <va-data-table
          style="width: 300px;"
          :fields="littlefields"
          :per-page="parseInt('3')"
          :data="permissions"
        >
          <template slot="modal" slot-scope="props">
            <va-toggle v-model="props.rowData.modal"></va-toggle>
          </template>
        </va-data-table>
      </div>
    </va-modal>


  </div>
</template>

<script>
  import {
    addDictionary, addPermission,
    approveAudit,
    getAuditRecords,
    getDictionary, getUsers,
    refuseAudit, removeDictionary, removePermission,
    updateDictionary
  } from "../../api/admin";
  import HollowDotsSpinner from "epic-spinners/src/components/lib/HollowDotsSpinner";
  import VaInput from "vuestic-ui/src/components/vuestic-components/va-input/VaInput";
  import VaButton from "vuestic-ui/src/components/vuestic-components/va-button/VaButton";
  import VaDataTable from "vuestic-ui/src/components/vuestic-components/va-data-table/VaDataTable";
  import VaToggle from "vuestic-ui/src/components/vuestic-components/va-toggle/VaToggle";
  export default {
    name: "order-main",
    components: {
      VaToggle,
      VaDataTable,
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
        type : 0,
        showList : [],
        isloading : false,
        my_codeType : "",
        my_description: "",
        my_typeCd: "",
        my_codeVal: "",
        showEdit : false,
        updateId : 0,
        permissions : [{id: 1,name: 'company_detail',modal : false},
          {id: 2,name: 'brand_detail',modal : false},
          {id: 3,name: 'mvo_product',modal : false},
          {id: 4,name: 'mvo_order',modal : false},
          {id: 5,name: 'store_detail',modal : false},
          {id: 6,name: 'bvo_product_store',modal : false},
          {id: 7,name: 'bvo_product_wishlist',modal : false},
          {id: 9,name: 'bvo_order',modal : false},
        ],
        littlefields : [{
          name: 'name',
          title: 'username',
        }, {
          name: '__slot:modal',
          title: 'control',
        }],
        user_permission : [],
        user_id : 0
      }
    },
    methods: {

      edit(row){
        console.log(row);
        for(var j=0;j<this.permissions.length;j++){
          this.permissions[j].modal = false;
        }
        this.user_permission = row.permissions;
        this.user_id = row.userId;
        for(var i=0;i<row.permissions.length;i++){
          var id = row.permissions[i].permissionId;
          if(Number(id) != 9){
            this.permissions[id-1].modal = true;
          }
          else{
            this.permissions[7].modal = true;
          }
        }
        console.log(this.permissions);
        this.showEdit = true;
      },
      getColor(id) {
        if (id === '1') {
          return "#fcbf49"
        } else if(id === '2') {
          return '#02c39a';
        }else {
          return '#6a6b83'
        }
      },

      confirmEdit(){
        for(var i=0;i<this.permissions.length;i++){
          var id = this.permissions[i].id;
          if(this.permissions[i].modal === false){
            for(var j=0;j<this.user_permission.length;j++){
              if(id == Number(this.user_permission[j].permissionId)){
                //调用移除接口
                removePermission(this,{"userId":this.user_id,"permissionId":id}).then(res=>{
                  console.log(res);
                })
                break;
              }
            }
          }
          else{
            var find = false;
            for(var j=0;j<this.user_permission.length;j++){
              if(id == Number(this.user_permission[j].permissionId)){
                find = true;
                break;
              }
            }
            if(!find){
              //调用添加接口
              addPermission(this,{"userId":this.user_id,"permissionId":id}).then(res=>{
                console.log(res);
              })
            }
          }
        }
        setTimeout(()=>{
          this.isloading = true;
          setTimeout(()=>{
            getUsers(this).then(res=>{
              console.log(res.data);
              if (res.status == 200) {
                this.fieldData = res.data.data;
                this.showList = this.fieldData;
                console.log(this.fieldData);
              } else {
                console.log('Return 500!')
              }
              this.isloading=false;
            })
          },8000)
        },1000)
      },

      searchTransaction(){
        var newList = []
        if (!this.term || this.term.length < 1) {
          newList = this.fieldData
        }
        else{
          newList = this.fieldData.filter(item => {
            return item.name.toLowerCase().includes(this.term.toLowerCase()) || item.role.name.toLowerCase().includes(this.term.toLowerCase())
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
          name: 'name',
          title: 'username',
        }, {
          name: '__slot:role',
          title: 'role',
        }, {
          name: '__slot:actions',
          dataClass: 'text-right',
        }
        ]
      }
    },
    created() {
      getUsers(this).then(res=>{
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
