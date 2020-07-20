<template>
  <div>
<!--    <div class="title">-->
<!--      wishlist-->
<!--    </div>-->
    <div class="wishlist">
      <va-card title="wishlist" style="width: 100%;">
        <div>
          <div class="search" style="display: flex; flex-direction: row;">
            <div style="width: 30%;">
              <va-input
                v-model="searchIndex"
              >
                <va-icon
                  slot="prepend"
                  color="gray"
                  name="fa fa-search"
                />
              </va-input>
            </div>

            <div class="loading" v-show="isloading" style="margin-left: 10px; margin-top: 10px;">
              <hollow-dots-spinner
                :animation-duration="1000"
                :size="80"
                color="skyblue"
              />
            </div>
          </div>
          <div class="wishlist_list">
            <div class="wishlist_item" v-for="wishlist in currentWishlist.slice((activePage-1)*pageSize,activePage*pageSize)">
              <wishlist-item :image-url="wishlist.image_url" :name="wishlist.name"
                             :price="wishlist.min_retail_price" :wish-list-id="wishlist.wit_id"
                             :product-id="wishlist.pro_id" :dsr-id="dsrId"
                             @remove_wishlist="removeWishlist"
              >

              </wishlist-item>
            </div>
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
  </div>
</template>
<script>
  import CubeItem from "../../../components/myComponents/cubeItem";
  import VaInput from "vuestic-ui/src/components/vuestic-components/va-input/VaInput";
  import {getAll_shop_product, getWishlist,remove_Wishlist} from "../../../api/bvo.js";
  import WishlistItem from "../../../components/myComponents/wishlistItem"
  import HollowDotsSpinner from "epic-spinners/src/components/lib/HollowDotsSpinner";
  export default {
    components: {HollowDotsSpinner,WishlistItem, VaInput, CubeItem},
    created : function(){

      this.dsrId = this.$store.state.bvo.dsrId;

      getWishlist(this,this.dsrId).then(response => {
        if (response.status == 200) {
          console.log(response)
          this.allWishlist = response.data.data;
          this.currentWishlist = this.allWishlist;
        } else {
          console.log(response.message);
        }
      });
/*
      //假数据，待删除
      this.allWishlist = [
        {witId: 1,
          proId: 1,
          name : 'nike',
          retailPrice : 10,
          minRetailPrice : 5,
          imageUrl : 'https://picsum.photos/300/200/?image=898'
        },
        {witId: 1,
          proId: 1,
          name : 'nike',
          retailPrice : 10,
          minRetailPrice : 5,
          imageUrl : 'https://picsum.photos/300/200/?image=898'
        },
        {witId: 1,
          proId: 1,
          name : 'adidas',
          retailPrice : 10,
          minRetailPrice : 5,
          imageUrl : 'https://picsum.photos/300/200/?image=898'
        },
        {witId: 1,
          proId: 1,
          name : 'adidas',
          retailPrice : 10,
          minRetailPrice : 5,
          imageUrl : 'https://picsum.photos/300/200/?image=898'
        },
        {witId: 1,
          proId: 1,
          name : 'adidas',
          retailPrice : 10,
          minRetailPrice : 5,
          imageUrl : 'https://picsum.photos/300/200/?image=898'
        },
        {witId: 1,
          proId: 1,
          name : 'nike',
          retailPrice : 10,
          minRetailPrice : 5,
          imageUrl : 'https://picsum.photos/300/200/?image=898'
        },
      ];

 */
    },
    data : function(){
      return {
        allWishlist : [],
        currentWishlist : [],
        searchIndex : "",
        timer : null, //定时器，控制用户搜索输入延时
        dsrId : 0,
        pageSize : 6, //页面显示数量
        activePage : 1, //当前页面
        isloading : false
      }
    },
    computed : {
      totalPage : function(){
        var pages = Math.ceil(this.currentWishlist.length / this.pageSize);//向上取整
        return pages;
      }
    },
    watch : {
      searchIndex : function(val,oldval){
        clearTimeout(this.timer); //清除之前的定时器

        this.timer = setTimeout(()=>{
          this.isloading = true;
          setTimeout(()=>{this.isloading=false;
            this.searchProduct();
          },2000)
        },1000)
      }
    },
    methods : {
      searchProduct : function(){
        var newWishlist = [];
        for(var i=0;i<this.allWishlist.length;i++){
          var wishlistItem = this.allWishlist[i];
          if(wishlistItem.name.toLowerCase().includes(this.searchIndex.toLowerCase())){
            newWishlist = newWishlist.concat(wishlistItem);
          }
        }
        this.currentWishlist = newWishlist;
        this.activePage = 1;
      },
      removeWishlist : function(data){
        remove_Wishlist(this,data).then(res=>{
          if(res.status==200) {
            getWishlist(this, this.dsrId).then(response => {
              if (response.status == 200) {
                this.allWishlist = response.data.data;
                this.searchProduct();
              } else {
                console.log(response.message);
              }
            })
          }
          else{
            console.log(res.message);
          }
        })
      }
    }
  }

</script>

<style scoped>
  .title {
    font-size: 30px;
  }

  .wishlist_list {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: left;
  }

  .wishlist_item {
    display: flex;
    width: calc(100% / 4);
    justify-content: center;
    margin-bottom: 10px;
  }

  .pagination {
    display: flex;
    justify-content: center;
  }
</style>
