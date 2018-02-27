import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { scaleOrdinal } from 'd3-scale';
import { schemeCategory20c } from 'd3-scale';
import { select } from 'd3-selection';
import { pack, hierarchy } from 'd3-hierarchy';
import { easeLinear } from 'd3-ease';
import { formatLocale } from 'd3-format';
import moment from 'moment';
import { SPACING } from '../../data/records/Spacing';

const format = formatLocale(',d');
const colorScheme = scaleOrdinal(schemeCategory20c);

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
    this.redrawChart();

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
    const chartWrapper = svg.select('.chartWrapper');

    let duration = 700;
    let delay = 100;

    function circles(classes) {
      if (classes.length === 0) {
        return;
      }

      const root = hierarchy({ children: classes })
        .sum(d => ( d.value ))
        .each(d => {
          let id = d.data.id;
          if (id) {
            let i = id.lastIndexOf('.');
            d.id = id;
            d.package = id.slice(0, i);
            d.class = id.slice(i + 1);
            d.name = `${d.class.split(/(?=[A-Z][^A-Z])/g)}`
          }
        });

      const packer = pack()
        .size([graphWidth, graphHeight])
        .padding(1.5);

      let packedData = packer(root).leaves();
      const node = chartWrapper
        .select('.geo')
        .selectAll('.node')
        .data(packedData, d => d.id);

      // update - This only applies to updating nodes
      node.transition()
        .duration(duration)
        .delay(function(d, i) {delay = i * 7; return delay;})
        .attr('transform', d => { return `translate(${d.x},${d.y})`; });

      // debugger
      let updateCircleSelection = node
        .select('circle');
      updateCircleSelection
        .transition()
        .duration(duration)
        .delay(function(d, i) {delay = i * 7; return delay;})
        .attr('r', d => { return d.r; });

      // ===============================================================================================================
      // Enter
      // ===============================================================================================================
      const newNodes = node.enter()
        .append('g')
        .attr('class', 'node')
        .attr('transform', function(d) {
          return 'translate(' + d.x + ',' + d.y + ')';
        });

      newNodes
        .append('circle')
        .attr('id', d => d.id)
        .attr('r', d => d.r)
        .style('fill', d => colorScheme(d.package))
        .attr('class', d => d.class)
        .style('opacity', 0)
        .transition()
        .duration(duration * 1.2)
        .style('opacity', 1);

      newNodes
        .append('clipPath')
        .attr('id', function(d) {
          return 'clip-' + d.id;
        })
        .append('use')
        .attr('xlink:href', function(d) {
          return '#' + d.id;
        });

      const textNode = chartWrapper
        .select('.labels')
        .selectAll('text')
        .data(packedData)
        .attr('x', d => d.x)
        .attr('y', (d, i, nodes) => {
          return d.y;
          // return 13 + (i - nodes.length / 2 - 0.5) * 10;
        })
        .text(d => d.name);

      textNode.enter()
        .append('text')
        .attr('clip-path', d => `url(#clip-${d.id}')`)
        .attr('text-anchor', 'middle')
        .attr('x', d => d.x)
        .attr('y', (d, i, nodes) => {
          return d.y;
          // return 13 + (i - nodes.length / 2 - 0.5) * 10;
        })
        .text(d => d.name);

      textNode.exit()
        .remove();


      newNodes
        .append('title').text(function(d) {
        return d.id + '\n' + format.format(d.value);
      });

      // exit
      node.exit()
        .transition()
        .duration(duration + delay)
        .style('opacity', 0)
        .remove();
    }
    circles(graphData);
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

    const graphData = data;
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
    this.setState(() => {
      return {
        ...this.getLiveDomainForX()

      }
    });
    this.loop('end');
  };

  // clearChartSkeleton() {
  //   const svg = select(this.node);
  //   svg.selectAll('chartWrapper').remove();
  // }

  static appendChartSkeleton(
    graphData,
    rootNode,
    graphWidth,
    graphHeight,
    padding
  ) {
    const data = graphData;
    const { l: lPadding, t: tPadding, r: rPadding, b: bPadding } = padding;
    const svg = select(rootNode);

    const chartWrapper = svg.append('g')
      .attr('class', 'chartWrapper')
      .attr('transform', `translate(${lPadding}, ${tPadding})`);

    chartWrapper.append('g')
      .attr('class', 'geo');

    chartWrapper.append('g')
      .attr('class', 'labels')
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
  // {id, value}
  data: PropTypes.array.isRequired,
  dataWindowSize: PropTypes.number.isRequired,
  dataWindowUnit: PropTypes.string.isRequired,
  padding: PropTypes.instanceOf(SPACING).isRequired,
};

export default BubbleChart;
