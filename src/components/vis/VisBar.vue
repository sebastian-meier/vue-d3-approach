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
      bars: {
        type: Object
      },
      xScale: {
        type: Object
      },
      yScale: {
        type: Object
      },
      barHeight: {
        type: Number
      },
      yAxis: {
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

      this.svg.append('g').attr('class', 'yAxis').attr('transform', 'translate(' + this.padding + ',' + this.padding + ')')
    },
    updateGraph: function () {
      var self = this

      this.barHeight = (this.height - ((this.visData.length - 1) * this.barPadding) - this.padding * 2) / this.visData.length

      this.xScale = d3.scaleLinear()
        .range([0, (this.width - this.padding * 2)])
        .domain([0, d3.max(this.visData, function (d) {
          return d.population
        })])

      this.yScale = d3.scaleLinear()
        .range([0, ((this.barHeight + this.barPadding) * (this.visData.length - 1))])
        .domain(d3.extent(this.visData, function (d) {
          return d.year
        }))

      var years = []
      this.visData.forEach(function (d) {
        years.push(d.year)
      })

      this.yAxis = d3.axisLeft().scale(this.yScale).tickFormat(d3.format('d')).tickValues(years)

      this.svg.select('.yAxis').attr('transform', 'translate(' + this.padding + ',' + (this.padding + this.barHeight / 2) + ')').call(this.yAxis)

      this.bars = this.g.selectAll('rect').data(this.visData)

      this.bars.exit().remove()

      this.bars
        .attr('x', 0)
        .transition()
          .duration(this.transitionDuration)
          .attr('height', this.barHeight)
          .attr('y', function (d, i) {
            return i * (self.barHeight + self.barPadding)
          })
          .attr('width', function (d) {
            return self.xScale(d.population)
          })

      this.bars.enter().append('rect')
        .attr('x', 0)
        .attr('y', function (d, i) {
          return i * (self.barHeight + self.barPadding)
        })
        .attr('height', this.barHeight)
        .transition()
          .duration(this.transitionDuration)
          .delay(this.transitionDuration)
          .attr('width', function (d) {
            return self.xScale(d.population)
          })
    }
  },
  computed: mapGetters({
    visData: 'data'
  })
}
</script>

<style>
  rect{
    fill:#000;
    stroke:transparent;
  }
</style>