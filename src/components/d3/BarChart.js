import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { scaleLinear, scaleTime } from 'd3-scale';
import { max, range } from 'd3-array';
import { select } from 'd3-selection';
import { timeSecond } from 'd3-time';
import { axisRight, axisBottom } from 'd3-axis';
import { formatPrefix } from 'd3-format';
import { timeFormat } from 'd3-time-format';
import { line } from 'd3-shape';
import { easeLinear } from 'd3-ease';
import { transition } from 'd3-transition';
import moment from 'moment';
import { SPACING } from '../../data/records/Spacing';

class BarChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      leftAxisMargin: 15,
      transitionDuration: 1000,
      ...this.mapPropsToState(props),
    };
  }

  static getGraphDimensions(props) {
    const { padding, dimension: { width, height } } = props;
    const { l, r, t, b } = padding;

    const graphWidth = width - l - r;
    const graphHeight = height - t - b;
    return { graphWidth, graphHeight };
  }

  getLiveDomainForX = () => {
    const { dataWindowSize, dataWindowUnit } = this.props;
    const nowMoment = moment();
    const xStart = nowMoment
      .clone()
      .subtract(dataWindowSize, dataWindowUnit)
      .toDate();
    const xEnd = nowMoment.toDate();
    return { xStart, xEnd };
  };

  getTransitionAmount = (xStart, xEnd, graphWidth) => {
    const startUnix = Math.round(xStart.getTime() / 1000);
    const endUnix = Math.round(xEnd.getTime() / 1000);
    return Math.round(graphWidth / (endUnix - startUnix));
  };

  mapPropsToState = props => {
    const { data } = props;

    const graphDimensions = BarChart.getGraphDimensions(props);
    const domain = this.getLiveDomainForX();
    const transitionAmount = this.getTransitionAmount(
      domain.xStart,
      domain.xEnd,
      graphDimensions.graphWidth
    );

    return {
      graphDimensions,
      ...domain,
      graphData: data,
      transitionAmount,
    };
  };

  componentDidMount() {
    this.launchChart();
  }

  componentDidUpdate() {
    // this.redrawChart();
  }

  componentWillReceiveProps(newProps) {
    this.setState(() => this.mapPropsToState(newProps));
  }

  redrawChart() {
    const {
      graphData,
      leftAxisMargin,
      xStart,
      xEnd,
      graphDimensions: { graphWidth, graphHeight },
      transitionAmount,
      transitionDuration,
    } = this.state;

    // =================================================================================================================
    // Start Data Update
    // =================================================================================================================

    const axisAtLeast = 3;

    const dataMax = max(graphData.map(d => d.yData)) || 1;

    const axisMax = Math.max(dataMax, axisAtLeast);

    const x = scaleTime()
      .domain([xStart, xEnd])
      .range([0, graphWidth]);
    const y = scaleLinear()
      .domain([-1, axisMax])
      .range([graphHeight, 0]);

    // =================================================================================================================
    // Start Render Content
    // =================================================================================================================

    // Axis Settings
    const xAxis = axisBottom(x)
      .ticks(timeSecond, 30)
      .tickFormat(d => `${moment().diff(moment(d), 'seconds')}s ago`);
    const yMin = y.domain()[0];
    const yMax = axisMax;
    const yAxis = axisRight(y)
      .tickSize(graphWidth)
      .tickValues([yMin, 0, Math.floor((dataMax - yMin) / 2), dataMax, yMax])
      .tickFormat(formatPrefix('.1', 1e2));

    const node = this.node;
    const svg = select(node);
    const g = svg.select('g');

    g
      .select('.xAxisContainer')
      .attr('transform', `translate(0, ${graphHeight})`);

    g
      .select('.xAxis')
      .call(this.redrawXAxis(xAxis))
      .attr('transform', null)
      .transition()
      .duration(transitionDuration)
      .ease(easeLinear)
      .attr('transform', `translate(${-transitionAmount}, 0)`);

    g.select('.yAxis').call(this.redrawYAxis(yAxis, leftAxisMargin));

    g
      .select('#clip rect')
      .attr('width', graphWidth)
      .attr('height', graphHeight);

    // Path Update
    if (graphData && graphData.length > 1) {
      BarChart.redrawLine(
        g.select('.line'),
        this.createLinePathData(x, y, graphData),
        transitionDuration,
        transitionAmount
      );
    }
  }

  createLinePathData(x, y, data) {
    const lineFunction = line()
      // .curve(curveBasis())
      .x(d => {
        return x(d.xData);
      })
      .y(d => {
        return y(d.yData);
      });
    return lineFunction(data);
  }

  static redrawLine(g, linePathData, transitionDuration, transitionAmount) {
    g
      .attr('transform', null)
      .attr('d', linePathData)
      .transition()
      .duration(transitionDuration)
      .ease(easeLinear)
      .attr('transform', `translate(${-transitionAmount}, 0)`); // TODO make this dynamic to width
  }

  redrawXAxis(xAxis) {
    return g => {
      g.call(xAxis);
      g.select('.domain').remove();
    };
  }

  redrawYAxis(yAxis, leftAxisMargin) {
    return g => {
      g.call(yAxis);
      g.select('.domain').remove();

      g
        .selectAll('.tick:not(:first-of-type) line')
        .attr('stroke', '#777')
        .attr('stroke-dasharray', '2,2');
      g.selectAll('.tick:first-of-type text').remove();
      g.selectAll('.tick text').attr('x', -leftAxisMargin - 10);
    };
  }

  launchChart = () => {
    const { data, padding } = this.props;
    const { l, r, t, b } = padding;
    const { leftAxisMargin, graphDimensions } = this.state;
    const { graphWidth, graphHeight } = graphDimensions;

    const graphData = data; // makeDummyGraphData(nowMoment);
    this.setState(() => {
      return { graphData };
    });

    BarChart.appendChartSkeleton(
      this.node,
      graphWidth,
      graphHeight,
      l,
      leftAxisMargin
    );
    this.redrawChart();
    this.loop('start');
  };

  loop(whenToActivate) {
    select(this.node)
      .transition()
      .duration(500)
      .ease(easeLinear)
      .on(whenToActivate, this.onEachLoop);
  }

  onEachLoop = () => {
    this.setState(() => ({ ...this.getLiveDomainForX() }));
    this.loop('end');
  };

  // clearChartSkeleton() {
  //   const svg = select(this.node);
  //   svg.selectAll('chartWrapper').remove();
  // }

  static appendChartSkeleton(node, graphWidth, graphHeight, l, leftAxisMargin) {
    const svg = select(node);
    const g = svg
      .append('g')
      .attr('class', 'chartWrapper')
      .attr('transform', 'translate(' + l + ',' + l + ')');

    g
      .append('defs')
      .append('clipPath')
      .attr('id', 'clip')
      .append('rect')
      .attr('width', graphWidth)
      .attr('height', graphHeight);

    g
      .append('g')
      .attr('transform', `translate(${leftAxisMargin}, ${graphHeight})`)
      .attr('class', 'xAxisContainer')
      .append('g')
      .attr('class', 'xAxis');

    g
      .append('g')
      .attr('class', 'yAxis')
      .attr('transform', `translate(${leftAxisMargin}, 0)`);

    const lineGraphWrapper = g
      .append('svg')
      .attr('class', 'graphSvg__wrapper')
      .append('g')
      .attr('class', 'lineGraph__wrapper')
      .attr('transform', `translate(${leftAxisMargin}, 0)`)
      .attr('clip-path', 'url(#clip)');

    lineGraphWrapper.append('path').attr('class', 'line');
  }

  render() {
    const { dimension: { width, height } } = this.props;
    this.redrawChart();
    return (
      <div className="barChart-scrollable-wrapper">
        <svg ref={node => (this.node = node)} width={width} height={height} />
      </div>
    );
  }
}

BarChart.propTypes = {
  dimension: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired,
  dataWindowSize: PropTypes.number.isRequired,
  dataWindowUnit: PropTypes.string.isRequired,
  padding: PropTypes.instanceOf(SPACING).isRequired,
};

export default BarChart;

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

// makeDummyGraphData() {
//   const nowMoment = moment();
//   const n = 40;
//   return range(n).map(i => {
//     return {
//       xData: nowMoment
//         .clone()
//         .add(i, 'seconds')
//         .toDate(),
//       yData: Math.random() * 10,
//     };
//   });
// }
