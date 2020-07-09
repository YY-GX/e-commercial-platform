<template>
    <div class="grid row">
      <span class="small-title">Basic information</span> <br>
      <!--   company and brand   -->
      <div class="flex xs12 md6">
      111
      </div>

      <div class="flex xs12 md6">
      111
      </div>

      <!--   name & skuCd   -->
      <div class="flex xs12 md6">
        111
      </div>

      <div class="flex xs12 md6">
        111
      </div>

      <!--   model & retailPrice & minRetailPrice   -->
      <div class="flex xs12 md4">
        111
      </div>

      <div class="flex xs12 md4">
        111
      </div>

      <div class="flex xs12 md4">
        111
      </div>

      <!--   width & height & length & weight   -->
      <div class="flex xs12 md3">
        111
      </div>

      <div class="flex xs12 md3">
        111
      </div>

      <div class="flex xs12 md3">
        111
      </div>

      <div class="flex xs12 md3">
        111
      </div>

      <!--   description   -->
      <div class="flex xs12 md12">
        111
      </div>

      <hr>

      <span class="small-title">Other information</span> <br>

      <!--   warrantyDay & replenishmentPeriod & categoryName   -->
      <div class="flex xs12 md4">
        111
      </div>

      <div class="flex xs12 md4">
        111
      </div>

      <div class="flex xs12 md4">
        111
      </div>

      <!--   warranty   -->
      <div class="flex xs12 md12">
        111
      </div>

    </div>
</template>

<script>
    export default {
        name: "add-product",
      data() {
          return {
            brdId: '',
            manId: '',
            name: '',
            skuCd: '',
            model: '',
            description: '',
            retailPrice: '',
            minRetailPrice: '',
            width: '',
            height: '',
            length: '',
            weight: '',
            warrantyDay: '',
            replenishmentPeriod: '',
            warranty: '',
            categoryNam: '',
          }
      }
    }
</script>

<style scoped>
  .small-title {
    font-style: italic;
    text-decoration: underline;
  }
</style>
