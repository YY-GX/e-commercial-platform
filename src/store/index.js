import Vue from 'vue'
import Vuex from 'vuex'
import VuexI18n from 'vuex-i18n' // load vuex i18n module
import mvo from './modules/mvo'
import wallet from './modules/wallet'
import bvo from './modules/bvo'
import user from './modules/user'
import basic from './modules/basic'

import * as getters from './getters'

Vue.use(Vuex);

const store = new Vuex.Store({
  strict: true, // process.env.NODE_ENV !== 'production',
  getters,
  modules: {
    mvo,
    wallet,
    bvo,
    user,
    basic
  },
  state: {},
  mutations: {},
});

Vue.use(VuexI18n.plugin, store);

export default store
