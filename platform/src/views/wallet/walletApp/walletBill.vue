<template>
    <div>
      <va-card
        class="flex lg12"
        stripe="info"
        style="margin-bottom: 2vh; width: 1000px;"
      >
        <template slot="header">
          <va-icon name="fa fa-info mr-3" color="info"/>
          <h4 class="mt-0 mb-0"> Wallet basic information </h4>
          <va-button icon="fa fa-edit" @click="edit" small outline style="margin-left: 60%; margin-top: 2%;">
            Change Password
          </va-button>
        </template>

        <div class="row">
          <div class="flex lg8 offset-lg1">
            <label class="labels">Username: </label>{{ username }}<br>
            <label class="labels">Available Money: </label>{{ info.availableMoney }} {{currency}}<br>
            <label class="labels">Depositing Money: </label>{{ info.depositingMoney }} {{currency}}<br>
            <label class="labels">Withdrawing Money: </label>{{ info.withdrawingMoney }} {{currency}}<br>
          </div>
        </div>

      </va-card>

      <va-card
        stripe="info"
      >

        <template slot="header">
          <va-icon name="fa fa-money mr-3" color="info"/>
          <h4 class="mt-0 mb-0"> Transaction table </h4>
        </template>

        <va-data-table
          :fields="fields"
          :data="filteredData"
          :per-page="parseInt(perPage)"
          class="va-table--hoverable"
        >
          <template slot="marker" slot-scope="props">
            <va-icon name="fa fa-circle" :color="showStatusColor(props.rowData)" size="8px" />
          </template>

          <template slot="status" slot-scope="props">
            <va-badge :color="showStatusColor(props.rowData)">
              {{  showStatus(props.rowData) }}
            </va-badge>
          </template>

          <template slot="transactionType" slot-scope="props">
            <va-badge :color="showTransactionTypeColor(props.rowData)">
              {{  showTransactionType(props.rowData) }}
            </va-badge>
          </template>

          <template slot="transactionMethod" slot-scope="props">
            <va-badge :color="showTransactionMethodColor(props.rowData)">
              {{  showTransactionMethod(props.rowData) }}
            </va-badge>
          </template>

        </va-data-table>


      </va-card>

      <div class="row">
        <va-button @click="finish" outline class="flex offset--lg10 lg2" style="margin-top: 2%;">
          Log out
        </va-button>
      </div>

      <va-modal
        @ok="onOk"
        v-model="showChangePwd"
        size="small"
        title=" Change Password "
        okText=" Confirm "
        :cancelText=" $t('modal.cancel')"
      >
        <slot>
          <!--   nameEn & nameCn   -->
          <div class="layout gutter--md fluid">
            <div class="row">
              <div class="flex lg12">
                <va-input
                  v-model="pwd"
                  type="password"
                  label="Password"
                  :error="!!pwdErrors.length"
                  :error-messages="pwdErrors"
                />
              </div>
            </div>
            <div class="row">
              <div class="flex lg12">
                <va-input
                  v-model="confirmPwd"
                  type="password"
                  label="Type Password Again"
                  :error="!!confirmPwdError.length"
                  :error-messages="confirmPwdError"
                />
              </div>
            </div>
          </div>

        </slot>
      </va-modal>



    </div>
</template>

<script>
  import {getBasicInfo, getTransaction, editBasicInfo} from '../../../api/wallet'
    export default {
      name: "wallet-bill",
      data() {
          return {
            username: this.$store.state.wallet.username,
            info: null,
            currency: null,

            // modal - edit pwd
            showChangePwd: false,
            pwd: '',
            pwdErrors: [],
            confirmPwd: '',
            confirmPwdError: [],

            // table related
            fieldData: [],
            perPage: '6',


          }
      },
      created() {
        getBasicInfo(this, {walletId: this.$store.state.wallet.walletId})
          .then((res) => {
            console.log(res);
            this.info = res.data.data;
            this.currency = res.data.data.currency;
          });

        getTransaction(this, {walletId: this.$store.state.wallet.walletId})
          .then((res) => {
            console.log(res);
            this.fieldData = res.data.data;
          })

      },

      computed: {
        fields () {
          return [{
            name: '__slot:marker',
            width: '30px',
            dataClass: 'text-center',
          }, {
            name: '__slot:status',
            title: 'Status',
          }, {
            name: 'transactionNumber',
            title: 'Transaction Number',
          }, {
            name: 'transactionMoney',
            title: 'Transaction Money',
          },{
            name: 'createTime',
            title: 'Create Time',
          }, {
            name: '__slot:transactionType',
            title: 'Transaction Type',
          }, {
            name: '__slot:transactionMethod',
            title: 'Transaction Method',
          }]
        },
        filteredData () {
          if (!this.term || this.term.length < 1) {
            return this.fieldData
          }

          return this.fieldData.filter(item => {
            return item.name.toLowerCase().startsWith(this.term.toLowerCase())
          })
        },

        formReady () {
          return !this.pwdErrors.length && !this.confirmPwdError.length
        },
      },

      methods: {
        edit() {
          this.showChangePwd = true;
        },

        onOk() {
          this.pwdErrors = this.pwd ? [] : ['New password is required'];
          this.confirmPwdError = this.confirmPwd ? [] : ['Please type the password again'];

          if (!this.formReady) {
            this.showChangePwd = true;
            return;
          }

          this.confirmPwdError = this.confirmPwd === this.pwd ? [] : ['Ensure you type in the same password'];
          if (!this.formReady) {
            this.showChangePwd = true;
            return;
          }

          editBasicInfo(this, {
            walletId: this.$store.state.wallet.walletId,
            password: this.password
          }).then((res) => {
            console.log(res);
            this.pwd = '';
            this.confirmPwd = '';
          })
        },

        finish() {
          this.$store.commit('walletLogout');
          this.$router.push({ name: 'wallet-login' });
        },

        showStatus(row) {
          let state = row.status;
          if (state === '1') {
            return "Reviewed"
          } else if (state === '2') {
            return "Complete"
          } else {
            return "Failed"
          }
        },

        showStatusColor(row) {
          let state = row.status;
          if (state === '1') {
            return "#fcbf49"
          } else if (state === '2') {
            return "#f77f00"
          } else {
            return "#d62828"
          }
        },

        showTransactionType(row) {
          let state = row.transactionType;
          if (state === '1') {
            return "Recharge";
          } else if (state === '2') {
            return 'Withdraw'
          } else if (state === '3') {
            return 'Consume'
          } else {
            return 'Refund'
          }
        },

        showTransactionTypeColor(row) {
          let state = row.transactionType;
          if (state === '1') {
            return "#5f506b";
          } else if (state === '2') {
            return '#6a6b83'
          } else if (state === '3') {
            return '#76949f'
          } else {
            return '#86bbbd'
          }
        },

        showTransactionMethod(row) {
          let state = row.transactionMethod;
          if (state === '0') {
            return 'T/T'
          } else if (state === '1') {
            return 'Paypal'
          } else if (state === '2') {
            return 'Cash'
          } else {
            return 'Consume'
          }
        },

        showTransactionMethodColor(row) {
          let state = row.transactionMethod;
          if (state === '0') {
            return '#74d3ae'
          } else if (state === '1') {
            return '#678d58'
          } else if (state === '2') {
            return '#a6c48a'
          } else {
            return '#dd9787'
          }
        }
      }

    }
</script>

<style scoped>
  .labels {
    font-weight: bold;
  }
</style>
