import React from 'react';
import PropTypes from 'prop-types';
import Grid from '../components/BeanUILibrary/Grid';
import GridItem from '../components/BeanUILibrary/GridItem';
import CardWrapper from '../components/BeanUILibrary/CardWrapper';
import DeviceList from '../components/DeviceList';
import { fetchDevices } from '../actions/deviceActions';
import { analyzeAggregationByTime } from '../actions/analyzeActions';
import moment from 'moment';
import { connect } from 'react-redux';
import {
  selectDeviceList,
  selectEntireNetwork,
  selectLastSeen,
  selectNumberOfConnections,
} from '../selectors/deviceSelectors';
import DeviceActivityChart from './DeviceActivityChart';
import {
  selectMainChartConfig,
  selectSingleDeviceChartConfig,
} from '../selectors/chartSelectors';
import { getDataKey } from '../utility/DataKey';
import FlexWrapper from '../components/BeanUILibrary/FlexWrapper';
import { hasDataForKey } from '../selectors/aggregateSampleSelector';
import QuickFacts from './QuickFacts';
import SectionTitle from '../components/SectionTitle';

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

  fetchDeviceConnectionCount() {
    const { networkId } = this.props;
    analyzeAggregationByDevice(networkId);
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
        .subtract(Math.floor(dataWindowSize * 1.2), bucketConfig.bucketUnit)
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
      this.fetchDeviceConnectionCount();
    }, DATA_REFRESH_DELAY_MS);

    this.setState(() => ({
      liveConnectionsPerSecondLoop,
    }));
  }

  componentWillUnmount() {
    clearInterval(this.state.liveConnectionsPerSecondLoop);
  }

  renderSingleDeviceCharts() {
    const { singleDeviceChartConfig, devices, devicesToHasData } = this.props;
    const { bucketConfig, selectionMode } = singleDeviceChartConfig;

    const listOfGraphs = devices
      .filter(d => {
        return devicesToHasData[d.macAddr];
      })
      .map(d => {
        const { macAddr } = d;
        const dataKey = getDataKey({ ...bucketConfig.toJS(), selectionMode });

        return (
          <GridItem
            key={macAddr}
            size={{ xs: 12, md: 12, lg: 4 }}
            space="p-bot-6"
          >
            <DeviceActivityChart
              className="device-chart"
              deviceKey={macAddr}
              dataKey={dataKey}
              device={d}
              chartConfig={singleDeviceChartConfig}
            />
          </GridItem>
        );
      });

    return listOfGraphs.length ? <Grid gutter={1}>{listOfGraphs}</Grid> : null;
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
          ...bucketConfig.toJS(),
          selectionMode,
          macAddresses: [],
        })}
        chartConfig={mainChartConfig}
        placeholderSubtitle={'Combined activity graph for this network'}
      />
    );
  }

  render() {
    const { devices, deviceToNumConnection, lastSeen } = this.props;

    return (
      <div className="overview-tab">
        <div className="tint-background2">
          <div />
        </div>
        <QuickFacts />
        <div className="small-spacer" />
        <Grid gutter={3}>
          <GridItem size={{ md: 12, lg: 3 }}>
            <CardWrapper noShadow={true}>
              <SectionTitle title="RECENT DEVICES" />
              <FlexWrapper>
                <DeviceList
                  devices={devices}
                  deviceToNumConnection={deviceToNumConnection}
                  lastSeen={lastSeen}
                />
              </FlexWrapper>
            </CardWrapper>
          </GridItem>
          <GridItem size={{ md: 12, lg: 9 }}>
            <CardWrapper>
              <SectionTitle title="ACTIVITY" />
              {this.renderMainChart()}
            </CardWrapper>
            <div className="small-spacer" />
            <CardWrapper>{this.renderSingleDeviceCharts()}</CardWrapper>
          </GridItem>
        </Grid>
      </div>
    );
  }
}

OverviewTab.defaultProps = {
  networkId: 42,
};

OverviewTab.propTypes = {
  devices: PropTypes.array.isRequired,
  devicesToHasData: PropTypes.object.isRequired,
  deviceToNumConnection: PropTypes.object.isRequired,
  lastSeen: PropTypes.object.isRequired,
  combinedNetworkDevice: PropTypes.object.isRequired,
  mainChartConfig: PropTypes.object.isRequired,
  singleDeviceChartConfig: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  const singleDeviceChartConfig = selectSingleDeviceChartConfig(state);
  const { bucketConfig, selectionMode } = singleDeviceChartConfig;
  const deviceGraphKey = getDataKey({ ...bucketConfig.toJS(), selectionMode });

  return {
    devices: selectDeviceList(state),
    devicesToHasData: hasDataForKey(state, deviceGraphKey),
    deviceToNumConnection: selectNumberOfConnections(state),
    lastSeen: selectLastSeen(state),
    combinedNetworkDevice: selectEntireNetwork(state),
    mainChartConfig: selectMainChartConfig(state),
    singleDeviceChartConfig: singleDeviceChartConfig,
  };
};
export default connect(mapStateToProps)(OverviewTab);
