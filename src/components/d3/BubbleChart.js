import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { scaleLinear, scaleTime, scaleOrdinal } from 'd3-scale';
import { schemeCategory20c } from 'd3-scale';
import { select } from 'd3-selection';
import { pack, hierarchy } from 'd3-hierarchy';
import { easeLinear } from 'd3-ease';
import { formatLocale } from 'd3-format';
import moment from 'moment';
import { SPACING } from '../../data/records/Spacing';

class BubbleChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
    const { padding, dimension: { width, height } } = this.props;
    const { l, r, t, b } = padding;

    const graphWidth = width - l - r;
    const graphHeight = height - t - b;
    return { graphWidth, graphHeight };
  }

  redrawChart() {
    const {
      graphData,
      graphDimensions: { graphWidth, graphHeight },
    } = this.state;

    // =================================================================================================================
    // Start Render Content
    // =================================================================================================================

    const node = this.node;
    const svg = select(node);
    const g = svg.select('g');
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

  launchChart = () => {
    const { data, padding } = this.props;
    const { leftAxisMargin, graphDimensions } = this.state;
    const { graphWidth, graphHeight } = graphDimensions;

    const graphData = data; // makeDummyGraphData(nowMoment);
    this.setState(() => {
      return { graphData };
    });

    BubbleChart.appendChartSkeleton(
      graphData,
      this.node,
      graphWidth,
      graphHeight,
      padding,
      leftAxisMargin
    );
    this.redrawChart();
    // this.loop('start');
  };

  // loop(whenToActivate) {
  //   select(this.node)
  //     .transition()
  //     .duration(500)
  //     .ease(easeLinear)
  //     .on(whenToActivate, this.onEachLoop);
  // }

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
    graphData,
    node,
    graphWidth,
    graphHeight,
    padding
  ) {
    const data = graphData;
    const { l: lPadding, t: tPadding, r: rPadding, b: bPadding } = padding;
    const svg = select(node),
      width = graphWidth - lPadding - rPadding,
      height = graphHeight - tPadding - bPadding;

    const chartWrapper = svg
      .append('g')
      .attr('class', 'chartWrapper')
      .attr('transform', `translate(${lPadding}, ${tPadding})`);

    const format = formatLocale(',d');
    const color = scaleOrdinal(schemeCategory20c);
    const packer = pack()
      .size([width, height])
      .padding(1.5);

    function circles(classes) {
      const root = hierarchy({ children: classes })
        .sum(function(d) {
          return d.value;
        })
        .each(function(d) {
          if ((id = d.data.id)) {
            var id,
              i = id.lastIndexOf('.');
            d.id = id;
            d.package = id.slice(0, i);
            d.class = id.slice(i + 1);
          }
        });

      const node = chartWrapper
        .selectAll('.node')
        .data(packer(root).leaves())
        .enter()
        .append('g')
        .attr('class', 'node')
        .attr('transform', function(d) {
          return 'translate(' + d.x + ',' + d.y + ')';
        });

      node
        .append('circle')
        .attr('id', function(d) {
          return d.id;
        })
        .attr('r', function(d) {
          return d.r;
        })
        .style('fill', function(d) {
          return color(d.package);
        });

      node
        .append('clipPath')
        .attr('id', function(d) {
          return 'clip-' + d.id;
        })
        .append('use')
        .attr('xlink:href', function(d) {
          return '#' + d.id;
        });

      node
        .append('text')
        .attr('clip-path', function(d) {
          return 'url(#clip-' + d.id + ')';
        })
        .selectAll('tspan')
        .data(function(d) {
          return d.class.split(/(?=[A-Z][^A-Z])/g);
        })
        .enter()
        .append('tspan')
        .attr('x', 0)
        .attr('y', function(d, i, nodes) {
          return 13 + (i - nodes.length / 2 - 0.5) * 10;
        })
        .text(function(d) {
          return d;
        });

      node.append('title').text(function(d) {
        return d.id + '\n' + format.format(d.value);
      });
    }

    circles(data);
  }

  render() {
    const { dimension: { width, height } } = this.props;
    this.redrawChart();
    return (
      <div>
        <svg
          ref={node => (this.node = node)}
          width={width}
          height={height}
          textAnchor="middle"
        />
      </div>
    );
  }
}

BubbleChart.propTypes = {
  dimension: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired,
  dataWindowSize: PropTypes.number.isRequired,
  dataWindowUnit: PropTypes.string.isRequired,
  padding: PropTypes.instanceOf(SPACING).isRequired,
};

export default BubbleChart;
