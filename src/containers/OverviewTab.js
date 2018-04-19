'use es6';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Grid from '../components/BeanUILibrary/Grid';
import GridItem from '../components/BeanUILibrary/GridItem';
import CardWrapper from '../components/BeanUILibrary/CardWrapper';
import DeviceList from '../components/DeviceList';
import { fetchDevices } from '../actions/deviceActions';
import {
  analyzeAggregationByDevice,
  analyzeAggregationByDomain,
  requestAggregationByTime,
  analyzeAggregationByTimeToDomain,
} from '../actions/analyzeActions';
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
import styled from 'styled-components';
import HostList from '../components/ActivityFeed';
import { selectMostRecentDomains } from '../selectors/analyticsSelector';
import TimedSwitcher from '../components/BeanUILibrary/TimedSwitcher';
import { DateConstants } from '../constants/DateConstants';
import { convertDateTypeToString } from '../utility/TimeUtility';

const DATA_REFRESH_DELAY_MS = 7 * 1000;
const LOG_REFRESH_DELAY_MS = 3 * 1000;
const DEVICE_HITS_REFRESH_DAY_MS = 15 * 1000;
const FixedSidebarWrapper = styled.section`
  position: fixed;
  left: 0;
  top: 0;
  width: 350px;
  height: 100vh;
  overflow-y: scroll;

  @media (max-width: 1200px) {
    display: none;
  }
`;

const FullHeightCardWrapper = styled(CardWrapper)`
  height: 100%;
  background: rgba(8, 22, 39, 0.4) !important;
`;

const RightContentWrapper = styled.section`
  @media (min-width: 1200px) {
    margin-left: 350px;
  }
`;

class OverviewTab extends Component {
  fetchCombinedTrafficData() {
    const { mainChartConfig, networkId } = this.props;
    const { bucketConfig, dataWindowSize, selectionMode } = mainChartConfig;
    const startMS = (
      moment()
        .subtract(Math.floor(dataWindowSize * 1.2), bucketConfig.bucketUnit)
        .valueOf() / 1000
    ).toString();
    const endMS = (moment().valueOf() / 1000).toString();
    requestAggregationByTime(
      networkId,
      selectionMode,
      [],
      bucketConfig,
      startMS,
      endMS
    );
  }

  fetchAllDeviceGraphs() {
    const { devices } = this.props;
    const { singleDeviceChartConfig, networkId } = this.props;

    const deviceIdList = devices.map(({ macAddr }) => macAddr);

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
    requestAggregationByTime(
      networkId,
      selectionMode,
      deviceIdList,
      bucketConfig,
      startMS,
      endMS
    );
  }

  fetchTimestampToDomain = () => {
    analyzeAggregationByTimeToDomain(
      convertDateTypeToString[DateConstants.N_SECONDS_AGO](360),
      convertDateTypeToString[DateConstants.NOW]()
    );
  };

  componentWillMount() {
    const { networkId } = this.props;

    this.fetchCombinedTrafficData();

    // Fetch all the things.
    fetchDevices(networkId);
    this.fetchAllDeviceGraphs();
    analyzeAggregationByDevice();
    analyzeAggregationByDomain();
    this.fetchTimestampToDomain();

    // Set up update loops
    const logLoop = setInterval(() => {
      this.fetchTimestampToDomain();
    }, LOG_REFRESH_DELAY_MS);

    const liveConnectionsPerSecondLoop = setInterval(() => {
      this.fetchCombinedTrafficData();
      this.fetchAllDeviceGraphs();
    }, DATA_REFRESH_DELAY_MS);

    const deviceHitsLoop = setInterval(() => {
      analyzeAggregationByDevice();
      analyzeAggregationByDomain();
    }, DEVICE_HITS_REFRESH_DAY_MS);

    this.setState(() => ({
      logLoop,
      liveConnectionsPerSecondLoop,
      deviceHitsLoop,
    }));
  }

  componentWillUnmount() {
    const {
      logLoop,
      liveConnectionsPerSecondLoop,
      deviceHitsLoop,
    } = this.state;
    clearInterval(logLoop);
    clearInterval(liveConnectionsPerSecondLoop);
    clearInterval(deviceHitsLoop);
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
          <GridItem key={macAddr} size={{ xs: 12 }} space="m-bot-3">
            <CardWrapper>
              <div className="extra-small-spacer" />
              <DeviceActivityChart
                className="device-chart"
                deviceKey={macAddr}
                dataKey={dataKey}
                device={d}
                chartConfig={singleDeviceChartConfig}
              />
            </CardWrapper>
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

  handleSidebarSwitch = newIndex => {
    console.log(newIndex);
  };

  render() {
    const {
      devices,
      deviceToNumConnection,
      lastSeen,
      mostRecentHosts,
    } = this.props;

    const deviceList = (
      <div>
        <SectionTitle title="TODAY'S DEVICES" />
        <DeviceList
          devices={devices}
          deviceToNumConnection={deviceToNumConnection}
          lastSeen={lastSeen}
        />
      </div>
    );

    const hostList = (
      <div>
        <SectionTitle title="LATEST ACTIVITY" />
        <HostList hosts={mostRecentHosts} />
      </div>
    );

    return (
      <div className="overview-tab">
        <div className="tint-background2">
          <div />
        </div>

        <FixedSidebarWrapper>
          <FullHeightCardWrapper noShadow={true} noPadding={false}>
            <FlexWrapper>
              <TimedSwitcher
                options={[
                  { value: hostList, delay: 3500000 },
                  { value: deviceList, delay: 7000 },
                ]}
                onSwitch={this.handleSidebarSwitch}
              />
            </FlexWrapper>
          </FullHeightCardWrapper>
        </FixedSidebarWrapper>

        <RightContentWrapper>
          <QuickFacts />
          <Grid gutter={2}>
            <GridItem size={{ lg: 7 }}>
              <CardWrapper>
                <SectionTitle title="LIVE TRAFFIC (CONNS/SEC)" />
                {this.renderMainChart()}
              </CardWrapper>
            </GridItem>
            <GridItem size={{ lg: 5 }}>
              {this.renderSingleDeviceCharts()}
            </GridItem>
          </Grid>
        </RightContentWrapper>
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
    mostRecentHosts: selectMostRecentDomains(state, 15),
    devicesToHasData: hasDataForKey(state, deviceGraphKey),
    deviceToNumConnection: selectNumberOfConnections(state),
    lastSeen: selectLastSeen(state),
    combinedNetworkDevice: selectEntireNetwork(state),
    mainChartConfig: selectMainChartConfig(state),
    singleDeviceChartConfig: singleDeviceChartConfig,
  };
};
export default connect(mapStateToProps)(OverviewTab);
