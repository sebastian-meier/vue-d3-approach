<template>
  <div class="vismenu">
    <ul>
      <li v-bind:class="current_vis === 'VisBar' ? 'active' : 'inactive'" v-on:click="composeQuery({vis:'VisBar'})">Bars</li>
      <li v-bind:class="current_vis === 'VisLine' ? 'active' : 'inactive'" v-on:click="composeQuery({vis:'VisLine'})">Lines</li>
    </ul>
  </div>
</template>

<script>
import Vue from 'vue'
import {mapGetters} from 'vuex'

export default {
  computed: mapGetters({
    current_vis: 'current_vis'
  }),
  created () {
    this.checkState()
  },
  watch: {
    '$route': 'checkState'
  },
  methods: {
    checkState () {
      let query = this.$router.currentRoute.query
      if ('vis' in query) {
        this.$store.dispatch('selectVis', query.vis)
      }
    },
    composeQuery (obj = {}) {
      Vue.composeQuery(obj)
    }
  }
}
</script>

<style scoped>
.vismenu li.active{
  color:red;
}
</style>
