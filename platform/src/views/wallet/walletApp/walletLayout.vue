<template>
  <div class="layout-wallet row align-content--center">

    <div class="flex xs12 pa-3 flex-center">
      <router-link class="py-5 flex-center" to="/">
        <va-icon-vuestic />
      </router-link>
    </div>

    <div class="flex xs12 pa-3">
      <div class="d-flex justify--center">
        <va-card class="layout__card">
          <div class="pa-3">
            <router-view/>
          </div>
        </va-card>
      </div>
    </div>

  </div>
</template>

<script>
  import VaIconVuestic from '../../../iconset/VaIconVuestic'


  export default {
    name: 'WalletLayout',
    components: { VaIconVuestic },
    data () {
      return {

      }
    },
    computed: {

    },
    created() {
      if (this.$store.state.wallet.is_pay === false) {
        this.$router.push({ name: 'wallet-bill' })
      } else {

      }
    }
  }
</script>

<style lang="scss">
  .layout-wallet {
    min-height: 100vh;
    background-image: linear-gradient(to right, #ffba08, #faa307);

    &__card {
      height: 1500px;
      width: 1000px;
    }

    &__options {
      @include media-breakpoint-down(xs) {
        flex-direction: column;
      }
    }
  }
</style>
