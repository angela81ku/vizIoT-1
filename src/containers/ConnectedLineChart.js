'use es6';

import React from 'react';
import {connect} from 'react-redux';

import LineChart from '../components/LineChart';
import {transformData} from '../data/processors/TransformGraphData'

export default connect((state, props) => {
  if (props.data) {
    return {
      dataWindowSize: props.chartConfig.dataWindowSize,
      data: transformData(props.data),
      lineColors: props.lineColors,
    };
  } else {
    return {
      dataWindowSize: props.chartConfig.dataWindowSize,
      data: transformData(props.dataSelector(state)),
      lineColors: props.lineColors,
    };
  }
})(LineChart);
