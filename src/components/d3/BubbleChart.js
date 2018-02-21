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

class BubbleChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      leftAxisMargin: 15,
      graphData: [],
      ...this.getLiveDomainForX(),
      graphDimensions: this.getGraphDimensions(),
    };
  }

  componentDidMount() {
    this.launchChart();
  }

  componentDidUpdate() {
    // this.redrawChart();
  }

  componentWillReceiveProps(newProps) {
    this.setState(() => {
      return {
        graphDimensions: this.getGraphDimensions(),
        graphData: newProps.data,
      };
    });
  }

  getGraphDimensions() {
    const { margins, dimension: { width, height } } = this.props;
    const { left: margin } = margins;

    const graphWidth = width - margin * 2;
    const graphHeight = height - margin * 2;
    return { graphWidth, graphHeight };
  }

  redrawChart() {
    const {
      graphData,
      leftAxisMargin,
      xStart,
      xEnd,
      graphDimensions: { graphWidth, graphHeight },
    } = this.state;

    // =================================================================================================================
    // Start Data Update
    // =================================================================================================================

    const dataMax = max(graphData.map(d => d.yData)) || 1;
    const x = scaleTime()
      .domain([xStart, xEnd])
      .range([0, graphWidth]);
    const y = scaleLinear()
      .domain([-1, dataMax])
      .range([graphHeight, 0]);

    // =================================================================================================================
    // Start Render Content
    // =================================================================================================================

    // Axis Settings
    const xAxis = axisBottom(x)
      .ticks(timeSecond, 15)
      .tickFormat(timeFormat('%Mm %Ss'));
    const yMin = y.domain()[0];
    const yMax = dataMax;
    const yAxis = axisRight(y)
      .tickSize(graphWidth)
      .tickValues([yMin, 0, Math.floor((yMax - yMin) / 2), yMax])
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
      .duration(500)
      .ease(easeLinear)
      .attr('transform', `translate(${-2}, 0)`);

    g.select('.yAxis').call(this.redrawYAxis(yAxis, leftAxisMargin));

    g
      .select('#clip rect')
      .attr('width', graphWidth)
      .attr('height', graphHeight);

    // Path Update
    if (graphData && graphData.length > 1) {
      BarChart.redrawLine(
        g.select('.line'),
        this.createLinePathData(x, y, graphData)
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

  static redrawLine(g, linePathData) {
    g
      .attr('transform', null)
      .attr('d', linePathData)
      .transition()
      .duration(500)
      .ease(easeLinear)
      .attr('transform', `translate(${-2}, 0)`);
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
    const { data, margins } = this.props;
    const { left: margin } = margins;
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
      margin,
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

  onEachLoop = () => {
    this.setState(() => ({ ...this.getLiveDomainForX() }));
    this.loop('end');
  };

  // clearChartSkeleton() {
  //   const svg = select(this.node);
  //   svg.selectAll('chartWrapper').remove();
  // }

  static appendChartSkeleton(
    node,
    graphWidth,
    graphHeight,
    margin,
    leftAxisMargin
  ) {
    const svg = select(node);
    const g = svg
      .append('g')
      .attr('class', 'chartWrapper')
      .attr('transform', 'translate(' + margin + ',' + margin + ')');

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

BubbleChart.propTypes = {
  dimension: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired,
  dataWindowSize: PropTypes.number.isRequired,
  dataWindowUnit: PropTypes.string.isRequired,
  margins: PropTypes.object.isRequired,
};

export default BubbleChart;


// var svg = d3.select('svg'),
//   width = +svg.attr('width'),
//   height = +svg.attr('height');
//
// var format = d3.format(',d');
//
// var color = d3.scaleOrdinal(d3.schemeCategory20c);
//
// var pack = d3
//   .pack()
//   .size([width, height])
//   .padding(1.5);
//
// var data = [
//   { id: "main.test.apple", value: 1 },
//   { id: "main.test.boy", value: 4 },
//   { id: "main.cat", value: 3 },
//   { id: "main.dog", value: 1 },
//   { id: "main.elephant", value: 1 },
//   { id: "main.fish", value: 1 },
//   { id: "main.girl", value: 20 },
//   { id: "main.hello", value: 1 },
// ];
//
// function circles(classes) {
//   var root = d3
//     .hierarchy({ children: classes })
//     .sum(function (d) {
//       return d.value;
//     })
//     .each(function (d) {
//       if ((id = d.data.id)) {
//         var id,
//           i = id.lastIndexOf('.');
//         d.id = id;
//         d.package = id.slice(0, i);
//         d.class = id.slice(i + 1);
//       }
//     });
//
//
//   var node = svg
//     .selectAll('.node')
//     .data(pack(root).leaves())
//     .enter()
//     .append('g')
//     .attr('class', 'node')
//     .attr('transform', function (d) {
//       return 'translate(' + d.x + ',' + d.y + ')';
//     });
//
//   node
//     .append('circle')
//     .attr('id', function (d) {
//       return d.id;
//     })
//     .attr('r', function (d) {
//       return d.r;
//     })
//     .style('fill', function (d) {
//       return color(d.package);
//     });
//
//   node
//     .append('clipPath')
//     .attr('id', function (d) {
//       return 'clip-' + d.id;
//     })
//     .append('use')
//     .attr('xlink:href', function (d) {
//       return '#' + d.id;
//     });
//
//   node
//     .append('text')
//     .attr('clip-path', function (d) {
//       return 'url(#clip-' + d.id + ')';
//     })
//     .selectAll('tspan')
//     .data(function (d) {
//       return d.class;
//     })
//     .enter()
//     .append('tspan')
//     .attr('x', 0)
//     .attr('y', function (d, i, nodes) {
//       return 13 + (i - nodes.length / 2 - 0.5) * 10;
//     })
//     .text(function (d) {
//       return d;
//     });
//
//   node.append('title').text(function (d) {
//     return d.id + '\n' + format(d.value);
//   });
// }
//
// circles(data);