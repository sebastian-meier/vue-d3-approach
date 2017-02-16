const install = function (Vue, options) {
  let router = options.router
  let store = options.store

  Vue.composeQuery = function (obj = {}) {
    let query = Vue.util.extend({}, store.state.route.query)
    let change = false

    for (let key in obj) {
      if (query[key] !== obj[key]) change = true
      query[key] = obj[key]
    }

    if (change) {
      router.push({path: store.state.route.path, query: query})
    }
  }
}

export default {
  install
}
