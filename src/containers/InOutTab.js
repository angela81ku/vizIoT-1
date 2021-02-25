'use es6';

import React from 'react';
import PropTypes from 'prop-types';
import Flex from '../components/BeanUILibrary/Flex';
import FlexSize from '../components/BeanUILibrary/FlexSize';

import {pushRealTimeIOTraffic} from '../actions/packetActions';
import { connect } from 'react-redux';
import { selectEntireNetwork } from '../selectors/deviceSelectors';
import { selectInOutChartConfig } from '../selectors/chartSelectors';
import { getDataKey } from '../utility/DataKey';

import styled from 'styled-components';

import GridItem from '../components/BeanUILibrary/GridItem';
import { IOCount } from '../socket/subscribe';
import { H2 } from '../components/BeanUILibrary/functional-css/TypographyStyles';

import { selectRealTimeIOTraffic } from '../selectors/packetSelector';
import ConnectedLineChart from '../containers/ConnectedLineChart';

import { useSocket } from '../components/BeanUILibrary/hooks/useSocket';

// my imports
import SectionSubtitle from '../components/SectionSubtitle';
import SectionTitle from '../components/SectionTitle';
import InOutFacts from './InOutFacts';

const GridLayout = styled.div`
  display: grid;
  grid-template-columns: repeat(12, [col-start] 1fr);
  grid-auto-rows: 8rem;
  grid-gap: 2rem;
  grid-row-gap: 7rem;
`;

const Title = styled.div`
  ${H2}
  padding-bottom: 3rem;
  font-weight: 200;
`;

const OverviewContainer = styled.div`
  padding: 0 11.8rem;
  padding-top: 80px;
  margin: 0 auto;
`;

// colors of lines in line graph
// in, out
const lineColors = [ '#03cbac', '#d9b409'];

// fetching: do in the containers
// connection: as deep as i can.

const InOutTab = ({ combinedNetworkDevice, inoutChartConfig }) => {
    useSocket(IOCount, pushRealTimeIOTraffic);

    const renderMainChart = () => {
        const { bucketConfig, selectionMode } = inoutChartConfig;

        return (
            <ConnectedLineChart
                className="main-chart"
                title={'Network'}
                subtitle={'BYTES / SEC'}
                dataSelector={selectRealTimeIOTraffic}
                device={combinedNetworkDevice}
                deviceKey={'COMBINED'}
                dataKey={getDataKey({
                    ...bucketConfig.toJS(),
                    selectionMode,
                    macAddresses: [],
                })}
                chartConfig={inoutChartConfig}
                lineColors={lineColors}
            />
        );
    };

    return (
        <OverviewContainer>
            <SectionTitle title="In/Out Traffic" size="lg" cardPadding={false}/>
            <SectionSubtitle text="View network in/out traffic in real time" margins={true}/>
            <div className="medium-spacer" />

            <GridLayout>
                <GridItem overflow={'visible'} column={'col-start / span 5'} row={'1 / 3'}>
                    <InOutFacts lineColors={lineColors}/>
                </GridItem>
            </GridLayout>
            <GridItem column={'col-start 6 / span 7'} row={'1 / 3'}>
                <Flex gutter={2}>
                    <FlexSize size={{ lg: 12 }}>
                        <Title>Network Traffic</Title>
                        {renderMainChart()}
                    </FlexSize>
                </Flex>
            </GridItem>
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
    return {
        combinedNetworkDevice: selectEntireNetwork(state),
        inoutChartConfig: selectInOutChartConfig(state),
    };
};

export default connect(mapStateToProps)(InOutTab);
