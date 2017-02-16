// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'

import store from './store'
import router from './router'
import { sync } from 'vuex-router-sync'

sync(store, router)

import Helper from './plugins/Helper'
Vue.use(Helper)

import QueryComposer from './plugins/QueryComposer'
Vue.use(QueryComposer, {store: store, router: router})

import App from './App'

/* eslint-disable no-new */
new Vue({
  router,
  el: '#app',
  store,
  template: '<App/>',
  components: { App }
})
