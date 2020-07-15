<template>
  <form @submit.prevent="onsubmit()">
    <va-input
      v-model="username"
      type="text"
      label="Username"
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

    <va-select
      label="Select your role"
      v-model="SelectModel"
      textBy="description"
      :options="simpleOptions"
      clearable="false"
      noClear
    />

    <div class="auth-layout__options d-flex align--center justify--space-between">
      <va-checkbox
        v-model="agreedToTerms"
        class="mb-0"
        :error="!!agreedToTermsErrors.length"
        :errorMessages="agreedToTermsErrors"
      >
        <template slot="label">
          {{ $t('auth.agree') }}
          <span class="link">{{ $t('auth.termsOfUse') }}</span>
        </template>
      </va-checkbox>
      <router-link class="ml-1 link" :to="{name: 'recover-password'}">
        {{$t('auth.recover_password')}}
      </router-link>
    </div>

    <div class="d-flex justify--center mt-3">
      <va-button type="submit" class="my-0">{{ $t('auth.sign_up') }}</va-button>
    </div>
  </form>
</template>

<script>
  import {register} from '../../../../api/wallet'
export default {
  name: 'wallet-signup',
  data () {
    return {
      username: '',
      password: '',
      agreedToTerms: false,
      passwordErrors: [],
      agreedToTermsErrors: [],
      usrErrors: [],
      SelectModel: 'mvo',
      simpleOptions: [
        {
          id: 1,
          description: 'mvo',
        },
        {
          id: 2,
          description: 'bvo',
        },
      ],
    }
  },
  methods: {
    onsubmit () {
      this.passwordErrors = this.password ? [] : ['Password is required'];
      this.usrErrors = this.username ? [] : ['Username is required'];
      this.agreedToTermsErrors = this.agreedToTerms ? [] : ['You must agree to the terms of use to continue'];
      if (!this.formReady) {
        return
      }
      register(this, {
        username: this.username,
        password: this.password,
        accountType: this.SelectModel === 'mvo' ? '1' : '0'
      }).then((res) => {
        console.log(res);
        this.$router.push({ name: 'wallet-login' })
      });
    },
  },
  computed: {
    formReady () {
      return !(this.passwordErrors.length || this.agreedToTermsErrors.length || this.usrErrors.length)
    },
  },
}
</script>

<style lang="scss">
</style>
