<template>
  <div id="app">
    <visMenu></visMenu>
    <citylist></citylist>
    <div class="visualization">
      <component :is="current_vis"></component>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

import Citylist from './components/Citylist'
import VisMenu from './components/VisMenu'
import VisBar from './components/vis/VisBar'
import VisLine from './components/vis/VisLine'

export default {
  name: 'app',
  computed: mapGetters({
    current_vis: 'current_vis'
  }),
  components: {
    Citylist,
    VisMenu,
    VisBar,
    VisLine
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  color: #2c3e50;
}
</style>
