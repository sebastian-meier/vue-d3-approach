import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'

import cities from './modules/cities'
import vis from './modules/vis'

Vue.use(Vuex)

export default new Vuex.Store({
  actions,
  getters,
  modules: {
    cities,
    vis
  }
})
