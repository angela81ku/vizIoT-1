import React from 'react';
import { connect } from 'react-redux';
import { getBucketKeyWithConfig } from '../utility/BucketUtility';
import { selectSingleAggregation } from '../selectors/aggregateSampleSelector';
import moment from 'moment';
import BarGraphCard from '../components/BarGraphCard';

class DeviceActivityChart extends React.Component {
  constructor(props) {
    super(props);
  }

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
    console.log(`Making chart for ${socketAddr} AKA ${macAddr} AKA ${alias}`);
    console.log('using data:');
    console.log(data);

    macAddr && macAddr.toUpperCase();

    let graphData = [];
    if (data && data.length) {
      // Temporary Code for replaying old data:
      // const momentNow = moment();
      // const momentFirst = moment.unix(data[0].timestamp);
      // const catchUpSeconds = momentNow.diff(momentFirst, 'seconds');
      // console.log(`catchUpSeconds = ${catchUpSeconds}`);

      const catchUpSeconds = 10;
      console.log(`catchUpSeconds = ${catchUpSeconds}`);

      graphData = data.map(({ timestamp, [bucketProps[0]]: yData }) => {
        return {
          xData: moment
            .unix(timestamp)
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

export default connect((state, props) => {
  const { deviceKey, dataKey } = props;
  return {
    data: selectSingleAggregation(state, deviceKey, dataKey),
  };
})(DeviceActivityChart);
