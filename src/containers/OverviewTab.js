'use es6';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Flex, { FlexDirection, JustifyContent } from 'UIBean/Flex';
import FlexSize from 'UIBean/FlexSize';
import BCard from 'UIBean/BCard';
import DeviceList from '../components/DeviceList';
import { fetchDevices } from '../actionsRequest/deviceRequest';
import { pushPacketCountToday } from '../actions/packetActions';
import {
  analyzeAggregationByDevice,
  analyzeAggregationByDomain,
  requestAggregationByTime,
  analyzeAggregationCore,
} from '../actions/analyzeActions';
import moment from 'moment';
import { connect } from 'react-redux';
import {
  selectDeviceList,
  selectEntireNetwork,
  selectLastSeen,
  selectNumberOfConnections,
  selectThreeDevices,
} from '../selectors/deviceSelectors';
import DeviceActivityChart from './ConnectedLineChart';
import {
  selectMainChartConfig,
  selectSingleDeviceChartConfig,
} from '../selectors/chartSelectors';
import { getDataKey } from '../utility/DataKey';
import { hasDataForKey } from '../selectors/aggregateSampleSelector';
import QuickFacts from './QuickFacts';
import SectionTitle from '../components/SectionTitle';
import styled from 'styled-components';
import ActivityFeed from '../components/ActivityFeed';
import { selectDataForAllDevices, selectMostRecentDomains } from '../selectors/analyticsSelector';
import TimedSwitcher from 'UIBean/TimedSwitcher';
import { DateConstants } from '../constants/DateConstants';
import { convertDateTypeToString } from '../utility/TimeUtility';
import { analyzeApiKeys } from '../data/api/analyzeApi';
import ScheduleCard from './ScheduleCard';
import ActivitySidebar from 'VizIoT/components/ActivitySidebar';
import GridItem from 'UIBean/GridItem';
import {
  createSocket,
  SizeRoom,
  TodaySizeRoom,
  AverageVelocitySize10MinRoom, Size1MinRoom, IndividualSizeRoom
} from 'VizIoT/socket/subscribe';
import { H0, H1, H2, H3, H4, H5 } from 'UIBean/functional-css/TypographyStyles';
import { fetchAnalytic } from 'VizIoT/actionsRequest/analyticRequest';
import {
  pushRealtimeIndividualVelocitySizeSample,
  pushRealtimeVelocitySample,
  pushRealtimeVelocitySizeSample, pushSize1Min,
  pushSizeToday
} from 'VizIoT/actions/packetActions';
import {
  deviceToLiveSamples,
  selectRealtimeVelocitySample,
  selectRealtimeVelocitySizeSample,
  selectTodayPacketCount
} from 'VizIoT/selectors/packetSelector';
import ConnectedLineChart from 'VizIoT/containers/ConnectedLineChart';
import DeviceCollection from 'VizIoT/components/device/DeviceCollection';
import SectionSubtitle from 'VizIoT/components/SectionSubtitle';
import { createSelector } from 'reselect';
import { takeTop3Size } from 'VizIoT/data/device/DeviceDataLenses';
import { streamPacketsTodayByDevice } from 'VizIoT/actionsRequest/packetRequest';

const DATA_REFRESH_DELAY_MS = 7 * 1000;
const LOG_REFRESH_DELAY_MS = 3 * 1000;
const DEVICE_HITS_REFRESH_DAY_MS = 15 * 1000;

const GridLayout = styled.div`
  display: grid;
  grid-template-columns: repeat(12, [col-start] 1fr);
  grid-auto-rows: 24rem;
  grid-gap: 2rem;
  grid-row-gap: 7rem;
`;

const WelcomeMessage = styled.div`
  ${H4}
  padding-bottom: 1rem;
  font-weight: 300;
  color: rgba(255, 255, 255, 0.65);
`;

const ContainerTitle = styled(SectionTitle)`
  padding-bottom: 1rem; 
`;

const Title = styled.div`
  ${H2}
  padding-bottom: 3rem;
  font-weight: 200;
`;
const RecentDevicesTitle = styled(Title)`
  padding-top: 5rem;
  padding-bottom: 1rem;
`;
const RecentDevices = styled.div`
  ${H4}
  
`;

const OverviewContainer = styled.div`
  padding: 0 11.8rem;
  padding-top: 80px;
  margin: 0 auto;
`;

const IgnoreContainerPadding = styled.div`
  margin-left: -11.8rem;
  margin-right: -11.8rem;
  width: 100vw;
  padding: 0 11.8rem;
  background-color: #67a8d812;
`;


class OverviewTab extends Component {
  constructor(props) {
    super(props);

    const socket = createSocket();
    this.state = {
      ...this.state,
      socket,
    };

    streamPacketsTodayByDevice(socket);
    socket.on(SizeRoom, pushRealtimeVelocitySizeSample);
    socket.on(TodaySizeRoom, message => pushSizeToday(message.size));
    socket.on(Size1MinRoom, message => pushSize1Min(message.size));
    socket.on(IndividualSizeRoom, pushRealtimeIndividualVelocitySizeSample);
    // socket.on(TodayCountRoom, message => pushPacketCountToday(message.count));
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
    analyzeAggregationCore(
      analyzeApiKeys.TIME_TO_LOG,
      convertDateTypeToString[DateConstants.N_SECONDS_AGO](360),
      convertDateTypeToString[DateConstants.NOW]()
    );
  };

  componentWillMount() {
    const { networkId } = this.props;

    fetchAnalytic();
    fetchDevices();

    const deviceHitsLoop = setInterval(() => {
      fetchAnalytic();
      fetchDevices();

    }, DEVICE_HITS_REFRESH_DAY_MS);

    this.setState(() => ({
      deviceHitsLoop,
    }));


    //   analyzeAggregationByDevice();
    //   analyzeAggregationByDomain();

    // // Fetch all the things.
    // this.fetchAllDeviceGraphs();
    // analyzeAggregationByDevice();
    // analyzeAggregationByDomain();
    // this.fetchTimestampToDomain();
    //
    // // Set up update loops
    // const logLoop = setInterval(() => {
    //   this.fetchTimestampToDomain();
    // }, LOG_REFRESH_DELAY_MS);
  }

  componentWillUnmount() {
    this.state.socket.disconnect();

    const {
      deviceHitsLoop,
    } = this.state;
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
          <FlexSize key={macAddr} size={{ xs: 12 }} space="m-bot-3">
            <BCard>
              <div className="extra-small-spacer" />
              <ConnectedLineChart
                className="device-chart"
                deviceKey={macAddr}
                dataKey={dataKey}
                device={d}
                chartConfig={singleDeviceChartConfig}
              />
            </BCard>
          </FlexSize>
        );
      });

    return listOfGraphs.length ? <Flex gutter={1}>{listOfGraphs}</Flex> : null;
  }

  renderMainChart() {
    const { combinedNetworkDevice, mainChartConfig } = this.props;
    const { bucketConfig, selectionMode } = mainChartConfig;

    return (
      <ConnectedLineChart
        className="main-chart"
        dataSelector={selectRealtimeVelocitySizeSample}
        device={combinedNetworkDevice}
        deviceKey={'COMBINED'}
        dataKey={getDataKey({
          ...bucketConfig.toJS(),
          selectionMode,
          macAddresses: [],
        })}
        chartConfig={mainChartConfig}
        placeholderSubtitle={'BYTES / SEC'}
      />
    );
  }

  render() {
    const { singleDeviceChartConfig } = this.props;
    return (
      <OverviewContainer>
        <ContainerTitle title={'Overview'} size={'lg'} cardPadding={false}/>
        <WelcomeMessage>
          {'Welcome to MON(IOT)R'}
        </WelcomeMessage>
        <div className="medium-spacer" />

        <GridLayout>
          <GridItem column={'col-start / span 5'} row={'1 / 3'}>
            <QuickFacts />
          </GridItem>
          <GridItem column={'col-start 6 / span 7'} row={'1 / 3'}>
            <Flex gutter={2}>
              <FlexSize size={{ lg: 12 }}>
                <Title>Real-time Traffic</Title>
                {this.renderMainChart()}
              </FlexSize>
            </Flex>
          </GridItem>
        </GridLayout>
        <IgnoreContainerPadding>
        <Flex gutter={2} direction={FlexDirection.ROW} fillAll alignItems={JustifyContent.CENTER}>
          <FlexSize size={{ lg: 3 }}>
            <RecentDevicesTitle>Recent Devices</RecentDevicesTitle>
            <RecentDevices>Most activity within the last 30 seconds</RecentDevices>
          </FlexSize>
          <FlexSize size={{ lg: 9 }}>
            <Flex direction={FlexDirection.ROW} fillAll justifyContent={JustifyContent.FLEX_END}>
            <DeviceCollection devices={this.props.devices}
                              deviceToData={this.props.deviceToData}
                              mode={'CARD'}
                              chartConfig={singleDeviceChartConfig}
            />
            </Flex>
          </FlexSize>
        </Flex>
        </IgnoreContainerPadding>
        <div className="xl-spacer" />
      </OverviewContainer>
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
  mostRecentHosts: PropTypes.array.isRequired,
};

const mapStateToProps = state => {
  const singleDeviceChartConfig = selectSingleDeviceChartConfig(state);
  const { bucketConfig, selectionMode } = singleDeviceChartConfig;
  const deviceGraphKey = getDataKey({ ...bucketConfig.toJS(), selectionMode });

  return {
    devices: selectThreeDevices(state),
    deviceToData: deviceToLiveSamples(state),
    mostRecentHosts: selectMostRecentDomains(state, 15),
    devicesToHasData: hasDataForKey(state, deviceGraphKey),
    deviceToNumConnection: selectNumberOfConnections(state),
    lastSeen: selectLastSeen(state),
    combinedNetworkDevice: selectEntireNetwork(state),
    mainChartConfig: selectMainChartConfig(state),
    singleDeviceChartConfig: singleDeviceChartConfig,
    // deviceToData: selectDataForAllDevices(state),
  };
};
export default connect(mapStateToProps)(OverviewTab);
