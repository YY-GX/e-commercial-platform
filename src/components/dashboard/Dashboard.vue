<template>
  <div class="dashboard">
    <cube-item
      :img_url="img_url"
      :img_title="img_title"
      :img_intro="img_intro"
      type="product"
      product_id=1
      usr_id=1 />

  </div>
</template>

<script>
import cubeItem from "../cubes/cubeItem";
export default {
  name: 'dashboard',
  data() {
    return {
      img_url: "https://picsum.photos/300/200/?image=1043",
      img_title: 'CARD WITH TITLE ON IMAGE',
      img_intro: 'The unique stripes of zebras make them one of the animals most familiar to people.'
    }
  },
  components: {
    cubeItem,
  },
  methods: {
    delete_product(val) {
      console.log(val)
    }
  },
}
</script>

<style lang="scss" scoped>

</style>
