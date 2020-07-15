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

    <div class="row">
      <va-input
        v-model="code"
        type="text"
        label="Code"
        class="flex lg5"
        :error="!!codeErrors.length"
        :error-messages="codeErrors"
      />

      <img :src=codeUrl @click="change_code" alt="Code" class="flex offset--lg3 lg2 img">

      <div class="flex lg1 refresh" @click="change_code" style="width: 30px;">
        <va-button  icon="fa fa-refresh" small/>
      </div>


    </div>

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
  import {login, getCode, getToken} from "../../../api/mvo.js"

export default {
  name: 'login',
  data () {
    return {
      username: '',
      password: '',
      code: '',
      codeUrl: '',
      keepLoggedIn: false,
      usrErrors: [],
      passwordErrors: [],
      codeErrors: []
    }
  },
  created() {
    console.log('created');
    getCode(this).then((res)=>{
      console.log(res);
      this.codeUrl = 'data:image/png;base64,' + btoa(new Uint8Array(res.data).reduce((data, byte) => data + String.fromCharCode(byte), ''))
      console.log(this.codeUrl );
    })
  },

  computed: {
    formReady () {
      return !this.usrErrors.length && !this.passwordErrors.length && !this.codeErrors.length
    },
  },
  methods: {
    onsubmit () {
      console.log('go');
      this.usrErrors = this.username ? [] : ['Username is required'];
      this.passwordErrors = this.password ? [] : ['Password is required'];
      this.codeErrors = this.code ? [] : ['Code is required'];
      if (!this.formReady) {
        return
      }

      let postData = {
        username: this.username,
        password: this.password,
        code: this.code
      };

      login(this, postData)
        .then(res => {
          console.log(res);
          let storeData = res.data.data;
          this.$store.commit("loginChange", storeData);
          console.log(this.$store.state.mvo.permissions);
          if (res.status == 200) {
            console.log('login successful!');
            let getTokenData = {
              'grant_type': 'password',
              'client_id': 'app',
              'client_secret': 'app',
              'username': this.username,
              'password': this.password,
            };

            // getToken(this, getTokenData)
            //   .then((res)=>{
            //     console.log(res);
            //
            //   });

            // window.localStorage["token"] = JSON.stringify(res.data.data.token);
          } else {

          }
      });

      window.localStorage["token"] = 'd1e9b21c-7606-42de-b614-182ba5d31847'; // Delete in future

      this.$router.push({ name: 'dashboard' })
    },

    change_code() {
      getCode(this).then((res)=>{
        console.log(res);
        this.codeUrl = 'data:image/png;base64,' + btoa(new Uint8Array(res.data).reduce((data, byte) => data + String.fromCharCode(byte), ''))
      })
    }
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
