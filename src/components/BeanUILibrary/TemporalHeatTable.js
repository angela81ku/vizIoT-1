'use es6';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import hash from 'object-hash';
import _ from 'lodash';

import { select } from 'd3-selection';

import { SPACING } from '../../data/records/Spacing';
import { invertColor } from '../../utility/ColorUtility';

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

const calculateRC = (dimensions, mapDimensionsToRowColValue, rowValues, colValues) => {
  const { rowValue, colValue } = mapDimensionsToRowColValue(dimensions);
  return {
    rowI: rowValues.findIndex(rVal => rVal === rowValue),
    colI: colValues.findIndex(cVal => cVal === colValue)
  };
};

// returns null if no position can be determined.
const calculateXY = (dimensions, mapDimensionsToRowColValue, rowValues, colValues, w, h) => {
  const { rowI, colI } = calculateRC(dimensions, mapDimensionsToRowColValue, rowValues, colValues);
  if (rowI < 0 || colI < 0) {
    return null;
  }
  return { x: colI * w, y: rowI * h };
};

const getGraphDimensions = (width, height, padding) => {
  const { l, r, t, b } = padding;

  const contentWidth = width - l - r;
  const contentHeight = height - t - b;
  return { contentWidth, contentHeight };
};

const feedDataToNode = (node, nodeType, data, attrSetter) => {
  const nodeWithData = node.data(data);
  attrSetter(nodeWithData);

  const newNodes = nodeWithData.enter().append(nodeType);
  attrSetter(newNodes);

  nodeWithData.exit().remove();
};

class TemporalHeatTable extends Component {
  componentDidMount() {
    this.launchChart();
  }

  redrawChart() {
    const {
      dimension: { width, height },
      padding,
      rowValuesGenerator,
      colValuesGenerator,
      renderRowLabel,
      renderColumnLabel,
      mapDimensionsToRowColValue,
      data,
    } = this.props;
    const graphDimensions = getGraphDimensions(width, height, padding);

    const { contentHeight, contentWidth } = graphDimensions;

    const Y_AXIS_WIDTH = 55;
    const X_AXIS_HEIGHT = 45;

    const MAIN_CHART_HEIGHT = contentHeight - X_AXIS_HEIGHT;
    const MAIN_CHART_WIDTH = contentWidth - Y_AXIS_WIDTH;

    const X_CELL_PADDING = 5;

    const rowValues = rowValuesGenerator();
    const ITEMS_IN_COL = rowValues.length;
    const colValues = colValuesGenerator();
    const ITEMS_IN_ROW = colValues.length;

    const CELL_PIXEL_HEIGHT = Math.floor(MAIN_CHART_HEIGHT / ITEMS_IN_COL);
    const CELL_PIXEL_WIDTH = Math.floor(MAIN_CHART_WIDTH / ITEMS_IN_ROW - X_CELL_PADDING);
    const CELL_WIDTH_W_PADDING = CELL_PIXEL_WIDTH + X_CELL_PADDING;

    // =================================================================================================================
    // Start Render Content
    // =================================================================================================================

    const node = this.node;
    const svg = select(node);
    const chartWrapper = svg.select('.chartWrapper');

    let duration = 700;
    let delay = 100;

    // Assume graphData is sorted in oldest to newest order
    const graphData = data.map((rawData, i) => {
      const [dim1, dim2] = rawData.dimensions;
      const xy = calculateXY(
        { rowDimension: dim2, colDimension: dim1 },
        mapDimensionsToRowColValue,
        rowValues, colValues,
        CELL_WIDTH_W_PADDING, CELL_PIXEL_HEIGHT
      );
      if (!xy) {
        return null;
      }
      const { x, y } = xy;
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
    }).filter(x => !!x);

    const getTextX = d => d.textX;
    const getTextY = d => d.textY;
    const getValue = d => d.value;
    const getTextColor = d => d.textColor;
    const getColor = d => d.color;
    const getClass = d => d.class;

    chartWrapper
      .select('.chartBody')
      .attr('transform', `translate(${Y_AXIS_WIDTH}, ${X_AXIS_HEIGHT})`);

    const nodes = chartWrapper
      .select('.dataNodes')
      .selectAll('.nodes')
      .data(graphData, d => hash(d));

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
      .attr('id', d => {
        return 'clip-' + d.id;
      })
      .append('use')
      .attr('xlink:href', d => {
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

    const setLeftAxisAttr = target => {
      // const yOffSet = 15;
      return target
        .attr('text-anchor', 'start')
        .attr('dominant-baseline', 'text-before-edge')
        // .attr('fill', '#FFFFFF')
        .attr('x', 0)
        .attr('y', (d, i) => X_AXIS_HEIGHT + i * CELL_PIXEL_HEIGHT)
        .text(d => renderRowLabel(d));
    };

    const setRightAxisAttr = target => {
      return target
        .attr('text-anchor', 'start')
        .attr('dominant-baseline', 'text-before-edge')
        // .attr('fill', '#FFFFFF')
        .attr('x', (d, i) => Y_AXIS_WIDTH + i * CELL_WIDTH_W_PADDING)
        .attr('y', 0)
        .text(d => renderColumnLabel(d));
    };

    feedDataToNode(
      chartWrapper.select('.leftAxis').selectAll('text'),
      'text',
      rowValues,
      setLeftAxisAttr
    );

    feedDataToNode(
      select('.topAxis').selectAll('text'),
      'text',
      colValues,
      setRightAxisAttr
    );

    feedDataToNode(
      chartWrapper.select('.labels').selectAll('text'),
      'text',
      graphData,
      setTextAttr
    );
  }

  launchChart = () => {
    const { data, padding } = this.props;
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

    chartWrapper.append('g').attr('class', 'chartBody');

    chartWrapper.select('.chartBody').append('g').attr('class', 'dataNodes');

    chartWrapper.select('.chartBody').append('g').attr('class', 'labels');

    const axisWrapper = chartWrapper.append('g').attr('class', 'axis');
    axisWrapper.append('g').attr('class', 'topAxis');
    axisWrapper.append('g').attr('class', 'leftAxis');
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
  dimension: PropTypes.object,
  data: PropTypes.array.isRequired,
  padding: PropTypes.instanceOf(SPACING),

  rowValuesGenerator: PropTypes.func,
  colValuesGenerator: PropTypes.func,
};

TemporalHeatTable.defaultProps = {
  dimension: {
    width: 0,
    height: 0,
  },
  padding: new SPACING(),

  rowValuesGenerator: () => [],
  colValuesGenerator: () => [],
};

export default TemporalHeatTable;
