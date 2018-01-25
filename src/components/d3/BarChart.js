import React, { Component } from 'react'
import { scaleLinear } from 'd3-scale'
import { max } from 'd3-array'
import { select } from 'd3-selection'
import { axisLeft, axisRight } from 'd3-axis'

class BarChart extends Component {
  constructor (props) {
    super(props)
    this.createBarChart = this.createBarChart.bind(this)
  }

  componentDidMount () {
    this.createBarChart()
  }

  componentDidUpdate () {
    this.createBarChart()
  }

  createBarChart () {
    const node = this.node
    const dataMax = max(this.props.data)

    const margin = 20

    const canvasWidth = this.props.size[0]
    const canvasHeight = this.props.size[1]
    const graphWidth = canvasWidth - margin * 2
    const graphHeight = canvasHeight - margin * 2

    const yScale = scaleLinear()
      .domain([0, dataMax])
      .range([0, graphHeight])

    const yAxisScale = scaleLinear()
      .domain([0, dataMax])
      .range([graphHeight, 0])
    const yAxis = axisRight(yAxisScale)
      .tickSize(graphWidth)

    select(node)
      .selectAll('rect')
      .data(this.props.data)
      .enter()
      .append('rect')

    select(node)
      .selectAll('rect')
      .data(this.props.data)
      .exit()
      .remove()

    select(node)
      .selectAll('rect')
      .data(this.props.data)
      .style('fill', '#fe9922')
      .attr('x', (d, i) => i * 2)
      .attr('y', d => graphHeight - yScale(d))
      .attr('height', d => yScale(d))
      .attr('width', 1)
      .attr('transform', `translate(${margin}, ${margin})`)

    select(node)
      .append('g')
      .call(customYAxis)
    function customYAxis(g) {
      g.call(yAxis);
      g.attr('transform', `translate(${margin}, ${margin})`)
      g.select(".domain").remove()
      g.selectAll(".tick:not(:first-of-type) line").attr("stroke", "#777").attr("stroke-dasharray", "2,2");
      g.selectAll(".tick text").attr("x", -10);
    }
  }

  render () {
    return (
      <div className="barChart-scrollable-wrapper">
      <svg ref={node => this.node = node}
           width={this.props.size[0]}
           height={this.props.size[1]}>
      </svg>
      </div>
    )
  }
}

export default BarChart