const install = function (Vue, options) {
  Vue.uniqueID = function () {
    var d = new Date()
    return 'id-' + d.getTime() + '-' + (Math.random() * 1000000).toFixed(0)
  }
}

export default {
  install
}
