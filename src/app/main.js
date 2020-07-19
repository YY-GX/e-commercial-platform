// Polyfills
import 'core-js/stable'
import 'regenerator-runtime/runtime'
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import { ColorThemePlugin } from '../services/vuestic-ui'
import store from '../store/index'
import router from '../router/index'
import { VuesticPlugin } from '../services/vuestic-ui/components'
import '../i18n/index'
import YmapPlugin from 'vue-yandex-maps'
import VueClipboard from 'vue-clipboard2'

import '../metrics'
import '../registerServiceWorker'

import axios from 'axios'
import VueAxios from 'vue-axios'
import http from '../utils/httpAxios'

import { consoleBuildInfo } from 'vue-cli-plugin-build-info/plugin'

consoleBuildInfo();

axios.defaults.withCredentials = true;

var imageUpload = axios.create({
  baseURL:'',
  timeout:8000,
  headers:{"Content-Type":"multipart/form-data"}
})

var tokenGet = axios.create({
  baseURL:'',
  timeout:8000,
  headers:{"Content-Type":"multipart/form-data"}
})

Vue.prototype.$http= http;
Vue.prototype.imageUpload = imageUpload;
Vue.prototype.tokenGet = tokenGet

Vue.use(VueAxios, axios);
Vue.use(VuesticPlugin)
Vue.use(YmapPlugin)
Vue.use(VueClipboard)

Vue.use(ColorThemePlugin, {
  // override colors here.
})


router.beforeEach((to, from, next) => {
  store.commit('setLoading', true)
  next()
})

router.afterEach((to, from) => {
  store.commit('setLoading', false)
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
})
