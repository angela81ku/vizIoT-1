import React, { Component, PureComponent, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { scaleLinear, scaleTime } from 'd3-scale';
import { max, range } from 'd3-array';
import { select } from 'd3-selection';
import { timeSecond } from 'd3-time';
import { axisRight, axisBottom } from 'd3-axis';
import { format, formatPrefix } from 'd3-format';
import { timeFormat } from 'd3-time-format';
import { curveBasis, curveMonotoneX, curveStep, line } from 'd3-shape';
import { easeLinear } from 'd3-ease';
import { active, transition } from 'd3-transition';
import { interval } from 'd3-timer';
import moment from 'moment';
import { SPACING } from '../../data/records/Spacing';

// my imports
import * as d3Coll from 'd3-collection';

// Live temporal graphs transition 1 second worth of pixels every 1 second
const getTransitionAmount = (xStart, xEnd, graphWidth, duration) => {
  const startUnix = xStart.getTime() / 1000.0;
  const endUnix = xEnd.getTime() / 1000.0;
  return Math.round(graphWidth / (endUnix - startUnix)) * (duration / 1000);
};

const TRANSITION_INTERVAL = 4000;

// const lColors = [ '#03cbac', '#d9b409', '#d78219', '#a709ee', '#4b8b05']

class RollingXAxis extends Component {
  transitionRunning = false;

  kickoffTransition = (transitionAmount) => {

    if (this.transitionRunning) {
      return;
    }

    const { node } = this.props;
    const item = node.select('.xAxis');

    const repeat = () => {
      const t = transition().duration(TRANSITION_INTERVAL).ease(easeLinear);

      if (!item.empty()) {
        this.transitionRunning = true;
      }

      item
        .attr('transform', 'translate(0, 0)')
        .transition(t)
        .attr('transform', `translate(${-transitionAmount}, 0)`)
        .on('end', repeat);
    };
    repeat();
  };

  shouldComponentUpdate() {
    return this.props.node.empty();
  }

  getLiveDomainForX = () => {
    const { dataWindowSize, dataWindowUnit } = this.props;
    const nowMoment = moment().second(0);
    const xStart = nowMoment
      .clone()
      .subtract(dataWindowSize, dataWindowUnit)
      .toDate();
    const xEnd = nowMoment.toDate();
    return { xStart, xEnd };
  };

  // xStart, xEnd are times.
  render() {
    const { node, translateX, translateY, width } = this.props;

    const { xStart, xEnd } = this.getLiveDomainForX();

    const redrawXAxis = (xAxis) => {
      return g => {
        g.call(xAxis);
        g.select('.domain').remove();
        g.selectAll('.tick text').attr('font-size', '14px');
      };
    };

    const x = scaleTime()
      .domain([xStart, xEnd])
      .range([0, width]);

    const xAxis = axisBottom(x)
      .ticks(timeSecond, 10)
      // .tickFormat(d => `${moment().diff(moment(d), 'seconds')}s ago`);
      .tickFormat(d => `${d.getSeconds()}s ago`);

    const xAxisNode = node.select('.xAxis').call(redrawXAxis(xAxis));

    node.select('.xAxisContainer').attr(
      'transform',
      `translate(${translateX}, ${translateY})`
    );

    const transitionAmount = getTransitionAmount(xStart, xEnd, width, TRANSITION_INTERVAL);
    // this.kickoffTransition(transitionAmount);

    return null;
  };
}


// TODO try separating the 'Live' / 'high-frequency' aspect into a HoC factory
class LiveLineGraph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      leftAxisMargin: 15,
      redraw: true,
      looper: null,
      transitionLoop: null,
      flowLines: 0,
      graphWrapper: null,
      ...this.mapPropsToState(props),
    };
  }

  static getGraphDimensions(props) {
    const {
      padding,
      dimension: { width, height },
    } = props;
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

  mapPropsToState = props => {
    const { data, transitionDuration, lineColors } = props;

    const lColors = lineColors ? lineColors : ['white'];

    const graphDimensions = LiveLineGraph.getGraphDimensions(props);
    const domain = this.getLiveDomainForX();
    const transitionAmount = getTransitionAmount(
      domain.xStart,
      domain.xEnd,
      graphDimensions.graphWidth,
      transitionDuration,
    );

    return {
      graphDimensions,
      ...domain,
      graphData: data,
      transitionAmount,
      lColors
    };
  };

  componentWillUnmount() {
    const { looper, transitionLoop } = this.state;

    if (looper) {
      clearInterval(looper);
    }
    if (transitionLoop) {
      clearInterval(transitionLoop);
    }
  }

  shouldComponentUpdate() {
    // console.log(this.state.redraw);
    return this.state.redraw;
  }

  componentDidMount() {
    this.launchChart();
  }

  componentDidUpdate() {
    // After render, turn flag false to prevent further renders
    this.setState({ redraw: false });
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
      transitionAmount
    } = this.state;

    const { transitionDuration } = this.props;

    // =================================================================================================================
    // Start Data Update
    // =================================================================================================================

    const axisAtLeast = 3;

    // console.log(graphData);
    let dataMax = 0;
    graphData.forEach(second => {
      const secondMax = max(second.map(d => d.yData));
      dataMax = Math.max(secondMax, dataMax);
    })
    // const dataMax = max(maxVal, 1) //max(graphData.map(d => d.yData)) || 1;

    // console.log(maxVal);

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
      .ticks(timeSecond, 10)
      .tickFormat(d => `${moment().diff(moment(d), 'seconds')}s ago`);
    const yMin = y.domain()[0];
    const yMax = axisMax;
    const yAxis = axisRight(y)
      .tickSize(graphWidth)
      .tickValues([yMin, 0, Math.floor((dataMax - yMin) / 2), dataMax, yMax])
      .tickFormat(format('.2s'));

    const node = this.node;
    const svg = select(node);
    const g = svg.select('g');

    g.select('.yAxis').call(this.redrawYAxis(yAxis, leftAxisMargin));

    g.select('#clip rect')
      .attr('width', graphWidth)
      .attr('height', graphHeight);

    // Path Update
    if (graphData && graphData.length > 1) {

      // make sure there are attributes for each flow to be drawn to the screen
      // this will re-write names for 'line$#' html attr
      const flows = graphData[graphData.length - 1].length;
      if (this.state.flowLines !== flows && this.state.graphWrapper !== null) {
        LiveLineGraph.assignGraphLines(this.state.graphWrapper, flows)
        this.setState({
          flowLines: flows
        })
      }

      // iterate through all the different plot points
      // graphData[0] = line1 (flow 1)
      // graphData[1] = line2 (flow 2)
      // graphData[2] = ...
      for (let i = 0; i < graphData[0].length; ++i) {
        // don't try to draw more lines than there are colors
        if (i > this.state.lColors.length) {
          break;
        }
        // store all data points for flow i
        const _graphData = [];
        for (let j = 0; j < graphData.length; ++j) {
          _graphData.push(graphData[j][i]);
        }

        // draw line
        const attr = '.line' + i;
        LiveLineGraph.redrawLine(
            g.select(attr),
            this.createLinePathData(x, y, _graphData),
            transitionDuration,
            transitionAmount,
            x,
            node,
            this.state.lColors[i],
        );
      }
    }
  }

  createLinePathData(x, y, data) {
    const lineFunction = line()
      .curve(curveMonotoneX)
      .x(d => {
        return x(d.xData);
      })
      .y(d => {
        return y(d.yData);
      });
    return lineFunction(data);
  }

  static redrawLine(g, linePathData, transitionDuration, transitionAmount, x, node, color) {
    // also assigns color now
    g.attr('transform', null)
      .attr('d', linePathData)
      .attr('fill', 'none')
      .attr('stroke', color)
      .attr('stroke-width', '2')
      .interrupt() // VERY IMPORTANT
      .transition()
      .duration(1000)
      .ease(easeLinear)
      .attr('transform', `translate(${-transitionAmount}, 0)`)
  }

  redrawYAxis(yAxis, leftAxisMargin) {
    return g => {
      g.call(yAxis);
      g.select('.domain').remove();

      g.selectAll('.tick:not(:first-of-type) line')
        .attr('stroke', '#777')
        .attr('stroke-dasharray', '1,6');
      g.selectAll('.tick:first-of-type text').remove();
      g.selectAll('.tick text')
        .attr('x', -leftAxisMargin - 10)
        .attr('font-size', '14px');
    };
  }

  launchChart = () => {
    const { data, padding } = this.props;
    const { l, r, t, b } = padding;
    const { leftAxisMargin, graphDimensions } = this.state;
    const { graphWidth, graphHeight } = graphDimensions;

    const graphData = data; // makeDummyGraphData(nowMoment);

    // get graph wrapper from chart skeleton
    const graphWrapper = LiveLineGraph.appendChartSkeleton(
      this.node,
      graphWidth,
      graphHeight,
      l,
      leftAxisMargin
    );

    // store graph wrapper in state
    // graph wrapper allows dynamic appending of 'line' attributes when redrawing chart
    // store data in state
    this.setState({
      graphData: graphData,
      graphWrapper: graphWrapper
    })
    // this.redrawChart();
    // this.startRenderLoop();
    this.startTransitionLoop();
  };

  startTransitionLoop = () => {
    const looper = setInterval(() => {
      // console.log('start next transition');
      this.redrawChart();

      // this.setState(() => ({ redraw: true }));
    }, 1000); // 4s loop
    this.setState({ transitionLoop: looper });
  };

  startRenderLoop = () => {
    const looper = setInterval(
      () => {
        this.onEachLoop();
        }, 500);
    this.setState({ looper });
  };

  onEachLoop = () => {
    this.setState(() => ({
      ...this.getLiveDomainForX(),
      redraw: true
    }));
  };

  static appendChartSkeleton(node, graphWidth, graphHeight, l, leftAxisMargin) {
    const svg = select(node);
    const g = svg
      .append('g')
      .attr('class', 'chartWrapper')
      .attr('transform', 'translate(' + l + ',' + l + ')');

    g.append('defs')
      .append('clipPath')
      .attr('id', 'clip')
      .append('rect')
      .attr('width', graphWidth)
      .attr('height', graphHeight);

    g.select('defs')
      .append('clipPath')
      .attr('id', 'xAxisClip')
      .append('rect')
      .attr('width', graphWidth - leftAxisMargin)
      .attr('height', graphHeight);

    g.append('g')
      .attr('transform', `translate(${leftAxisMargin}, ${graphHeight})`)
      .attr('class', 'xAxisContainer')
      .attr('clip-path', 'url(#xAxisClip)')
      .append('g')
      .attr('class', 'xAxis');

    g.append('g')
      .attr('class', 'yAxis')
      .attr('transform', `translate(${leftAxisMargin}, 0)`);

    const lineGraphWrapper = g
      .append('svg')
      .attr('class', 'graphSvg__wrapper')
      .append('g')
      .attr('class', 'lineGraph__wrapper')
      .attr('transform', `translate(${leftAxisMargin}, 0)`)
      .attr('clip-path', 'url(#xAxisClip)'); // TODO debug this clip thing.

    return lineGraphWrapper;
    //
    // lineGraphWrapper.append('path').attr('class', 'line');
    // lineGraphWrapper.append('path').attr('class', 'line2');
  }

  static assignGraphLines(graphWrapper, numLines) {
    for (let i = 0; i < numLines; ++i) {
      const attr = 'line' + i;
      graphWrapper.append('path').attr('class', attr);
    }
  }

  render() {

    const {
      dimension: { width, height },
      dataWindowSize, dataWindowUnit,
    } = this.props;

    const { leftAxisMargin, xStart, xEnd, graphDimensions: { graphWidth, graphHeight },
    } = this.state;

    const svg = select(this.node);
    const g = svg.select('g');

    return (
      <div className="barChart-scrollable-wrapper">
        <RollingXAxis node={g}
                      translateX={leftAxisMargin} translateY={graphHeight} width={graphWidth}
                      dataWindowSize={dataWindowSize} dataWindowUnit={dataWindowUnit} />
        <svg
          ref={node => (this.node = node)}
          viewBox={`0 0 ${width} ${height}`}
        />
      </div>
    );
  }
}

LiveLineGraph.propTypes = {
  dimension: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired,
  dataWindowSize: PropTypes.number.isRequired,
  dataWindowUnit: PropTypes.string.isRequired,
  padding: PropTypes.instanceOf(SPACING).isRequired,
  transitionDuration: PropTypes.number.isRequired,
};

export default LiveLineGraph;
