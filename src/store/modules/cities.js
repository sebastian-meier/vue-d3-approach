import data from '../../api/data'
import * as types from '../mutation-types'

const state = {
  cities: [],
  current_city: false,
  data: []
}

const getters = {
  cities: state => state.cities,
  current_city: state => state.current_city,
  data: state => state.data
}

const actions = {
  getCities ({commit}) {
    data.getCities(cities => {
      commit(types.RECEIVE_CITIES, { cities })
    })
  },

  getData ({commit}) {
    data.getData(data => {
      commit(types.RECEIVE_DATA, { data })
    }, { id: state.current_city })
  },

  selectCity ({commit}, city) {
    commit(types.SELECT_CITY, city)
    actions.getData({commit})
  }
}

const mutations = {
  [types.SELECT_CITY] (state, city) {
    state.current_city = city.id
  },

  [types.RECEIVE_CITIES] (state, { cities }) {
    state.cities = cities
  },

  [types.RECEIVE_DATA] (state, { data }) {
    state.data = data
  }
}

export default{
  state,
  getters,
  actions,
  mutations
}
