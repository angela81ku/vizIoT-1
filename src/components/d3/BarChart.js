import React, { Component } from 'react'
import { scaleLinear, scaleTime } from 'd3-scale'
import { max, range } from 'd3-array'
import { select } from 'd3-selection'
import  { timeYear, timeMinute, timeSecond} from 'd3-time'
import { axisLeft, axisRight, axisBottom, } from 'd3-axis'
import { formatPrefix } from 'd3-format'

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
    const { data, dimension, startMoment, endMoment } = this.props;

    const node = this.node
    const dataMax = max(data)

    const margin = 20
    const leftAxisMargin = 15

    const canvasWidth = dimension[0]
    const canvasHeight = dimension[1]
    const graphWidth = canvasWidth - margin * 2
    const graphHeight = canvasHeight - margin * 2

    const startDate = startMoment.toDate();
    const endDate = endMoment.toDate();
    console.log(startDate);
    console.log(endDate);

    // 1 minute = 60 bars
    // 1 bar = 1 pixel
    // width of data set = 1 * 60

    const barSize = 4;
    const barWidth = 3;

    const secondsBetween = endMoment.diff(startMoment, "seconds")

    const xScale = scaleTime()
      .domain([startDate, endDate])
      .range([0, secondsBetween * barSize])
    const xAxis = axisBottom(xScale)
      .ticks(timeMinute)

    const yScale = scaleLinear()
      .domain([-1, dataMax])
      .range([0, graphHeight])
    const yAxisScale = scaleLinear()
      .domain([-1, dataMax])
      .range([graphHeight, 0])
    const yMin = yAxisScale.domain()[0]
    const yMax = dataMax
    const yAxis = axisRight(yAxisScale)
      .tickSize(graphWidth)
      .tickValues(
        [yMin, 0, Math.floor((yMax - yMin) / 2), yMax]
      )
      .tickFormat(formatPrefix('.1', 1e2))

    const bars = select(node)
      .selectAll('rect')
      .data(data);

    bars
      .exit()
      .remove()

    bars
      .enter()
      .append('rect')

    select(node)
      .selectAll('rect')
      .data(data)
      .style('fill', '#fe9922')
      .attr('x', (d, i) => i * barSize)
      .attr('y', d => graphHeight - yScale(d))
      .attr('height', d => yScale(d))
      .attr('width', barWidth)
      .attr('transform', `translate(${margin + leftAxisMargin}, ${margin})`)

    select(node)
      .append('g')
      .attr('transform', `translate(${margin + leftAxisMargin}, ${graphHeight + margin})`)
      .call(customXAxis);

    select(node)
      .append('g')
      .call(customYAxis)

    function customXAxis(g) {
      g.call(xAxis);
      g.select('.domain').remove();
    }

    function customYAxis(g) {
      g.call(yAxis);
      g.attr('transform', `translate(${margin + leftAxisMargin}, ${margin})`)
      g.select(".domain").remove()

      g.selectAll(".tick:not(:first-of-type) line").attr("stroke", "#777").attr("stroke-dasharray", "2,2");
      g.selectAll(".tick:first-of-type text").remove()
      g.selectAll(".tick text").attr("x", -leftAxisMargin - 10);
    }
  }

  render () {
    const { dimension } = this.props;
    return (
      <div className="barChart-scrollable-wrapper">
      <svg ref={node => this.node = node}
           width={dimension[0]}
           height={dimension[1]}>
      </svg>
      </div>
    )
  }
}

export default BarChart