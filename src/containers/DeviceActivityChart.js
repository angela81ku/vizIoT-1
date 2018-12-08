'use es6';

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getBucketKeyWithConfig } from '../utility/BucketUtility';
import { selectSingleAggregation } from '../selectors/aggregateSampleSelector';
import moment from 'moment';
import BarGraphCard from '../components/BarGraphCard';

class DeviceActivityChart extends React.Component {
  render() {
    const {
      device,
      chartConfig: {
        dataWindowSize,
        bucketConfig: { bucketProps },
      },
      data,
      placeholderSubtitle,
    } = this.props;

    const { socketAddr = '', macAddr = '', port = '', ip = '', alias } = device;
    // console.log(`Rendering chart for ${socketAddr} AKA ${macAddr} AKA ${alias}`);
    // console.log('using data:');
    // console.log(data);

    macAddr && macAddr.toUpperCase();

    let graphData = [];
    if (data && data.length) {
      const catchUpSeconds = 10;
      graphData = data.map(({ startMS, count: yData }) => {
        return {
          xData: moment
            .unix(startMS / 1000.0)
            .add(catchUpSeconds, 'seconds')
            .toDate(),
          yData,
        };
      });
    }

    let subtitle = <span>{placeholderSubtitle}</span>;
    if (ip && port) {
      subtitle = (
        <span>
          <strong>{ip}</strong>
          {`:${port}`}
        </span>
      );
    } else if (macAddr) {
      subtitle = (
        <span>
          <strong>{macAddr}</strong>
        </span>
      );
    }

    if (graphData.length >= 1) {
      return (
        <BarGraphCard
          className={this.props.className}
          dataWindowSize={dataWindowSize}
          subtitle={subtitle}
          title={alias || macAddr}
          data={graphData}
        />
      );
    } else {
      return null;
    }
  }
}

DeviceActivityChart.defaultProps = {
  graphData: [],
};

DeviceActivityChart.propTypes = {
  graphData: PropTypes.array,
};

export default connect((state, props) => {
  return {

  };
})(DeviceActivityChart);
