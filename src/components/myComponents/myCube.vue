<template>
  <!--<div style="display: flex; flex-direction: column; background-color: white; width: 250px; height: 200px; border-radius: 10px;">
    <div style="position: absolute; margin-left: 240px; margin-top: 0;"><va-icon name="fa fa-minus-circle fa-2x"/></div>
    <va-card
      image="https://picsum.photos/300/200/?image=1043"
      :title="name"
    >

    </va-card>
    <div style="width: 200px; height: 150px; margin-left: 25px; margin-top: 20px;">
      <img src="https://picsum.photos/300/200/?image=1043" style="width: auto; height: auto; max-width: 100%; max-height: 100%;">
    </div>
    <div style="text-align: center;">{{name}}</div>
  </div>-->
  <div class="hello">
    <div v-if="!isRemoved" :class="{hover:ishover}" style="display: inline-block; width: 250px; height: 200px;" @click="goToDetail" @mouseover="mouseover" @mouseout="mouseout">
      <!-- 删除标签，防止点击事件冒泡（点击删除同时触发查看详细） -->
      <div v-if="isRemovable" v-show="ishover" style="position: absolute; margin-left: 230px; margin-top: 0; z-index: 3;" @click.stop="remove"><va-icon style="color: grey;" name="fa fa-minus-circle fa-1x"/></div>
      <va-card
        :image="imageUrl"
        :title="title"
      >
        <!-- 插槽更改va-card -->
        <template slot="header">
          <!--<va-icon name="fa fa-heart" color="success"/>-->
          <h5 class="mt-0 mb-0" style="color: #0e4ac4;">{{ title }}</h5>
        </template>
        {{intro}}
        <!-- 遮罩层 -->
        <!--<div v-show="ishover" style=" position: absolute; z-index: 2; background: rgba(0, 0, 0, 0.6); left: 0; top: 0; width: 100%; height: 100%;"></div>-->
      </va-card>
    </div>
    <va-modal
    v-model="showConfirm"
    size="small"
    title=" Remove Confirmation"
    :message="remindMessage"
    :okText=" $t('modal.confirm') "
    :cancelText=" $t('modal.cancel') "
    @ok="confirmRemove"
  />
  </div>
</template>


<script>
  import VaCard from "vuestic-ui/src/components/vuestic-components/va-card/VaCard";
  import VaIcon from "vuestic-ui/src/components/vuestic-components/va-icon/VaIcon";
  import axios from "axios"
  export default {
    name: 'myCube',
    components: { VaIcon, VaCard},
    props: {
      imageUrl : String,
      title : String,
      intro : String,
      type: String ,//英文，全小写(company,brand,store)
      id: Number ,// company,brand或store的id 方便查询详细信息与删除
      wholeData : Object
    },
    data () {
      return {
        showConfirm: false,
        isRemoved : false,
        remindMessage : "are you sure to remove "+this.title +"(id: "+this.id+")?",
        ishover : false
      }
    },
    computed : {
      isRemovable :function () {
        return this.type == "brand";
      }
    },
    methods: {
      goToDetail : function(){

        switch (this.type) { //根据type请求相应api与跳转相应页面
          case "company" :
            this.$store.commit("changeCompanyID",this.id);//保存当前选中id于vuex中
            console.log(this.$store.state.yfy.companyID);
            //this.$router.push("/MVO_main/Company")
            break;
          case "brand" :
            this.$store.commit("changeBrandID",this.id);
            console.log(this.$store.state.yfy.brandID);
            //this.$router.push("/MVO_main/Brand")
            break;
          case "store" :
            this.$store.commit("changeStoreID",this.id);
            this.$store.commit("saveStoreInfo",this.wholeData);
            console.log(this.$store.state.yfy.storeID);
            this.$router.push("BVO_store");
            break;
          default :
            console.log("有问题啊兄弟");
        }
      },
      remove : function(){
        this.showConfirm = true;
      },
      confirmRemove : function () {
        //请求api
        /*
        axios.post("/mvo/brand/delete",{brdId : this.id})
          .then(function (response) {
            this.isRemoved = true;
          })
         */
      },
      mouseover : function () {
        this.ishover = true;
      },
      mouseout : function () {
        this.ishover = false;
      }
    },
  }
</script>

<style lang="scss" scoped>
  .cards-container {
    .va-card {
      margin: 0;
    }
  }

  .hover {
    -webkit-transform: translateY(-3px);
    -ms-transform: translateY(-3px);
    transform: translateY(-3px);
    -webkit-box-shadow: 0 0 10px #999999;
    box-shadow: 0 0 10px #999999;
    -webkit-transition: all  ease-out;
    transition: all  ease-out;
    border-radius: 20px;
    cursor: pointer;
  }
</style>
