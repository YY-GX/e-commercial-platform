<template>
  <div>
<!--    <div class="basic_info">-->
<!--      <div style="display: flex; flex-direction: row; justify-content: space-between;">-->
<!--        <div class="title"><span>basic information</span></div>-->
<!--        &lt;!&ndash; 修改按钮 &ndash;&gt;-->
<!--        <div style="display: flex; flex-direction: row; justify-content: right; align-content: center;">-->
<!--          <div style="display: flex; align-content: center;" v-show="!isediting"><va-button small style="margin-top: 0;" @click="edit">edit</va-button></div>-->
<!--          <div style="display: flex; align-content: center;" v-show="isediting"><va-button small color="success" style="margin-top: 0;" @click="confirmEdit">confirm</va-button></div>-->
<!--          <div style="display: flex; align-content: center;" v-show="isediting"><va-button small color="warning" style="margin-top: 0;" @click="cancelEdit">cancel</va-button></div>-->
<!--        </div>-->
<!--      </div>-->

<!--      <div class="content">-->
<!--        <va-card stripe="info">-->
<!--          <template slot="header">-->
<!--            <va-icon name="fa fa-suitcase mr-3" color="success"/>-->
<!--            <h4 class="mt-0 mb-0"> basic information </h4>-->
<!--            <va-button small style="margin-top: 0;" @click="edit">edit</va-button>-->
<!--          </template>-->

<!--          &lt;!&ndash; 展示的某一项数据  &ndash;&gt;-->
<!--          <div class="name" style="display: flex; flex-direction: row; justify-content: space-around; width: 300px;">-->
<!--            <div class="param">name:</div>-->
<!--            &lt;!&ndash; 数据与输入框 &ndash;&gt;-->
<!--            <div class="data" v-show="!isediting">{{bvo_name}}</div>-->
<!--            <div class="edit" v-show="isediting"><va-input :error="nameIsNull" error-messages="name can't be null" v-model="edit_bvo_name"/></div>-->
<!--          </div>-->
<!--        </va-card>-->
<!--      </div>-->
<!--    </div>-->


    <div class="store_list">
<!--      <div style="display: flex; flex-direction: row; justify-content: space-between;">-->
<!--        <div class="title"><span>stores</span></div>-->
<!--        <div class="add" style="display: flex; align-content: center;" ><va-button style="margin-top: 0;" @click="addNewStore" icon="fa fa-plus">add</va-button></div>-->
<!--      </div>-->

      <va-card stripe="info">
        <template slot="header">
          <va-icon name="fa fa-suitcase mr-3" color="success"/>
          <h4 class="mt-0 mb-0"> stores </h4>
          <va-button small outline style="margin-left: 90%; margin-top: 2%;" @click="addNewStore">Add Store</va-button>
        </template>

        <div class="loading" v-show="isloading">
          <hollow-dots-spinner
            :animation-duration="1000"
            :size="80"
            color="skyblue"
          />
        </div>
        <div class="stores" v-show="!isloading">
          <!-- vfor 分页方式 -->
          <div class="store_container" v-for="store in stores.slice((activePage-1)*pageSize,activePage*pageSize)">
            <!--<my-cube :image-url="'https://picsum.photos/300/200/?image=898'" :title="store.storeName" :intro="generateIntro(store.platformType)" :type="'store'" :id="store.strId" :whole-data="store"></my-cube>-->
            <cube-item :img_url="store.imageUrl" :img_title="store.storeName" :img_intro="generateIntro(store.platformType)" :type="'store'" :cube_id="store.strId" :whole-data="store" @deletestore="deleteStore"></cube-item>
          </div>
        </div>
        <div class="pagination">
          <!-- 分页按钮， 绑定activePage -->
          <va-pagination
            :pages="totalPage"
            :visible-pages="5"
            :boundary-links="false"
            v-model="activePage"
          />
        </div>
      </va-card>
    </div>


    <va-modal
      v-model="addNewShowed"
      size="medium"
      title="add new store"
      okText="add"
      :cancelText=" $t('modal.cancel') "
      @ok="confirmAddNewStore"
      >
      <slot>
        <div>
          <va-input
            label="store name"
            v-model="newStoreName">
          </va-input>

          <va-select
          label="platform type"
          v-model="newStorePlatform"
          textBy="description"
          :options="platforms"
        />
        </div>
      </slot>
    </va-modal>


  </div>
</template>

<script>
  import VaInput from "vuestic-ui/src/components/vuestic-components/va-input/VaInput";
  import MyCube from "../../../components/myComponents/myCube";
  import VaButton from "vuestic-ui/src/components/vuestic-components/va-button/VaButton";
  import VaPagination from "vuestic-ui/src/components/vuestic-components/va-pagination/VaPagination";
  import VaCard from "vuestic-ui/src/components/vuestic-components/va-card/VaCard";
  //接口方法
  import {getBVO_basic,getBVO_stores,editBVO_basic,addBVO_stores} from "../../../api/bvo.js"
  import VaModal from "vuestic-ui/src/components/vuestic-components/va-modal/VaModal";
  //loading组件
  import HollowDotsSpinner from "epic-spinners/src/components/lib/HollowDotsSpinner";
  import CubeItem from "../../../components/myComponents/cubeItem";
  export default {
    name: "BVOMain",
    components: {CubeItem, HollowDotsSpinner, VaModal, VaCard, VaPagination, VaButton, MyCube, VaInput},
    created : function() {
      console.log(this.$store.state.bvo.bvo_usrId);
      getBVO_basic(this,this.$store.state.bvo.bvo_usrId).then(
        res => {
          this.bvo_name = res.data.data.name;
          this.edit_bvo_name = this.bvo_name;
          this.dsrId = parseInt(res.data.data.dsrId);
          this.$store.commit('changeDsrId', this.dsrId);
          console.log(res);
          getBVO_stores(this, this.dsrId).then(
            response => {
              if(response.status == 200){
                this.stores = response.data.data;
                for(var i=0; i<this.stores.length;i++){
                  this.stores[i].strId = parseInt(this.stores[i].strId);
                  this.stores[i].platformType = parseInt(this.stores[i].platformType);
                  this.stores[i].storeStsCd = parseInt(this.stores[i].storeStsCd);
                }
              }
            else{
                console.log(response.message)
              }
            }
          )
        }
      )

      /*
      this.bvo_name = 'soapYE';
      this.edit_bvo_name = this.bvo_name;
      this.dsrId = 1;
      this.stores = [
        {
          platformType: 1,
          storeName : "Nike1",
          strId : 1,
          storeStsCd : 1, //api对接状态（1.刚授权 2.正常对接 3. token 过期 4. token 出错 5.网店关闭）
          stsDc : "hello" //备注
        },
        {
          platformType: 1,
          storeName : "Nike2",
          strId : 2,
          storeStsCd : 1, //api对接状态（1.刚授权 2.正常对接 3. token 过期 4. token 出错 5.网店关闭）
          stsDc : "hello2" //备注
        },
        {
          platformType: 1,
          storeName : "Nike3",
          strId : 3,
          storeStsCd : 1, //api对接状态（1.刚授权 2.正常对接 3. token 过期 4. token 出错 5.网店关闭）
          stsDc : "hello3" //备注
        },
        {
          platformType: 1,
          storeName : "Nike4",
          strId : 4,
          storeStsCd : 1, //api对接状态（1.刚授权 2.正常对接 3. token 过期 4. token 出错 5.网店关闭）
          stsDc : "hello4" //备注
        },
        {
          platformType: 1,
          storeName : "Nike5",
          strId : 5,
          storeStsCd : 1, //api对接状态（1.刚授权 2.正常对接 3. token 过期 4. token 出错 5.网店关闭）
          stsDc : "hello5" //备注
        },
        {
          platformType: 1,
          storeName : "Nike6",
          strId : 6,
          storeStsCd : 1, //api对接状态（1.刚授权 2.正常对接 3. token 过期 4. token 出错 5.网店关闭）
          stsDc : "hello6" //备注
        },
        {
          platformType: 1,
          storeName : "Nike7",
          strId : 7,
          storeStsCd : 1, //api对接状态（1.刚授权 2.正常对接 3. token 过期 4. token 出错 5.网店关闭）
          stsDc : "hello7" //备注
        },
        {
          platformType: 1,
          storeName : "Nike8",
          strId : 1,
          storeStsCd : 1, //api对接状态（1.刚授权 2.正常对接 3. token 过期 4. token 出错 5.网店关闭）
          stsDc : "hello8" //备注
        },
        {
          platformType: 1,
          storeName : "Nike9",
          strId : 1,
          storeStsCd : 1, //api对接状态（1.刚授权 2.正常对接 3. token 过期 4. token 出错 5.网店关闭）
          stsDc : "hello9" //备注
        },
        {
          platformType: 1,
          storeName : "Nike10",
          strId : 1,
          storeStsCd : 1, //api对接状态（1.刚授权 2.正常对接 3. token 过期 4. token 出错 5.网店关闭）
          stsDc : "hello10" //备注
        }
      ];
      */

      },
    data : function(){
      return {
        bvo_name : '',//假数据，bvo名称
        edit_bvo_name : '',
        dsrId : 0,
        //假数据, store列表
        stores : [],
        isediting : false,//是否在编辑基本信息
        activePage : 1,//当前页面
        pageSize : 3,//页面显示的数量
        platforms : [
          {id : 1,
           description : "Amazon"
          },
          {
            id : 2,
            description : "ebay"
          }
        ],
        newStoreName : "",
        newStorePlatform : 0,
        addNewShowed : false,
        isloading : false
      }
    },
    computed :{
      nameIsNull : function () {//判断数据是否为空，编辑时提醒
        return this.edit_bvo_name == "";
      },
      totalPage : function () {
        var pages = Math.ceil(this.stores.length / this.pageSize);//向上取整
        return pages;
      }
    },
    methods : {
      deleteStore : function(data){
        var newStores = [];
        for(var i=0;i<this.stores.length;i++ ){
          if(this.stores[i].strId == data.strId){
            continue;
          }
          else{
            newStores = newStores.concat(this.stores[i]);
          }
        }
        this.stores = newStores;
        console.log(this.stores.length);
      },
      generateIntro: function(type){//用于显示商店基本信息
        switch (type) {
          case 1:
            return 'This is an Amazon store';
          case 2:
            return 'This is an ebay store';
          default:
            return 'This is a store'
        }
      },
      edit : function(){
        this.isediting = true;
      },
      confirmEdit : function(){
        if(this.edit_bvo_name == ""){//提醒用户输入不能为空
          this.showToast(
            "Your input is invalid, please check them",
            {
              icon: 'fa-exclamation',
              position: 'top-right',
              duration: 2500,
              fullWidth: false,
            }
          );
          return;
        }
        editBVO_basic(this,{'dsrId':this.dsrId,'name':this.edit_bvo_name}).then(
          res => {
            if(res.status == 200){
              this.bvo_name = this.edit_bvo_name;
            }
            else{
              console.log(res.message)
            }
            this.isediting = false;
          }
        );
      },
      cancelEdit : function(){
        this.isediting = false;
        this.edit_bvo_name = this.bvo_name;
      },
      addNewStore : function(){
        this.addNewShowed = true;
        this.newStoreName = "";
        this.newStorePlatform = 0;
      },
      confirmAddNewStore : function(){
        if(this.newStoreName == "" || this.newStorePlatform == 0){
          this.showToast(
            "Your input is invalid, please check them",
            {
              icon: 'fa-exclamation',
              position: 'top-right',
              duration: 2500,
              fullWidth: false,
            }
          );
        }
        else {
          this.addNewShowed = false;
          this.isloading = true;

          addBVO_stores(this,{
            dsrId : this.dsrId ,
            platformType : this.newStorePlatform.id,
            storeName : this.newStoreName
          }).then(
            res => {
              console.log(res);
              if(res.status == 200){
                getBVO_stores(this, this.dsrId).then(
                  response => {
                    if(response.status == 200){
                      this.stores = response.data.data;
                      for(var i=0; i<this.stores.length;i++){
                        this.stores[i].strId = parseInt(this.stores[i].strId);
                        this.stores[i].platformType = parseInt(this.stores[i].platformType);
                        this.stores[i].storeStsCd = parseInt(this.stores[i].storeStsCd);
                      }
                      this.isloading = false;
                    }
                    else{
                      console.log(response.message)
                    }
                  }
                )
              }
              else{
                console.log(res.message);
              }
            }
          )
        }
      }
    }
  }
  //   .title {
  //   font-size: 30px;
  // }
</script>

<style>
  .content {
    margin-top: 10px;
  }

  .name {
    display: flex;
    flex-direction: row;
    width: 600px;
    height: 38px;
  }

  .param {
    height: 38px;
    line-height: 38px;
    font-size: 20px;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    color: #0e4ac4;
  }

  .data {
    height: 38px;
    line-height: 38px;
    width: 200px;
  }

  .edit {
    height: 38px;
    width: 200px;
  }

  .store_list {
    margin-top: 20px;
  }

  .stores {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: left;
  }

  .store_container {
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
