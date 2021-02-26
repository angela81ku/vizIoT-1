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
// const lineColors = [ '#03cbac', '#d9b409'];
// const displayStreams = [1, 2];

const collectStreams = (data, displayStreams) => {

    if(data && data.length) {
        let packetData = []
        data.map(({startMS, size}) => {
            let index = 0;
            let sizeData = size.filter(stream => { return displayStreams.includes(index++) })
            packetData.push({startMS: startMS, size: sizeData});
        })
        return packetData;
    } else {
        return [];
    }

}

// fetching: do in the containers
// connection: as deep as i can.

const InOutTab = ({
    combinedNetworkDevice,
    inoutChartConfig,
    data,
    apiSource,
    packetPusher,
    packetSelector,
    lineColors,
    pageTitle,
    pageSubtitle,
    graphTitle,
    chartTitle,
    chartSubtitle
}) => {
    // useSocket(IOCount, pushRealTimeIOTraffic);
    useSocket(apiSource, packetPusher);

    const renderMainChart = () => {
        const { bucketConfig, selectionMode } = inoutChartConfig;

        return (
            <ConnectedLineChart
                className="main-chart"
                title={chartTitle}
                subtitle={chartSubtitle}
                data={data}
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
            <SectionTitle title={pageTitle} size="lg" cardPadding={false}/>
            <SectionSubtitle text={pageSubtitle} margins={true}/>
            <div className="medium-spacer" />

            <GridLayout>
                <GridItem overflow={'visible'} column={'col-start / span 5'} row={'1 / 3'}>
                    <InOutFacts lineColors={lineColors} packetSelector={packetSelector} />
                </GridItem>
            </GridLayout>
            <GridItem column={'col-start 6 / span 7'} row={'1 / 3'}>
                <Flex gutter={2}>
                    <FlexSize size={{ lg: 12 }}>
                        <Title>{graphTitle}</Title>
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
    data: PropTypes.array.isRequired,
    apiSource: PropTypes.string.isRequired,
    packetPusher: PropTypes.func.isRequired,
    packetSelector: PropTypes.func.isRequired,
    displayStreams: PropTypes.array,
    lineColors: PropTypes.array,
    pageTitle: PropTypes.string,
    pageSubtitle: PropTypes.string,
    graphTitle: PropTypes.string,
    chartTitle: PropTypes.string,
    chartSubtitle: PropTypes.string,
};

const mapStateToProps = (state, props) => {
    return {
        combinedNetworkDevice: selectEntireNetwork(state),
        inoutChartConfig: selectInOutChartConfig(state),
        // data: collectStreams(selectRealTimeIOTraffic(state)),
        data: collectStreams(props.packetSelector(state), props.displayStreams),
    };
};

export default connect(mapStateToProps)(InOutTab);
