import React from 'react';
import Grid from '../components/BeanUILibrary/Grid';
import GridItem from '../components/BeanUILibrary/GridItem';
import CardWrapper from '../components/BeanUILibrary/CardWrapper';
import DeviceList from '../components/DeviceList';
import { fetchDevices } from '../actions/deviceActions';
import { analyzeAggregationByTime } from '../actions/analyzeActions';
import DataWindowUnit from '../constants/DataWindowUnit';
import moment from 'moment';
import { connect } from 'react-redux';
import BucketUnitConstants from '../constants/BucketUnitConstants';
import { selectAllDevices } from '../selectors/deviceSelectors';
import DeviceActivityChart from './DeviceActivityChart';

const DATA_REFRESH_DELAY_MS = 5 * 1000;

class OverviewTab extends React.Component {
  componentWillMount() {
    const { singleDeviceChartConfig, networkId } = this.props;
    const { bucketConfig } = singleDeviceChartConfig;

    fetchDevices(networkId).then(() => {
      const { devices } = this.props;
      devices.forEach(({ macAddr }) => {
        const startMS = (
          moment()
            .subtract(5, DataWindowUnit.MINUTES)
            .valueOf() / 1000
        ).toString();
        const endMS = (moment().valueOf() / 1000).toString();
        analyzeAggregationByTime(
          networkId,
          macAddr,
          bucketConfig,
          startMS,
          endMS
        );
      });
    });

    const liveConnectionsPerSecondLoop = setInterval(() => {
      const { devices } = this.props;
      devices.forEach(({ macAddr }) => {
        const startMS = (
          moment()
            .subtract(10, DataWindowUnit.MINUTES)
            .valueOf() / 1000
        ).toString();
        const endMS = (moment().valueOf() / 1000).toString();
        analyzeAggregationByTime(
          networkId,
          macAddr,
          bucketConfig,
          startMS,
          endMS
        );
      });
    }, DATA_REFRESH_DELAY_MS);

    this.setState(() => ({
      liveConnectionsPerSecondLoop,
    }));
  }

  componentWillUnmount() {
    clearInterval(this.state.liveConnectionsPerSecondLoop);
  }

  renderBarChartCards() {
    const { singleDeviceChartConfig, devices } = this.props;

    return devices.map(d => {
      return (
        <GridItem
          key={d.macAddr}
          size={{ xs: 12, md: 12, lg: 4 }}
          space="p-bot-6"
        >
          <DeviceActivityChart
            className="device-chart"
            device={d}
            chartConfig={singleDeviceChartConfig}
          />
        </GridItem>
      );
    });
  }

  renderMainChart() {
    const { devices, mainChartConfig } = this.props;
    const allCombinedIndex = devices.findIndex(i => {
      return i.macAddr === 'ALL_COMBINED';
    });
    return (
      <DeviceActivityChart
        className="main-chart"
        device={devices[allCombinedIndex]}
        chartConfig={mainChartConfig}
      />
    );
  }

  render() {
    const { devices } = this.props;
    return (
      <Grid gutter={3}>
        <GridItem size={{ md: 12, lg: 3 }}>
          <h5 className="wide-letter deviceList__title">DEVICES</h5>
          <CardWrapper noPadding={true} noBackground={true} noShadow={true}>
            <DeviceList devices={devices} />
          </CardWrapper>
        </GridItem>
        <GridItem size={{ md: 12, lg: 9 }}>
          <h5 className="wide-letter deviceList__title">
            ACTIVITY<i className="material-icons">trending_up</i>
          </h5>
          {this.renderMainChart()}
          <Grid gutter={1}>{this.renderBarChartCards()}</Grid>
        </GridItem>
      </Grid>
    );
  }
}

OverviewTab.defaultProps = {
  mainChartConfig: {
    bucketConfig: {
      bucketSize: 1,
      bucketProps: ['ACTIVITY_COUNT'],
      bucketUnit: BucketUnitConstants.SECOND,
    },
    dataWindowSize: 4 * 60,
  },
  singleDeviceChartConfig: {
    bucketConfig: {
      bucketSize: 1,
      bucketProps: ['ACTIVITY_COUNT'],
      bucketUnit: BucketUnitConstants.SECOND,
    },
    dataWindowSize: 60,
  },
  networkId: 42,
};

const mapStateToProps = state => {
  return {
    devices: selectAllDevices(state),
  };
};
export default connect(mapStateToProps)(OverviewTab);
