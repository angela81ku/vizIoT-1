'use es6';

import React from 'react';
import PropTypes from 'prop-types';
import Flex from '../components/BeanUILibrary/Flex';
import FlexSize from '../components/BeanUILibrary/FlexSize';

import { connect } from 'react-redux';
import { selectInOutChartConfig } from '../selectors/chartSelectors';

import styled from 'styled-components';

import GridItem from '../components/BeanUILibrary/GridItem';
import { H2 } from '../components/BeanUILibrary/functional-css/TypographyStyles';

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
    chartSubtitle,
    legendTitle,
    displayFacts,
    displayStreams,
}) => {

    useSocket(apiSource, packetPusher);

    const renderMainChart = () => {

        let index = 0;
        const graphColors = lineColors.filter(stream => { return displayStreams.includes(index++) });

        return (
            <ConnectedLineChart
                className="main-chart"
                title={chartTitle}
                subtitle={chartSubtitle}
                data={data}
                chartConfig={inoutChartConfig}
                lineColors={graphColors}
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
                    <InOutFacts
                        lineColors={lineColors}
                        packetSelector={packetSelector}
                        legendTitle={legendTitle}
                        displayFacts={displayFacts}
                        displayStreams={displayStreams}
                    />
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
    legendTitle: PropTypes.string,
    displayFacts: PropTypes.array.isRequired,
};

const mapStateToProps = (state, props) => {
    return {
        inoutChartConfig: selectInOutChartConfig(state),
        data: collectStreams(props.packetSelector(state), props.displayStreams),
    };
};

export default connect(mapStateToProps)(InOutTab);
