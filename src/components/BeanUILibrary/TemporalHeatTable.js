'use es6';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import hash from 'object-hash';
import _ from 'lodash';

import { select } from 'd3-selection';

import { SPACING } from '../../data/records/Spacing';
import { invertColor } from '../../utility/ColorUtility';

// const ResponseData = Record({
//   header: {
//     dimensions: ['date', 'time of day'],
//     metrics: ['hits'],
//   },
//   rows: [
//     {
//       dimensions: ['March 10, 2017', '12:00pm'],
//       metrics: ['10'],
//     },
//   ]
// });
//
// const TableData = Record({
//   header: {
//     dimensions: ['date', 'time of day'],
//     metrics: ['hits'],
//   },
//   rows: [
//     {
//       dimensions: ['April 30, 2018', '12:00'],
//       metrics: ['10'],
//     },
//     {
//       dimensions: ['April 30, 2018', '12:00'],
//       metrics: ['10'],
//     },
//     {
//       dimensions: ['April 30, 2018', '13:00'],
//       metrics: ['10'],
//     },
//     {
//       dimensions: ['April 30, 2018', '13:00'],
//       metrics: ['10'],
//     },
//   ]
// });

const colors = [
  '#ffffe0',
  '#ffe0a9',
  '#ffbe84',
  '#ff986d',
  '#f47361',
  '#e35056',
  '#ae112a',
  '#8b0000',
];

const determineColor = (value, max) => {
  if (value === null || undefined) {
    return '#FFFFFF00';
  }
  let percent = value / max;
  if (percent > 1) {
    percent = 1;
  }
  return colors[Math.floor(percent * (colors.length - 1))];
};

let CELL_PIXEL_WIDTH = 54;
let CELL_PIXEL_HEIGHT = 15;
let ITEMS_IN_ROW = 8;
let ITEMS_IN_COL = 24;
let X_CELL_PADDING = 5;
let CELL_WIDTH_W_PADDING = CELL_PIXEL_WIDTH + X_CELL_PADDING;

const calculateRC = (i, colHeight) => {
  return { row: i % colHeight, col: Math.floor(i / colHeight) };
};

const calculateXY = (i, colHeight) => {
  const { row, col } = calculateRC(i, colHeight);
  return { x: col * CELL_WIDTH_W_PADDING, y: row * CELL_PIXEL_HEIGHT };
};

class TemporalHeatTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      graphData: [],
      graphDimensions: this.getGraphDimensions(),
    };
  }

  componentDidMount() {
    this.launchChart();
  }

  componentWillReceiveProps(newProps) {
    const graphDimensions = this.getGraphDimensions();
    const { graphHeight, graphWidth } = graphDimensions;
    CELL_PIXEL_HEIGHT = Math.floor(graphHeight / ITEMS_IN_COL);
    CELL_PIXEL_WIDTH = Math.floor(graphWidth / ITEMS_IN_ROW - X_CELL_PADDING);
    CELL_WIDTH_W_PADDING = CELL_PIXEL_WIDTH + X_CELL_PADDING;
    this.setState(() => {
      return {
        graphDimensions: graphDimensions,
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

    // Assume graphData is sorted in oldest to newest order
    const convertedData = graphData.map((rawData, i) => {
      const { x, y } = calculateXY(i, ITEMS_IN_COL);
      const value = rawData.metrics[0];
      const color = determineColor(value, 100);
      return {
        x,
        y,
        textX: x + CELL_PIXEL_WIDTH / 2 + 2,
        textY: y + CELL_PIXEL_HEIGHT / 2 + 3,
        color,
        textColor: invertColor(color, true),
        value,
      };
    });

    const getTextX = d => d.textX;
    const getTextY = d => d.textY;
    const getValue = d => d.value;
    const getTextColor = d => d.textColor;
    const getColor = d => d.color;
    const getClass = d => d.class;

    const nodes = chartWrapper
      .select('.geo')
      .selectAll('.nodes')
      .data(convertedData, d => hash(d));

    // const numLevels = 12;
    // const colorsRgb = colorScheme.rgb(numLevels);
    // const valueToColor = d => {
    //   const thisLevel = Math.floor(
    //     d.data.value / (max * 1.0) * (numLevels - 1)
    //   );
    //   return 'url(#Gradient1)';
    //   // return colorsRgb[thisLevel].toHexString();
    // };

    // exit
    nodes
      .exit()
      .transition()
      .duration(duration + delay)
      .style('opacity', 0)
      .remove();

    // update - This only applies to updating nodes

    // This updates nodes
    nodes
      .transition()
      .duration(duration)
      .delay((d, i) => {
        delay = i * 7;
        return delay;
      })
      .attr('transform', d => {
        const { x, y } = d;
        return `translate(${x},${y})`;
      });

    const enterDuration = duration * 1.2;

    // This updates circles in the nodes
    let updateCircleSelection = nodes.select('rect');
    updateCircleSelection
      .transition()
      .duration(duration)
      .delay(function(d, i) {
        delay = enterDuration + i * 7;
        return delay;
      })
      .attr('width', CELL_PIXEL_WIDTH)
      .attr('height', CELL_PIXEL_HEIGHT)
      .style('fill', d => d.color);
    // .attr('transform', d => {
    //   return `translate(${d.x},${d.y})`;
    // })

    // ===============================================================================================================
    // Enter
    // ===============================================================================================================
    const newNodes = nodes
      .enter()
      .append('g')
      .attr('class', 'nodes')
      .attr('transform', d => {
        const { x, y } = d;
        return `translate(${x}, ${y})`;
      });

    const applyFadeInTransition = (duration, target) => {
      return target
        .style('fill-opacity', 0)
        .transition()
        .duration(enterDuration)
        .style('fill-opacity', 1);
    };

    const applyCellAttr = target => {
      return target
        .attr('id', d => d.id)
        .attr('width', CELL_PIXEL_WIDTH)
        .attr('height', CELL_PIXEL_HEIGHT)
        .style('fill', getColor)
        .attr('class', getClass);
    };

    const applyInOrder = (target, functions) => {
      let result = target;
      functions.forEach(func => {
        result = func(result);
      });
    };

    const appendedShapes = newNodes.append('rect');
    applyInOrder(appendedShapes, [
      _.partial(applyFadeInTransition, enterDuration),
      applyCellAttr,
    ]);

    newNodes
      .append('clipPath')
      .attr('id', function(d) {
        return 'clip-' + d.id;
      })
      .append('use')
      .attr('xlink:href', function(d) {
        return '#' + d.id;
      });

    const setTextAttr = target => {
      return target
        .attr('clip-path', d => `url(#clip-${d.id}')`)
        .attr('text-anchor', 'middle')
        .attr('fill', getTextColor)
        .attr('x', getTextX)
        .attr('y', getTextY)
        .text(getValue);
    };

    const textNode = chartWrapper
      .select('.labels')
      .selectAll('text')
      .data(convertedData);
    setTextAttr(textNode);

    const enterText = textNode.enter().append('text');
    setTextAttr(enterText);

    textNode.exit().remove();
  }

  launchChart = () => {
    const { data, padding } = this.props;
    const { leftAxisMargin, graphDimensions } = this.state;
    const { graphWidth, graphHeight } = graphDimensions;

    const graphData = data;
    this.setState(() => {
      return { graphData };
    });

    TemporalHeatTable.appendChartSkeleton(this.node, padding);
    this.redrawChart();
  };

  static appendChartSkeleton(rootNode, padding) {
    const { l: lPadding, t: tPadding, r: rPadding, b: bPadding } = padding;
    const svg = select(rootNode);

    const chartWrapper = svg
      .append('g')
      .attr('class', 'chartWrapper')
      .attr('transform', `translate(${lPadding}, ${tPadding})`);

    chartWrapper.append('g').attr('class', 'geo');

    chartWrapper.append('g').attr('class', 'labels');
  }

  render() {
    const { dimension: { width, height } } = this.props;
    this.redrawChart();
    return (
      <div>
        <svg
          style={{ fontSize: '10px' }}
          className="temporal-heat-table"
          ref={node => (this.node = node)}
          viewBox={`0 0 ${width} ${height}`}
          textAnchor="middle"
        >
          <defs>
            <linearGradient id="Gradient1" x1="0%" y1="8%" x2="100%" y2="92%">
              <stop className="stop1" offset="0%" />
              <stop className="stop3" offset="100%" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    );
  }
}

TemporalHeatTable.propTypes = {
  dimension: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired,
  padding: PropTypes.instanceOf(SPACING).isRequired,
};

export default TemporalHeatTable;
