<template>
  <div class="auth-layout-wallet row align-content--center">
    <div @click="jump">
      <img src="../../../assets/icons/sys_v3.png" alt="to system" class="sys-icon">
    </div>

    <div class="flex xs12 pa-2 flex-center">
      <router-link class="py-3 flex-center" to="/">
<!--        <va-icon-logo></va-icon-logo>-->
        <img src="../../../assets/icons/wallet_title.svg" alt="wallet title">
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
import VaIconVuestic from '../../../iconset/VaIconVuestic'
import VaIconLogo from "../../../iconset/VaIconLogo";

const tabs = [
  'wallet-login',
  'wallet-signup',
];

export default {
  name: 'WalletAuthLayout',
  components: {VaIconLogo, VaIconVuestic },
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
  .auth-layout-wallet {
    min-height: 100vh;
    background-image: linear-gradient(to right, #eae2b7, #fcbf49);

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
