import React, { Component } from 'react'
import { scaleLinear } from 'd3-scale'
import { max } from 'd3-array'
import { select } from 'd3-selection'
import { axisLeft } from 'd3-axis'

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

    const canvasHeight = this.props.size[1]
    const graphHeight = this.props.size[1] - margin * 2

    const yScale = scaleLinear()
      .domain([0, dataMax])
      .range([0, graphHeight])

    const yAxisScale = scaleLinear()
      .domain([0, dataMax])
      .range([graphHeight, 0])
    const yAxis = axisLeft(yAxisScale)


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
      .attr('x', (d, i) => i * 3)
      .attr('y', d => graphHeight - yScale(d))
      .attr('height', d => yScale(d))
      .attr('width', 2)
      .attr('transform', `translate(${margin}, ${margin})`)

    select(node)
      .append('g')
      .attr('transform', `translate(${margin}, ${margin})`)
      .call(yAxis)
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