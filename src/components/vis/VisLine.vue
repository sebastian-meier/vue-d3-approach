<template>
  <div class="graph" :id="randomid"></div>
</template>

<script>
import * as d3 from 'd3'
import Vue from 'vue'
import {mapGetters} from 'vuex'

export default {
  props: {
    width: {
      type: Number,
      default: 400
    },
    height: {
      type: Number,
      default: 200
    },
    padding: {
      type: Number,
      default: 50
    },
    barPadding: {
      type: Number,
      default: 2
    },
    transitionDuration: {
      type: Number,
      default: 200
    }
  },
  data: function () {
    return {
      randomid: Vue.uniqueID(),
      svg: {
        type: Object
      },
      g: {
        type: Object
      },
      graph: {
        type: Object
      },
      xScale: {
        type: Object
      },
      yScale: {
        type: Object
      },
      line: {
        type: Object
      }
    }
  },
  created () {
    this.$store.dispatch('getData')
  },
  mounted () {
    this.createGraph()
  },
  watch: {
    'visData': 'updateGraph'
  },
  methods: {
    createGraph: function () {
      this.svg = d3.select('#' + this.randomid).append('svg')
        .attr('width', this.width)
        .attr('height', this.height)

      this.g = this.svg.append('g').attr('transform', 'translate(' + this.padding + ',' + this.padding + ')')

      this.graph = this.g.append('path')

      this.svg.append('g').attr('class', 'xAxis').attr('transform', 'translate(' + this.padding + ',' + (this.height - this.padding) + ')')
      this.svg.append('g').attr('class', 'yAxis').attr('transform', 'translate(' + this.padding + ',' + this.padding + ')')
    },
    updateGraph: function () {
      var self = this

      this.xScale = d3.scaleLinear()
        .range([0, (this.width - this.padding * 2)])
        .domain(d3.extent(this.visData, function (d) {
          return d.year
        }))

      this.yScale = d3.scaleLinear()
        .range([0, (this.height - this.padding * 2)])
        .domain([d3.max(this.visData, function (d) {
          return d.population
        }), 0])

      var years = []
      this.visData.forEach(function (d) {
        years.push(d.year)
      })

      var xAxis = d3.axisBottom().scale(this.xScale).tickFormat(d3.format('d')).tickValues(years)
      this.svg.select('.xAxis').call(xAxis)

      var yAxis = d3.axisLeft().scale(this.yScale).ticks(5, ',f')
      this.svg.select('.yAxis').call(yAxis)

      this.line = d3.line()
        .x(function (d) { return self.xScale(d.year) })
        .y(function (d) { return self.yScale(d.population) })

      this.graph.datum(this.visData)
        .transition()
          .duration(this.transitionDuration)
          .attr('d', this.line)
    }
  },
  computed: mapGetters({
    visData: 'data'
  })
}
</script>

<style>
  path{
    fill:transparent;
    stroke:#000;
  }
</style>