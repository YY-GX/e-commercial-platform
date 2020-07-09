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
      v-model="realname"
      type="text"
      label="Realname"
      :error="!!realnameErrors.length"
      :error-messages="realnameErrors"
    />

    <va-input
      v-model="phone_num"
      type="text"
      label="Phone number"
      :error="!!phonenumErrors.length"
      :error-messages="phonenumErrors"
    />

    <va-input
      v-model="email"
      type="email"
      :label="$t('auth.email')"
      :error="!!emailErrors.length"
      :error-messages="emailErrors"
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
export default {
  name: 'signup',
  data () {
    return {
      username: '',
      realname: '',
      phone_num: '',
      email: '',
      password: '',
      agreedToTerms: false,
      emailErrors: [],
      passwordErrors: [],
      agreedToTermsErrors: [],
      usrErrors: [],
      realnameErrors: [],
      phonenumErrors: [],
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
      this.emailErrors = this.email ? [] : ['Email is required'];
      this.passwordErrors = this.password ? [] : ['Password is required'];
      this.usrErrors = this.username ? [] : ['Username is required'];
      this.phonenumErrors = this.phone_num ? [] : ['Phone number is required'];
      this.realnameErrors = this.realname ? [] : ['Realname is required'];
      this.agreedToTermsErrors = this.agreedToTerms ? [] : ['You must agree to the terms of use to continue'];
      if (!this.formReady) {
        return
      }
      this.$router.push({ name: 'dashboard' })
    },
  },
  computed: {
    formReady () {
      return !(this.emailErrors.length || this.passwordErrors.length || this.agreedToTermsErrors.length)
    },
  },
}
</script>

<style lang="scss">
</style>
