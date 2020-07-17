<template>
  <div class="auth-layout row align-content--center">
    <div @click="jump">
      <img src="../../assets/icons/wallet.png" alt="to wallet" class="wallet-icon">
    </div>

    <div class="flex xs12 pa-3 flex-center">
      <router-link class="py-5 flex-center" to="/">
        <va-icon-vuestic />
      </router-link>
    </div>

    <div class="flex xs12 pa-3">
      <div class="d-flex justify--center">
        <va-card class="auth-layout__card">
          <va-tabs
            v-model="tabIndex"
            center
          >
            <va-tab>{{ $t('auth.login') }}</va-tab>
            <va-tab>{{ $t('auth.createNewAccount') }}</va-tab>
          </va-tabs>

          <va-separator/>

          <div class="pa-3">
            <router-view/>
          </div>
        </va-card>
      </div>
    </div>

  </div>
</template>

<script>
import VaIconVuestic from '../../iconset/VaIconVuestic'

const tabs = [
  'login',
  'signup',
];

export default {
  name: 'AuthLayout',
  components: { VaIconVuestic },
  data () {
    return {
      selectedTabIndex: 0,
      tabTitles: ['login', 'createNewAccount'],
    }
  },
  computed: {
    tabIndex: {
      set (tabIndex) {
        this.$router.push({ name: tabs[tabIndex] })
      },
      get () {
        return tabs.indexOf(this.$route.name)
      },
    },
  },
  methods: {
    jump() {
      let walletId = this.$store.state.wallet.walletId;
      console.log(walletId);
      if (walletId === null) {
        this.$router.push({ name: "wallet-login" })
      } else {
        this.$router.push({ name: "wallet-bill" })
      }

    }
  }
}
</script>

<style lang="scss">
  .auth-layout {
    min-height: 100vh;
    background-image: linear-gradient(to right, #0e4ac4, #002c85);

    &__card {
      width: 100%;
      max-width: 600px;
    }

    &__options {
      @include media-breakpoint-down(xs) {
        flex-direction: column;
      }
    }
  }

  .wallet-icon {
    width: 60px;
    position: absolute;
    top: 20px;
    right: 30px;
    border-radius: 100%;
  }

  .wallet-icon:hover {
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
