<template>
  <div v-if="!isRemoved" class="background" :class="{'hover':ishover}" @mouseover="mouseover" @mouseout="mouseout">
    <!-- 删除标签，防止点击事件冒泡（点击删除同时触发查看详细） -->
    <div  v-show="ishover" style="position: absolute; margin-left: 380px; margin-top: 0; z-index: 3;" @click.stop="remove"><va-icon style="color: grey;" name="fa fa-trash fa-1x"/></div>
    <div class="image"><img :src="imageUrl"/></div>
    <div class="info">
        <div class="name"><span>{{name}}</span></div>
        <div class="price"><span>${{price}}</span></div>
    </div>
  </div>
</template>

<script>
  import VaButton from "vuestic-ui/src/components/vuestic-components/va-button/VaButton";
  export default {
    name : 'wishlistItem',
    components: {VaButton},
    props : {
      imageUrl : String,
      name : String,
      price : String,
      wishListId : Number,
      productId : Number
    },
    data : function () {
      return {
        isRemoved : false,
        ishover : false
      }
    },
    methods : {
      showDetails : function () {
        //使用detail 组件(yy)
      },
      remove : function(){
        //调用删除接口
        /*
        axios.post("/bvo/wishlist/delete ",{witId : this.wishListID})
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
    }
  }
</script>

<style>
  .image {
    margin: 0;
    width: 250px;
    height: 200px;
  }

  .image img {
    width: 100%;
    height: 100%;
    border-bottom-left-radius: 20px;
    border-top-left-radius: 20px;
    display: inline-block;
    vertical-align: middle;
  }

  .background {
    background-color: white;
    border-radius: 20px;
    display: flex;
    flex-direction: row;
    width: 400px;
  }

  .info {
    display: flex;
    flex-direction: column;
    border-left-style: solid;
    border-width: 1px;
    border-color: #0e4ac4;
    width: 150px;
  }

  .name {
    height: 130px;
    text-align: center;
    line-height: 150px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 30px;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  }

  .price {
    height: 70px;
    text-align: center;
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
