'use es6';

import React from 'react';
import PropTypes from 'prop-types';
import Flex, { FlexDirection, JustifyContent } from '../components/BeanUILibrary/Flex';
import FlexSize from '../components/BeanUILibrary/FlexSize';
import { fetchDevices } from '../actionsRequest/deviceRequest';
import { pushIndividualSizeToday } from '../actions/packetActions';
import {
    analyzeAggregationByDevice,
    analyzeAggregationByDomain,
    requestAggregationByTime,
    analyzeAggregationCore,
} from '../actions/analyzeActions';
import { connect } from 'react-redux';
import {
    selectEntireNetwork,
    selectThreeDevices,
} from '../selectors/deviceSelectors';
import {
    selectInOutChartConfig,
    selectMainChartConfig,
    selectSingleDeviceChartConfig,
} from '../selectors/chartSelectors';
import { getDataKey } from '../utility/DataKey';
import { hasDataForKey } from '../selectors/aggregateSampleSelector';
import QuickFacts from './QuickFacts';
import styled from 'styled-components';
import ActivityFeed from '../components/ActivityFeed';
import { DateConstants } from '../constants/DateConstants';
import { convertDateTypeToString } from '../utility/TimeUtility';
import { analyzeApiKeys } from '../data/api/analyzeApi';
import ActivitySidebar from 'VizIoT/components/ActivitySidebar';
import GridItem from '../components/BeanUILibrary/GridItem';
import {
    SizeRoom,
    TodaySizeRoom,
    Size1MinRoom,
    IndividualSizeRoom,
    ByDeviceSizeRoomToday
} from '../socket/subscribe';
import { H2, H4, } from '../components/BeanUILibrary/functional-css/TypographyStyles';
import { fetchAnalytic } from 'VizIoT/actionsRequest/analyticRequest';
import {
    pushRealtimeIndividualVelocitySizeSample,
    pushRealtimeVelocitySizeSample, pushSize1Min,
    pushSizeToday
} from '../actions/packetActions';
import {
    selectDeviceToLiveSamples,
    selectRealtimeVelocitySizeSample,
} from '../selectors/packetSelector';
import ConnectedLineChart from '../containers/ConnectedLineChart';
import DeviceCollection from '../components/device/DeviceCollection';

import { useSocket } from '../components/BeanUILibrary/hooks/useSocket';
import { useTimedFetcher } from '../components/BeanUILibrary/hooks/useTimedFetcher';

// my imports
import SectionSubtitle from '../components/SectionSubtitle';
import SectionTitle from '../components/SectionTitle';
import InOutFacts from './InOutFacts';

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

const ConnectedDeviceCollection = connect(state => ({
    devices: selectThreeDevices(state),
    deviceToData: selectDeviceToLiveSamples(state),
    chartConfig: selectSingleDeviceChartConfig(state),
}))(DeviceCollection);

// fetching: do in the containers
// connection: as deep as i can.

const InOutTab = ({ combinedNetworkDevice, inoutChartConfig }) => {
    useSocket(SizeRoom, pushRealtimeVelocitySizeSample);
    useSocket(TodaySizeRoom, message => pushSizeToday(message.size));
    useSocket(Size1MinRoom, message => pushSize1Min(message.size));
    useSocket(IndividualSizeRoom, pushRealtimeIndividualVelocitySizeSample);
    useSocket(ByDeviceSizeRoomToday, pushIndividualSizeToday);

    // useTimedFetcher(fetchAnalytic, DEVICE_HITS_REFRESH_DAY_MS);
    useTimedFetcher(fetchDevices, DEVICE_HITS_REFRESH_DAY_MS);

    const renderMainChart = () => {
        const { bucketConfig, selectionMode } = inoutChartConfig;

        return (
            <ConnectedLineChart
                className="main-chart"
                title={'Network'}
                subtitle={'BYTES / SEC'}
                dataSelector={selectRealtimeVelocitySizeSample}
                device={combinedNetworkDevice}
                deviceKey={'COMBINED'}
                dataKey={getDataKey({
                    ...bucketConfig.toJS(),
                    selectionMode,
                    macAddresses: [],
                })}
                chartConfig={inoutChartConfig}
            />
        );
    };

    return (
        <OverviewContainer>
            <SectionTitle title="In/Out Traffic" size="lg" cardPadding={false}/>
            <SectionSubtitle text="View network in/out traffic in real time" margins={true}/>
            <div className="medium-spacer" />

            <GridLayout>
                <GridItem column={'col-start / span 5'} row={'1 / 3'}>
                    <InOutFacts />
                </GridItem>
                <GridItem column={'col-start 6 / span 7'} row={'1 / 3'}>
                    <Flex gutter={2}>
                        <FlexSize size={{ lg: 12 }}>
                            <Title>Network Traffic</Title>
                            {renderMainChart()}
                        </FlexSize>
                    </Flex>
                </GridItem>
            </GridLayout>
            <div className="xl-spacer" />
        </OverviewContainer>
    );
};

InOutTab.defaultProps = {
    networkId: 42,
};

InOutTab.propTypes = {
    combinedNetworkDevice: PropTypes.object.isRequired,
    inoutChartConfig: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
    const singleDeviceChartConfig = selectSingleDeviceChartConfig(state);
    const { bucketConfig, selectionMode } = singleDeviceChartConfig;
    const deviceGraphKey = getDataKey({ ...bucketConfig.toJS(), selectionMode });

    return {
        combinedNetworkDevice: selectEntireNetwork(state),
        inoutChartConfig: selectInOutChartConfig(state),
    };
};

export default connect(mapStateToProps)(InOutTab);
