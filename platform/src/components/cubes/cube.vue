<template>
  <div class="hello">
    <div v-if="!isRemoved" :class="{hover:ishover}" style="display: inline-block; width: 250px; height: 200px;" @click="goToDetail" @mouseover="mouseover" @mouseout="mouseout">
      <!-- 删除标签，防止点击事件冒泡（点击删除同时触发查看详细） -->
      <div v-if="isRemovable" v-show="ishover" style="position: absolute; margin-left: 230px; margin-top: 0; z-index: 3;" @click.stop="remove">
        <va-icon style="color: grey;" name="fa fa-minus-circle fa-1x"/>
      </div>
      <va-card
        :image="imageUrl"
        :title="title"
      >
        <!-- 插槽更改va-card -->
        <template slot="header">
          <h5 class="mt-0 mb-0" style="color: #0e4ac4;">{{ title }}</h5>
        </template>
        {{intro}}
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
    name: 'cube',
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
        return this.type == "brand" || this.type == "company";
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
      remove : function() {
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
