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
      localStorage.removeItem('token');
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
            if (res.data.status === 500) {
              console.log('Wrong!')
              this.showToast(
                "Wrong password or code!",
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
            this.$store.commit("changeUserPermissions",storeData.permissions);
            this.$store.commit("changeUserRoleId",storeData.role.roleId)
            console.log(this.$store.state.user.roleId);

            if (res.data.data) {
              console.log('login successful!');
              if(storeData.role.name == "bvo"){
                this.$store.commit("BVO_login",storeData);
                console.log("usrId: "+ this.$store.state.bvo.bvo_usrId);
                console.log("permission: "+this.$store.state.bvo.permissions)
              }
              else if(storeData.role.name == "mvo"){
                this.$store.commit("loginChange", storeData);
                console.log(this.$store.state.mvo.permissions);
              }

              //window.localStorage["token"] = '5bea2b32-38c1-436c-828d-595c68b2f172'; // Delete in future

              //this.$router.push({ name: 'dashboard' });


              var formData = new FormData();
              formData.append("grant_type","password");
              formData.append('client_id', 'app');
              formData.append('client_secret', 'app');
              formData.append('username',this.username);
              formData.append('password', this.password);


              getToken(this, formData)
                .then((res)=>{
                  console.log(res);
                  this.$store.commit("changeToken",res.data.access_token);
                  window.localStorage["token"] = res.data.access_token;
                  if(this.$store.state.user.roleId == 3){
                    this.$router.push({ name: 'audit-wallet' });
                  }
                  else if(this.$store.state.user.roleId == 2){
                    this.$router.push({ name: 'BVO_info' });
                  }
                  else{
                    this.$router.push({ name: 'mvo-main' });
                  }
                }).catch(err=>{console.log(err)});

            } else {
              console.log('Wrong!')
            }

          });

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
