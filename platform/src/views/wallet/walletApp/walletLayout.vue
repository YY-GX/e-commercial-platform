<template>
  <div class="layout-wallet row align-content--center">
    <div @click="jump">
      <img src="../../../assets/icons/sys.png" alt="to system" class="sys-icon">
    </div>

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
    },
    methods: {
      jump() {
        console.log(localStorage.token);
        if (localStorage.token) {
          let role = this.$store.state.basic.role;
          console.log(role);
          if (role === 'mvo') {
            this.$router.push({ name: "mvo-main" }) // YYGX: to MVO main
          } else {
            this.$router.push({ name: "" }) // YYGX: to BVO main
          }
        } else {
          this.$router.push({ name: "login" })
        }
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

  .sys-icon {
    width: 60px;
    position: absolute;
    top: 20px;
    right: 30px;
    border-radius: 100%;
  }

  .sys-icon:hover {
    -webkit-transform: translateY(-3px);
    -ms-transform: translateY(-3px);
    transform: translateY(-3px);
    -webkit-box-shadow: 0 0 6px #999999;
    box-shadow: 0 0 6px #999999;
    -webkit-transition: all  ease-out;
    transition: all  ease-out;
    border-radius: 20px;
  }
</style>
