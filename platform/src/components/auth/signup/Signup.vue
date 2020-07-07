<template>
  <form @submit.prevent="onsubmit()">
    <va-input
      v-model="username"
      type="text"
      label="Username"
      :error="is_usr_empty"
      error-messages="Please enter your username!"
    />

    <va-input
      v-model="realname"
      type="text"
      label="Realname"
      :error="is_realname_empty"
      error-messages="Please enter your real name!"
    />

    <va-input
      v-model="phone_num"
      type="text"
      label="Phone number"
      :error="is_phonenum_empty"
      error-messages="Please enter your phone number!"
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
      is_usr_empty: false,
      is_realname_empty: false,
      is_phonenum_empty: false,
      SelectModel: '',
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
      this.emailErrors = this.email ? [] : ['Email is required']
      this.passwordErrors = this.password ? [] : ['Password is required']
      this.agreedToTermsErrors = this.agreedToTerms ? [] : ['You must agree to the terms of use to continue']
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
