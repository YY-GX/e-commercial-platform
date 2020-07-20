<template>
  <div>
<!--    <div class="title">-->
<!--      shop-->
<!--    </div>-->
    <div class="shop">
      <va-card title="shop" stripe="info">

        <div style="display: flex; flex-direction: column; justify-content: center;">
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
            <div class="product_list">
              <div class="product_item"
                   v-for="product in currentProducts.slice((activePage-1)*pageSize,activePage*pageSize)">
                <cube-item :img_url="product.image_url" :img_title="product.name" :img_intro="product.description"
                           :type="'product'" :cube_id="product.pro_id" :price="product.min_retail_price"
                           :wit-id="product.witId" :usr_id="parseInt(dsrId)"></cube-item>
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
        </div>
      </va-card>
    </div>
  </div>
</template>
<script>
  import CubeItem from "../../../components/myComponents/cubeItem";
  import VaInput from "vuestic-ui/src/components/vuestic-components/va-input/VaInput";
  import {getAll_shop_product, getWishlist} from "../../../api/bvo.js";
  import HollowDotsSpinner from "epic-spinners/src/components/lib/HollowDotsSpinner";
  export default {
    components: {HollowDotsSpinner, VaInput, CubeItem},
    created : function(){

      this.dsrId = this.$store.state.bvo.dsrId;
      getAll_shop_product(this).then(res =>{
        if(res.status == 200){
          this.allProducts = res.data.data;
          //调用getWishList接口方法获得所有心愿单商品
          getWishlist(this,this.dsrId).then(response =>{
            if(response.status == 200){
              var wishlist = response.data.data;
              for(var i=0;i<this.allProducts.length;i++){//遍历all products
                var pro_id = this.allProducts[i].pro_id;
                this.allProducts[i].witId = 0;
                for(var j=0;j<wishlist.length;j++){//如果product 在wishlist 中
                  if(pro_id == wishlist[j].pro_id){
                    this.allProducts[i].witId = wishlist[j].wit_id;
                    break;
                  }
                }
              }
              this.currentProducts = this.allProducts;
            }
            else{
              console.log(response.message);
            }
          })
        }
        else{
          console.log(res.message);
        }
      })

/*
      //假数据，待删除
      this.allProducts = [{proId : 1,
        name : "nike",
        retailPrice : 15,
        minRetailPrice : 12,
        imageUrl : 'https://picsum.photos/300/200/?image=898',
        description : "a pair of nike shoe",
        witId : 0
      },{proId : 2,
        name : "adidas",
        retailPrice : 15,
        minRetailPrice : 12,
        imageUrl : 'https://picsum.photos/300/200/?image=898',
        description : "a pair of adidas shoe",
        witId : 1
      },{proId : 3,
        name : "nike",
        retailPrice : 15,
        minRetailPrice : 12,
        imageUrl : 'https://picsum.photos/300/200/?image=898',
        description : "a pair of nike shoe",
        witId : 0
      },{proId : 1,
        name : "nike",
        retailPrice : 15,
        minRetailPrice : 12,
        imageUrl : 'https://picsum.photos/300/200/?image=898',
        description : "a pair of nike shoe",
        witId : 0
      },{proId : 1,
        name : "nike",
        retailPrice : 15,
        minRetailPrice : 12,
        imageUrl : 'https://picsum.photos/300/200/?image=898',
        description : "a pair of nike shoe",
        witId : 0
      },{proId : 1,
        name : "nike",
        retailPrice : 15,
        minRetailPrice : 12,
        imageUrl : 'https://picsum.photos/300/200/?image=898',
        description : "a pair of nike shoe",
        witId : 0
      },{proId : 2,
        name : "adidas",
        retailPrice : 15,
        minRetailPrice : 12,
        imageUrl : 'https://picsum.photos/300/200/?image=898',
        description : "a pair of adidas shoe",
        witId : 0
      },{proId : 2,
        name : "adidas",
        retailPrice : 15,
        minRetailPrice : 12,
        imageUrl : 'https://picsum.photos/300/200/?image=898',
        description : "a pair of adidas shoe",
        witId : 0
      },{proId : 2,
        name : "adidas",
        retailPrice : 15,
        minRetailPrice : 12,
        imageUrl : 'https://picsum.photos/300/200/?image=898',
        description : "a pair of adidas shoe",
        witId : 0
      },{proId : 2,
        name : "adidas",
        retailPrice : 15,
        minRetailPrice : 12,
        imageUrl : 'https://picsum.photos/300/200/?image=898',
        description : "a pair of adidas shoe",
        witId : 0
      }];
      this.currentProducts = this.allProducts;

 */
    },
    data : function(){
      return {
        allProducts : [],
        currentProducts : [],
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
        var pages = Math.ceil(this.currentProducts.length / this.pageSize);//向上取整
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
        var newProducts = [];
        for(var i=0;i<this.allProducts.length;i++){
          var product = this.allProducts[i];
          if(product.name.toLowerCase().includes(this.searchIndex.toLowerCase())||product.description.toLowerCase().includes(this.searchIndex.toLowerCase())){
            newProducts = newProducts.concat(product);
          }
        }
        this.currentProducts = newProducts;
        this.activePage = 1;
      }
    }
  }

</script>

<style scoped>
  .title {
    font-size: 30px;
  }

  .product_list {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: left;
  }

  .product_item {
    display: flex;
    width: calc(100% / 5);
    justify-content: center;
  }

  .pagination {
    display: flex;
    justify-content: center;
  }
</style>
