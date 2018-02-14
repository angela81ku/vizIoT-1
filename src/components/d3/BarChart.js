import React, { Component } from 'react'
import PropTypes from 'prop-types';
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
    this.launchChart = this.launchChart.bind(this)
    const n = 40
    const nowMoment = moment()

    const { dataWindowSize, margins } = this.props;

    this.state = {
      dataPoints: n,
      leftAxisMargin: 15,
      graphData: null,
      xStart: nowMoment.clone().subtract(dataWindowSize, 'seconds').toDate(),
      xEnd: nowMoment.toDate()
    }
    this.state = this.updateGraphDimensions(this.state);
  }

  componentDidMount () {
    this.launchChart()
  }

  componentDidUpdate () {
    this.redrawChart()
  }

  componentWillReceiveProps(nextProps) {
    this.setState(() => {
      return {
        ...this.updateGraphDimensions(this.state)
      }
    })
  }

  updateGraphDimensions(state) {
    const {margins, dimension} = this.props
    const {width, height} = dimension;
    const {left: margin} = margins;

    const graphWidth = width - margin * 2
    const graphHeight = height - margin * 2
    const graphDimensions = {graphWidth, graphHeight}
    return {
      ...state,
      graphDimensions,
    }
  }

  makeDummyGraphData() {
    const nowMoment = moment();
    const n = 40;
    return range(n).map((i) => {
      return {
        xData: nowMoment.clone().add(i, 'seconds').toDate(),
        yData: Math.random() * 10,
      }
    })
  }

  redrawChart() {
    const {data, dataWindow} = this.props
    const { leftAxisMargin, xStart, xEnd, graphDimensions} = this.state;
    const {graphWidth, graphHeight} = graphDimensions;

    // =================================================================================================================
    // Start Data Update
    // =================================================================================================================

    // Update data
    const graphData = data;
    const dataMax = max(graphData.map((d) => d.yData)) || 1;

    // Scales
    const x = scaleTime()
      .domain([xStart, xEnd])
      .range([0, graphWidth])
    const y = scaleLinear()
      .domain([-1, dataMax])
      .range([graphHeight, 0])

    // =================================================================================================================
    // Start Render Content
    // =================================================================================================================

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

    const node = this.node
    const svg = select(node);
    const g = svg.select("g")

    g.select('.xAxis')
      .call(this.redrawXAxis(xAxis))
      .attr("transform", null)
      // .attr('transform', `translate(0, ${graphHeight})`)
      .transition()
      .duration(500)
      .ease(easeLinear)
      .attr("transform", `translate(${-2}, 0)`)

    g.select('.yAxis')
      .call(this.redrawYAxis(yAxis, leftAxisMargin))

    g.select('#clip rect')
      .attr("width", graphWidth)
      .attr("height", graphHeight);

    // Path Update
    if (graphData && graphData.length > 1) {
      this.redrawLine(g.select('.line'), this.createLinePathData(x, y, graphData))
      // lineGraphPath
      //   .datum(graphData)
      //   .attr("d", lineGraph(graphData))
    }
  }

  createLinePathData(x, y, data) {
    const lineFunction = line()
      // .curve(curveBasis())
      .x((d, i) => { return x(d.xData); })
      .y((d) => { return y(d.yData); });
    return lineFunction(data);
  }

  redrawLine(g, linePathData) {
    g
      .attr("transform", null)
      .attr("d", linePathData)
      .transition()
      .duration(500)
      .ease(easeLinear)
      .attr("transform", `translate(${-2}, 0)`)
  }

  redrawXAxis (xAxis) {
    return (g) => {
      const lineColor = '#FFF'
      g.call(xAxis)
      g.select('.domain').remove()
      g.selectAll('.tick text').attr('fill', lineColor)
      g.selectAll('.tick line').attr('stroke', lineColor)
    }
  }

  redrawYAxis (yAxis, leftAxisMargin) {
    return (g) => {
      g.call(yAxis)
      g.select('.domain').remove()

      g.selectAll('.tick:not(:first-of-type) line').attr('stroke', '#777').attr('stroke-dasharray', '2,2')
      g.selectAll('.tick:first-of-type text').remove()
      g.selectAll('.tick text')
        .attr('x', -leftAxisMargin - 10)
    }
  }

  launchChart () {
    const {data, margins} = this.props
    const {left: margin} = margins;
    const { leftAxisMargin, graphDimensions} = this.state;
    const {graphWidth, graphHeight} = graphDimensions;

    const graphData = data; // makeDummyGraphData(nowMoment);
    this.setState(() => {
      return {graphData}
    });

    this.appendChartSkeleton(this.node, graphWidth, graphHeight, margin, leftAxisMargin)
    this.redrawChart()
    this.loop('start')
  }

  loop (whenToActivate) {
    select(this.node)
      .transition()
      .duration(500)
      .ease(easeLinear)
      .on(whenToActivate, this.onEachLoop)
  }

  onEachLoop = () => {
    const nowMoment = moment()
    const xStart = nowMoment.clone().subtract(this.props.dataWindowSize, 'seconds').toDate()
    const xEnd = moment().toDate()
    this.setState(() => {
      return {
        xStart: xStart,
        xEnd: xEnd,
      }
    });

    this.loop('end')
  }

  clearChartSkeleton() {
    const svg = select(this.node);
    svg.selectAll('chartWrapper').remove();
  }

  appendChartSkeleton (node, graphWidth, graphHeight, margin, leftAxisMargin) {
    const svg = select(node);
    const g = svg.append("g")
      .attr('class', 'chartWrapper')
      .attr("transform", "translate(" + margin + "," + margin + ")")

    g.append("defs").append("clipPath")
      .attr("id", "clip")
      .append("rect")
      .attr("width", graphWidth)
      .attr("height", graphHeight);

    g.append('g')
      .attr('transform', `translate(${leftAxisMargin}, ${graphHeight})`)
      .append('g')
      .attr('class', 'xAxis')

    g.append('g')
      .attr('class', 'yAxis')
      .attr('transform', `translate(${leftAxisMargin}, 0)`)

    const lineGraphWrapper = g.append("g")
      .attr('class', 'lineGraph__wrapper')
      .attr("clip-path", "url(#clip)")
      .attr('transform', `translate(${leftAxisMargin}, 0)`)

    lineGraphWrapper
      .append("path")
      .attr("class", "line")
  }

  render () {
    const {dimension} = this.props
    const {width, height} = dimension;
    return (
      <div className="barChart-scrollable-wrapper">
        <svg ref={node => this.node = node}
             width={width}
             height={height}>
        </svg>
      </div>
    )
  }
}

BarChart.propTypes = {
  dimension: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired,
  dataWindowSize: PropTypes.number.isRequired,
  margins: PropTypes.object.isRequired,
};

export default BarChart


// const bars = select(node)
//   .selectAll('rect')
//   .data(data)

// bars
//   .exit()
//   .remove()

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