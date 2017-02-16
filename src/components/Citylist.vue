<template>
  <div class="citylist">
    <ul>
      <li v-for="c in cities" v-bind:class="current_city === c.id ? 'active' : 'inactive'" v-on:click="composeQuery({city:c.id})">
        {{c.title}}
      </li>
    </ul>
  </div>
</template>

<script>
import Vue from 'vue'
import {mapGetters} from 'vuex'

export default {
  computed: mapGetters({
    cities: 'cities',
    current_city: 'current_city'
  }),
  created () {
    this.$store.dispatch('getCities')
    this.checkState()
  },
  watch: {
    '$route': 'checkState'
  },
  methods: {
    checkState () {
      let query = this.$router.currentRoute.query
      if (('city' in query) && query.city > 0) {
        this.$store.dispatch('selectCity', { id: parseInt(query.city) })
      }
    },
    composeQuery (obj = {}) {
      Vue.composeQuery(obj)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
li{
  margin-left:20px;
}

li.active{
  color:red;
}
</style>
