<template>
  <form @submit.prevent="onsubmit">
    <va-input
      v-model="username"
      type="text"
      label="username"
      :error="!!usrErrors.length"
      :error-messages="usrErrors"
    />

    <va-input
      v-model="password"
      type="password"
      :label="$t('auth.password')"
      :error="!!passwordErrors.length"
      :error-messages="passwordErrors"
    />

    <div class="auth-layout__options d-flex align--center justify--space-between">
      <va-checkbox v-model="keepLoggedIn" class="mb-0" :label="$t('auth.keep_logged_in')"/>
      <router-link class="ml-1 link" :to="{name: 'recover-password'}">{{$t('auth.recover_password')}}</router-link>
    </div>

    <div class="d-flex justify--center mt-3">
      <va-button type="submit" class="my-0">{{ $t('auth.login') }}</va-button>
    </div>
  </form>
</template>

<script>
  import {login} from "../../../../api/wallet.js"

  export default {
    name: 'wallet-login',
    data () {
      return {
        username: '',
        password: '',
        keepLoggedIn: false,
        usrErrors: [],
        passwordErrors: [],
      }
    },
    created() {
      if(this.$store.state.wallet.walletId != null){
        if(this.$store.state.wallet.is_pay){
          this.$store.commit("changeIsPay",false);
          this.$router.push({name : "wallet-pay"});
        }
        else{
          console.log("hello");
          this.$router.push({ name: 'wallet-bill' })
        }
      }
    },

    computed: {
      formReady () {
        return !this.usrErrors.length && !this.passwordErrors.length;
      },
    },
    methods: {
      onsubmit () {
        console.log('go');
        this.usrErrors = this.username ? [] : ['Username is required'];
        this.passwordErrors = this.password ? [] : ['Password is required'];
        if (!this.formReady) {
          return
        }

        window.localStorage["token"] = 'wallet';

        let postData = {
          username: this.username,
          password: this.password,
        };

        login(this, postData)
          .then(res => {
            console.log(res);
            if (res.data.status === 500) {
              console.log('Wrong!');
              this.showToast(
                "Wrong password!",
                {
                  icon: 'fa-warning',
                  position: 'top-right',
                  duration: 2500,
                  fullWidth: false,
                },
              );
              return;
            }

            let storeData = res.data.data;
            this.$store.commit("walletLogin", storeData);
            if (res.status == 200) {
              console.log('login successful!');
              console.log(this.$store.state.wallet.is_pay);
              if(this.$store.state.wallet.is_pay){
                this.$store.commit("changeIsPay",false);
                console.log(this.$store.state.wallet.is_pay);
                this.$router.push({name: "wallet-pay"});
              }
              else{
                this.$router.push({ name: 'wallet-bill' })
              }
            } else {
              console.log('Status not 200.');
            }
          });

        // Delete in future

        // To be put into the login axios

      },

    },
  }
</script>

<style lang="scss">
  .img {
    height: 50px;
    width: 90px;
  }

  .refresh {
    width: 35px;
    align-content: center;
    text-align: center;
  }
</style>
