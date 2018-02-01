import React, { Component } from 'react'
import { scaleLinear, scaleTime } from 'd3-scale'
import { max, range } from 'd3-array'
import { select } from 'd3-selection'
import { timeYear, timeMinute, timeSecond } from 'd3-time'
import { axisLeft, axisRight, axisBottom, } from 'd3-axis'
import { formatPrefix } from 'd3-format'
import { timeFormat } from 'd3-time-format'
import { line, curveBasis } from 'd3-shape'
import { transition, active } from 'd3-transition'
import { easeLinear } from 'd3-ease'
import moment from 'moment';

class BarChart extends Component {
  constructor (props) {
    super(props)
    this.createBarChart = this.createBarChart.bind(this)
    const n = 40
    this.state = {
      margin: 20,
      dataPoints: n,
      leftAxisMargin: 15,
      graphData: null,
    }
  }

  componentDidMount () {
    this.createBarChart()
  }

  componentDidUpdate () {
    console.log("going to update chart")
    this.updateChart()
  }

  updateChart() {
    const node = this.node

    const {data, dimension, startMoment, endMoment} = this.props
    const { leftAxisMargin, xStart, xEnd } = this.state;

    // Update data
    const graphData = data;
    const dataMax = max(graphData.map((d) => d.yData)) || 1;
    const margin = this.state.margin;
    const canvasWidth = dimension[0]
    const canvasHeight = dimension[1]
    const graphWidth = canvasWidth - margin * 2
    const graphHeight = canvasHeight - margin * 2

    // Scales
    const x = scaleTime()
      .domain([xStart, xEnd])
      .range([0, graphWidth])
    const y = scaleLinear()
      .domain([-1, dataMax])
      .range([graphHeight, 0])

    // Axis Settings
    const xAxis = axisBottom(x)
      .ticks(timeSecond, 15)
      .tickFormat(timeFormat('%Mm %Ss'));
    const yMin = y.domain()[0]
    const yMax = dataMax
    const yAxis = axisRight(y)
      .tickSize(graphWidth)
      .tickValues(
        [yMin, 0, Math.floor((yMax - yMin) / 2), yMax]
      )
      .tickFormat(formatPrefix('.1', 1e2))

    const svg = select(node);
    const g = svg.select("g")

    g.select('.xAxis')
      .call(renderXAxis)
      .attr("transform", null)

    g.select('.xAxis')
      .transition()
      .duration(500)
      .ease(easeLinear)
      .attr("transform", `translate(${-2}, 0)`)

    function renderXAxis (g) {
      const lineColor = '#FFF'
      g.call(xAxis)
      g.select('.domain').remove()
      g.selectAll('.tick text').attr('fill', lineColor)
      g.selectAll('.tick line').attr('stroke', lineColor)
    }

    g.select('.yAxis')
      .call(renderYAxis)

    function renderYAxis (g) {
      const lineColor = '#FFF'

      g.call(yAxis)
      g.select('.domain').remove()

      g.selectAll('.tick line').attr('stroke', lineColor)
      g.selectAll('.tick:not(:first-of-type) line').attr('stroke', '#777').attr('stroke-dasharray', '2,2')
      g.selectAll('.tick:first-of-type text').remove()
      g.selectAll('.tick text')
        .attr('x', -leftAxisMargin - 10)
        .attr('fill', lineColor)
    }

    const lineGraph = line()
    .curve(curveBasis)
      .x((d, i) => { return x(d.xData); })
      .y((d) => { return y(d.yData); });

    g.select('.line')
      .attr("transform", null)
      .attr("d", lineGraph(graphData))
      .transition()
      .duration(500)
      .ease(easeLinear)
      .attr("transform", `translate(${-2}, 0)`)

  }

  onEachInterval = () => {
    const nowMoment = moment()
    const xStart = nowMoment.clone().subtract(60, 'seconds').toDate()
    const xEnd = moment().toDate()
    this.setState(() => {
      return {
        xStart: xStart,
        xEnd: xEnd,
      }
    });

    select(this.node)
      .transition()
      .duration(500)
      .ease(easeLinear)
      .on("end", this.onEachInterval);
  }

  createBarChart () {
    console.log('createBarChart')
    const {data, dimension, startMoment, endMoment} = this.props
    const { leftAxisMargin } = this.state;

    console.log("the data is : ");
    console.log(data);
    const n = 40;
    const nowMoment = moment();
    const testGraphData = range(n).map((i) => {
      return {
        xData: nowMoment.clone().add(i, 'seconds').toDate(),
        yData: Math.random() * 10,
      }
    })
    // const graphData = testGraphData;
    const graphData = data;
    this.setState(() => {
      return {graphData}
    });

    const node = this.node
    const dataMax = max(graphData.map((d) => {return d.yData;}))

    const margin = this.state.margin;

    const canvasWidth = dimension[0]
    const canvasHeight = dimension[1]
    const graphWidth = canvasWidth - margin * 2
    const graphHeight = canvasHeight - margin * 2

    const startDate = startMoment.toDate()
    const endDate = endMoment.toDate()
    console.log(startDate)
    console.log(endDate)

    // 1 minute = 60 bars
    // 1 bar = 1 pixel
    // width of data set = 1 * 60

    const barSize = 4
    const barWidth = 3

    const secondsBetween = endMoment.diff(startMoment, 'seconds')

    // Scales
    const x = scaleTime()
      // .domain([startDate, endDate])
      .domain([nowMoment.clone().subtract(60, 'seconds').toDate(), moment().toDate()])
      .range([0, graphWidth])
    const y = scaleLinear()
      .domain([-1, dataMax])
      .range([graphHeight, 0])

    // Axis Settings
    const xAxis = axisBottom(x)
      .ticks(timeSecond, 15)
      .tickFormat(timeFormat('%Mm %Ss'));
    const yMin = y.domain()[0]
    const yMax = dataMax
    const yAxis = axisRight(y)
      .tickSize(graphWidth)
      .tickValues(
        [yMin, 0, Math.floor((yMax - yMin) / 2), yMax]
      )
      .tickFormat(formatPrefix('.1', 1e2))

    const svg = select(node);
    const g = svg.append("g").attr("transform", "translate(" + margin + "," + margin + ")")

    g.append("defs").append("clipPath")
      .attr("id", "clip")
      .append("rect")
      .attr("width", graphWidth)
      .attr("height", graphHeight);

    g.append('g')
      .attr('transform', `translate(${leftAxisMargin}, ${graphHeight})`)
      .append('g')
        .attr('class', 'xAxis')
        .call(renderXAxis)

    g.append('g')
      .attr('class', 'yAxis')
      .attr('transform', `translate(${leftAxisMargin}, 0)`)
      .call(renderYAxis)

    function renderXAxis (g) {
      const lineColor = '#FFF'
      g.call(xAxis)
      g.select('.domain').remove()
      g.selectAll('.tick text').attr('fill', lineColor)
      g.selectAll('.tick line').attr('stroke', lineColor)
    }

    function renderYAxis (g) {
      const lineColor = '#FFF'

      g.call(yAxis)
      g.select('.domain').remove()

      g.selectAll('.tick line').attr('stroke', lineColor)
      g.selectAll('.tick:not(:first-of-type) line').attr('stroke', '#777').attr('stroke-dasharray', '2,2')
      g.selectAll('.tick:first-of-type text').remove()
      g.selectAll('.tick text')
        .attr('x', -leftAxisMargin - 10)
        .attr('fill', lineColor)
    }

    const lineGraph = line()
      .curve(curveBasis)
      .x((d, i) => { return x(d.xData); })
      .y((d) => { return y(d.yData); });

    const lineGraphWrapper = g.append("g").attr("clip-path", "url(#clip)")
    const lineGraphPath = lineGraphWrapper
      .attr('transform', `translate(${leftAxisMargin}, 0)`)
      .append("path")
      .datum(graphData)
      .attr("class", "line")
      .attr("d", lineGraph(graphData))
      .attr('fill', 'none')
      .attr('stroke', '#12e9ff')
      .attr('stroke-width', '1.5')

    svg.transition()
      .duration(500)
      .ease(easeLinear)
      .on('start', this.onEachInterval)


    // const bars = select(node)
    //   .selectAll('rect')
    //   .data(data)

    // bars
    //   .exit()
    //   .remove()
    //
    // bars
    //   .enter()
    //   .append('rect')

    // select(node)
    //   .selectAll('rect')
    //   .data(data)
    //   .style('fill', '#fe9922')
    //   .attr('x', (d, i) => i * barSize)
    //   .attr('y', d => graphHeight - yScale(d))
    //   .attr('height', d => yScale(d))
    //   .attr('width', barWidth)
    //   .attr('transform', `translate(${margin + leftAxisMargin}, ${margin})`)

  }

  render () {
    const {dimension} = this.props
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
