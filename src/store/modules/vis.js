import * as types from '../mutation-types'

const state = {
  current_vis: 'VisBar'
}

const getters = {
  current_vis: state => state.current_vis
}

const actions = {
  selectVis ({commit}, vis) {
    commit(types.SELECT_VIS, vis)
  }
}

const mutations = {
  [types.SELECT_VIS] (state, vis) {
    state.current_vis = vis
  }
}

export default{
  state,
  getters,
  actions,
  mutations
}
