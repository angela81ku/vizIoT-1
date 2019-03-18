'use es6';

import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import Flex, { FlexDirection, JustifyContent } from 'UIBean/Flex';
import FlexSize from 'UIBean/FlexSize';
import BCard from 'UIBean/BCard';
import DeviceList from '../components/DeviceList';
import { fetchDevices } from '../actionsRequest/deviceRequest';
import { pushIndividualSizeToday, pushPacketCountToday } from '../actions/packetActions';
import {
  analyzeAggregationByDevice,
  analyzeAggregationByDomain,
  requestAggregationByTime,
  analyzeAggregationCore,
} from '../actions/analyzeActions';
import moment from 'moment';
import { connect } from 'react-redux';
import {
  selectEntireNetwork,
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
  AverageVelocitySize10MinRoom, Size1MinRoom, IndividualSizeRoom, ByDeviceSizeRoomToday
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
import { useSocket } from 'UIBean/hooks/useSocket';
import { useTimedFetcher } from 'UIBean/hooks/useTimedFetcher';

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

// fetchAllDeviceGraphs() {
//   const { devices } = this.props;
//   const { singleDeviceChartConfig, networkId } = this.props;
//
//   const deviceIdList = devices.map(({ macAddr }) => macAddr);
//
//   const {
//     bucketConfig,
//     dataWindowSize,
//     selectionMode,
//   } = singleDeviceChartConfig;
//
//   const startMS = (
//     moment()
//       .subtract(Math.floor(dataWindowSize * 1.2), bucketConfig.bucketUnit)
//       .valueOf() / 1000
//   ).toString();
//   const endMS = (moment().valueOf() / 1000).toString();
//   requestAggregationByTime(
//     networkId,
//     selectionMode,
//     deviceIdList,
//     bucketConfig,
//     startMS,
//     endMS
//   );
// }

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

// fetchTimestampToDomain = () => {
//   analyzeAggregationCore(
//     analyzeApiKeys.TIME_TO_LOG,
//     convertDateTypeToString[DateConstants.N_SECONDS_AGO](360),
//     convertDateTypeToString[DateConstants.NOW]()
//   );
// };

const ConnectedDeviceCollection = connect(state => ({
  devices: selectThreeDevices(state),
  deviceToData: deviceToLiveSamples(state),
  chartConfig: selectSingleDeviceChartConfig(state),
}))(DeviceCollection);

// fetching: do in the containers
// connection: as deep as i can.

const OverviewTab = ({ combinedNetworkDevice, mainChartConfig }) => {
  useSocket(SizeRoom, pushRealtimeVelocitySizeSample);
  useSocket(TodaySizeRoom, message => pushSizeToday(message.size));
  useSocket(Size1MinRoom, message => pushSize1Min(message.size));
  useSocket(IndividualSizeRoom, pushRealtimeIndividualVelocitySizeSample);
  useSocket(ByDeviceSizeRoomToday, pushIndividualSizeToday);

  useTimedFetcher(fetchAnalytic, DEVICE_HITS_REFRESH_DAY_MS);
  useTimedFetcher(fetchDevices, DEVICE_HITS_REFRESH_DAY_MS);

  const renderMainChart = () => {
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
  };

  return (
    <OverviewContainer>
      <ContainerTitle title="Overview" size="lg" cardPadding={false}/>
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
              {renderMainChart()}
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
          <ConnectedDeviceCollection mode={'CARD'} />
          </Flex>
        </FlexSize>
      </Flex>
      </IgnoreContainerPadding>
      <div className="xl-spacer" />
    </OverviewContainer>
  );
};

OverviewTab.defaultProps = {
  networkId: 42,
};

OverviewTab.propTypes = {
  combinedNetworkDevice: PropTypes.object.isRequired,
  mainChartConfig: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  const singleDeviceChartConfig = selectSingleDeviceChartConfig(state);
  const { bucketConfig, selectionMode } = singleDeviceChartConfig;
  const deviceGraphKey = getDataKey({ ...bucketConfig.toJS(), selectionMode });

  return {
    combinedNetworkDevice: selectEntireNetwork(state),
    mainChartConfig: selectMainChartConfig(state),
  };
};

export default connect(mapStateToProps)(OverviewTab);
