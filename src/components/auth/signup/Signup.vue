<template>
  <form @submit.prevent="onsubmit()">

    <div class="layout gutter--md fluid">
      <div class="row">


        <div class="flex lg6">
          <va-input
            v-model="username"
            type="text"
            label="Username"
            :error="!!usrErrors.length"
            :error-messages="usrErrors"
          />

        </div>

        <div class="flex lg6">
          <va-input
            v-model="realname"
            type="text"
            label="Realname"
            :error="!!realnameErrors.length"
            :error-messages="realnameErrors"
          />
        </div>

      </div>
    </div>

    <div class="layout gutter--md fluid">
      <div class="row">


        <div class="flex lg6">
          <va-input
            v-model="phone_num"
            type="text"
            label="Phone number"
            :error="!!phonenumErrors.length"
            :error-messages="phonenumErrors"
          />
        </div>

        <div class="flex lg6">
          <va-input
            v-model="email"
            type="email"
            :label="$t('auth.email')"
            :error="!!emailErrors.length"
            :error-messages="emailErrors"
          />
        </div>

      </div>
    </div>

    <div class="layout gutter--md fluid">
      <div class="row">


        <div class="flex lg6">
          <va-input
            v-model="password"
            type="password"
            :label="$t('auth.password')"
            :error="!!passwordErrors.length"
            :error-messages="passwordErrors"
          />
        </div>

        <div class="flex lg6">
          <va-select
            label="Select your role"
            v-model="SelectModel"
            textBy="description"
            :options="simpleOptions"
            clearable="false"
            noClear
          />
        </div>

      </div>
    </div>


    <div class="layout gutter--md fluid">
      <div class="row">

        <div class="flex lg1" @mouseenter="visible_" @mouseleave="invisible_">
          <va-icon
            style="width: 30px;"
            slot="prepend"
            color="gray"
            name="fa fa-question-circle-o"
          />
        </div>

        <div class="flex lg5">
          <va-input
            v-model="walletUsr"
            type="text"
            label="Wallet username"
            :error="!!walletUsrErrors.length"
            :error-messages="walletUsrErrors"
          >
          </va-input>
        </div>

        <div class="flex lg6">
          <va-input
            v-model="walletPwd"
            type="password"
            label="Wallet password"
            :error="!!walletPwdErrors.length"
            :error-messages="walletPwdErrors"
          >
          </va-input>
        </div>

      </div>
    </div>
    <span class="hint" v-show="seen">No wallet account now? Register one! click the button on the top right corner~ </span>


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
  import {login} from '../../../api/wallet'
  import {register} from '../../../api/mvo'
  export default {
    name: 'signup',
    data () {
      return {
        username: '',
        realname: '',
        phone_num: '',
        email: '',
        password: '',
        walletUsr: '',
        walletPwd: '',
        agreedToTerms: false,
        emailErrors: [],
        passwordErrors: [],
        agreedToTermsErrors: [],
        usrErrors: [],
        realnameErrors: [],
        phonenumErrors: [],
        walletUsrErrors: '',
        walletPwdErrors: '',
        SelectModel: 'mvo',

        seen: false,

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
        this.walletUsrErrors = this.walletUsr ? [] : ['Wallet username is required'];
        this.walletPwdErrors = this.walletPwd ? [] : ['Wallet password is required'];
        if (!this.formReady) {
          return
        }

        let postData = {
          username: this.walletUsr,
          password: this.walletPwd,
        };

        login(this, postData)
          .then(res => {
            console.log(res);
            if (res.data.status === 200) {
              console.log('wallet good!');
              let registerData = {
                username: this.username,
                password: this.password,
                name: this.realname,
                email: this.email,
                phone: this.phone_num,
                roleId: this.SelectModel === 'mvo' ? '1' : '0',
                walletId: res.data.data.walletId,
              };
              console.log(registerData);
              register(this, registerData)
                .then((res) => {
                  console.log(res);
                  this.showToast(
                    "Sign up success!",
                    {
                      theme: 'success',
                      icon: 'fa-check',
                      position: 'top-right',
                      duration: 2000,
                      fullWidth: false,
                    },
                  );
                  this.$router.push({ name: "login" });
                })
            } else {
              console.log('Status not 200.');
              this.showToast(
                "Wrong wallet username or password!",
                {
                  theme: 'danger',
                  icon: 'fa-warning',
                  position: 'top-right',
                  duration: 3000,
                  fullWidth: false,
                },
              );
            }
          });

        // this.$router.push({ name: 'dashboard' })
      },
      visible_:function(){
        this.seen = true;
      },
      invisible_:function(){
        this.seen = false;
      }
    },
    computed: {
      formReady () {
        return !(this.emailErrors.length || this.passwordErrors.length
          || this.agreedToTermsErrors.length || this.walletUsrErrors.length
          || this.walletPwdErrors.length)
      },
    },
  }
</script>

<style lang="scss" scoped>
  form .hint {
    color: #729cf0;
    text-decoration: underline;
    font-style: italic;
    margin-left: 3%;
  }
</style>
