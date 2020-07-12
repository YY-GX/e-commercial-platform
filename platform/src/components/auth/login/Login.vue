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
  import {login} from "../../../api/mvo.js"

export default {
  name: 'login',
  data () {
    return {
      username: '',
      password: '',
      keepLoggedIn: false,
      usrErrors: [],
      passwordErrors: [],
    }
  },
  computed: {
    formReady () {
      return !this.usrErrors.length && !this.passwordErrors.length
    },
  },
  methods: {
    onsubmit () {
      this.usrErrors = this.username ? [] : ['Username is required'];
      this.passwordErrors = this.password ? [] : ['Password is required'];
      if (!this.formReady) {
        return
      }

      this.postData = {
        username: this.username,
        password: this.password,
      };

      // login(this, postData)
      //   .then(res => {
      //     console.log(res)
      //     if (res.status == 200) {
      //       // window.localStorage["token"] = JSON.stringify(res.data.data.token);
      //     } else {
      //
      //     }
      // });

      window.localStorage["token"] = 'ThisIsAToken'; // Delete in future

      this.$router.push({ name: 'dashboard' })
    },
  },
}
</script>

<style lang="scss">
</style>
