import React from 'react';
import Grid from '../components/BeanUILibrary/Grid';
import GridItem from '../components/BeanUILibrary/GridItem';
import CardWrapper from '../components/BeanUILibrary/CardWrapper';
import DeviceList from '../components/DeviceList';
import { fetchDevices } from '../actions/deviceActions';
import { analyzeAggregationByTime } from '../actions/analyzeActions';
import moment from 'moment';
import { connect } from 'react-redux';
import {
  selectAllDevices,
  selectEntireNetwork,
} from '../selectors/deviceSelectors';
import DeviceActivityChart from './DeviceActivityChart';
import {
  selectMainChartConfig,
  selectSingleDeviceChartConfig,
} from '../selectors/chartSelectors';
import { getDataKey } from '../utility/DataKey';
import FlexWrapper from '../components/BeanUILibrary/FlexWrapper';

const DATA_REFRESH_DELAY_MS = 5 * 1000;

class OverviewTab extends React.Component {
  fetchCombinedTrafficData() {
    const { mainChartConfig, networkId } = this.props;
    const { bucketConfig, dataWindowSize, selectionMode } = mainChartConfig;
    const startMS = (
      moment()
        .subtract(Math.floor(dataWindowSize * 1.2), bucketConfig.bucketUnit)
        .valueOf() / 1000
    ).toString();
    const endMS = (moment().valueOf() / 1000).toString();
    analyzeAggregationByTime(
      networkId,
      selectionMode,
      [],
      bucketConfig,
      startMS,
      endMS
    );
  }

  fetchSingleDeviceTrafficData(macAddr) {
    const { singleDeviceChartConfig, networkId } = this.props;

    const {
      bucketConfig,
      dataWindowSize,
      selectionMode,
    } = singleDeviceChartConfig;

    const startMS = (
      moment()
        .subtract(dataWindowSize, bucketConfig.bucketUnit)
        .valueOf() / 1000
    ).toString();
    const endMS = (moment().valueOf() / 1000).toString();
    analyzeAggregationByTime(
      networkId,
      selectionMode,
      [macAddr],
      bucketConfig,
      startMS,
      endMS
    );
  }

  componentWillMount() {
    const { networkId } = this.props;

    this.fetchCombinedTrafficData();

    fetchDevices(networkId).then(() => {
      const { devices } = this.props;
      devices.forEach(({ macAddr }) => {
        this.fetchSingleDeviceTrafficData(macAddr);
      });
    });

    const liveConnectionsPerSecondLoop = setInterval(() => {
      this.fetchCombinedTrafficData();
      const { devices } = this.props;
      devices.forEach(({ macAddr }) => {
        this.fetchSingleDeviceTrafficData(macAddr);
      });
    }, DATA_REFRESH_DELAY_MS);

    this.setState(() => ({
      liveConnectionsPerSecondLoop,
    }));
  }

  componentWillUnmount() {
    clearInterval(this.state.liveConnectionsPerSecondLoop);
  }

  renderSingleDeviceCharts() {
    const { singleDeviceChartConfig, devices } = this.props;
    const { bucketConfig, selectionMode } = singleDeviceChartConfig;

    return devices.map(d => {
      return (
        <GridItem
          key={d.macAddr}
          size={{ xs: 12, md: 12, lg: 4 }}
          space="p-bot-6"
        >
          <DeviceActivityChart
            className="device-chart"
            deviceKey={d.macAddr}
            dataKey={getDataKey({ ...bucketConfig, selectionMode })}
            device={d}
            chartConfig={singleDeviceChartConfig}
          />
        </GridItem>
      );
    });
  }

  renderMainChart() {
    const { combinedNetworkDevice, mainChartConfig } = this.props;
    const { bucketConfig, selectionMode } = mainChartConfig;
    return (
      <DeviceActivityChart
        className="main-chart"
        device={combinedNetworkDevice}
        deviceKey={'COMBINED'}
        dataKey={getDataKey({
          ...bucketConfig,
          selectionMode,
          macAddresses: [],
        })}
        chartConfig={mainChartConfig}
        placeholderSubtitle={'Combined activity graph for this network'}
      />
    );
  }

  render() {
    const { devices } = this.props;
    return (
      <div className="overview-tab">
      <Grid gutter={3}>
        <GridItem size={{ md: 12, lg: 3 }}>
          <CardWrapper>
          <h5 className="wide-letter deviceList__title">
            {/*<i className="material-icons m-right-2">access_time</i>*/}
            RECENT DEVICES
          </h5>
          <FlexWrapper>
            <DeviceList devices={devices} />
          </FlexWrapper>
          </CardWrapper>
        </GridItem>
        <GridItem size={{ md: 12, lg: 9 }}>
          <CardWrapper>
          <h5 className="wide-letter deviceList__title">
            {/*<i className="material-icons m-right-2">trending_up</i>*/}
            ACTIVITY
          </h5>
          {this.renderMainChart()}
          <Grid gutter={1}>{this.renderSingleDeviceCharts()}</Grid>
          </CardWrapper>
        </GridItem>
      </Grid>
      </div>
    );
  }
}

OverviewTab.defaultProps = {
  networkId: 42,
};

const mapStateToProps = state => {
  return {
    devices: selectAllDevices(state),
    combinedNetworkDevice: selectEntireNetwork(state),
    mainChartConfig: selectMainChartConfig(state),
    singleDeviceChartConfig: selectSingleDeviceChartConfig(state),
  };
};
export default connect(mapStateToProps)(OverviewTab);
