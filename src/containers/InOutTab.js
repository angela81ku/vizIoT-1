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

const TabContainer = styled.div`
  padding: 0 11.8rem;
  padding-top: 80px;
  margin: 0 auto;
`;

const findNumberOfStreams = facts => {
    const displayStreams = [];
    for (let i = 0; i < facts.length; ++i) {
        if (facts[i].isVisible) {
            displayStreams.push(i);
        }
    }

    return displayStreams;
}

// collects the streams that should be shown if display streams are provided
// otherwise collects all the data provided to be displayed
const collectLineData = (data, facts) => {

    const displayStreams = findNumberOfStreams(facts);

    let packetData = []
    if (!displayStreams && data && data.length) {
        data.map(({startMS, size}) => {
            packetData.push({startMS: startMS, size: size});
        })
    } else if (data && data.length) {
        data.map(({startMS, size}) => {
            let index = 0;
            let sizeData = [];
            size.forEach(stream => {
                if(displayStreams.includes(index++)) {
                    sizeData.push(stream)
                }
            })
            packetData.push({startMS: startMS, size: sizeData});
        })
    }

    return packetData;
}

// creates col if none are provided
const findColors = facts => {

    const colors = [];
    facts.forEach(fact => {
        if (!fact.color) {
            colors.push(null);
        } else {
            colors.push(fact.color);
        }
    })

    let needsColors = []
    let index = 0;
    colors.forEach(color => {
        if (color === null) { needsColors.push(index); }
        index++;
    })

    const numberOfStreams = needsColors.length;
    const maxVal = 255;
    const jumpVal = Math.floor(maxVal/numberOfStreams);
    const interpolatedColors = [];

    for (let i = 0; i < numberOfStreams; ++i) {
        const jump = i * jumpVal;
        const r = i * jump;
        const g = Math.floor(maxVal/2)
        const b = maxVal - (jump)
        const colorString = 'rgb('+ r + ', ' + g + ', ' + b +')';
        interpolatedColors.push(colorString);
    }

    let i = 0;
    needsColors.forEach(index => {
        colors[index] = interpolatedColors[i++];
    })

    return colors;
}

// fetching: do in the containers
// connection: as deep as i can.

const InOutTab = ({
    inoutChartConfig,
    lineData,
    streamData,
    apiSource,
    packetPusher,
    pageTitle,
    pageSubtitle,
    graphTitle,
    chartTitle,
    chartSubtitle,
    legendTitle,
    facts,
}) => {

    // use facts to populate colors

    const streams = findNumberOfStreams(facts);
    const displayFacts = facts.map(fact => { return fact.title });
    const colors = findColors(facts);

    if (displayFacts.includes(undefined)) {
        throw new Error('\'title\' must be defined for all \'fact\' objects')
    }

    if (streamData && streamData.length > 0 && streamData[0].size.length !== facts.length) {
        throw new Error('number of streams from packet selector must be equal to number of facts provided:' +
            ' numberOfStreams=' + streamData[0].size.length + ' numberOfFacts=' + facts.length);
    }
    // console.log(lineData);

    useSocket(apiSource, packetPusher);

    const renderMainChart = () => {

        // if displayStreams and lineColors exist, select these colors for the linegraph
        // otherwise, just place all line colors into a graph
        let graphColors = [];
        let index = 0;
        colors.forEach(stream => {
            if (streams.includes(index++)) {
                graphColors.push(stream);
            }
        });

        return (
            <ConnectedLineChart
                className="main-chart"
                title={chartTitle}
                subtitle={chartSubtitle}
                data={lineData}
                chartConfig={inoutChartConfig}
                lineColors={graphColors}
            />
        );
    };

    return (
        <TabContainer>
            <SectionTitle title={pageTitle} size="lg" cardPadding={false}/>
            <SectionSubtitle text={pageSubtitle} margins={true}/>
            <div className="medium-spacer" />

            <GridLayout>
                <GridItem overflow={'visible'} column={'col-start / span 5'} row={'1 / 3'}>
                    <InOutFacts
                        lineColors={colors}
                        // packetSelector={packetSelector}
                        streamData={streamData}
                        legendTitle={legendTitle}
                        displayFacts={displayFacts}
                        displayStreams={streams}
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
        </TabContainer>
    );
};

InOutTab.defaultProps = {
    networkId: 42,
};

InOutTab.propTypes = {
    inoutChartConfig: PropTypes.object.isRequired,
    lineData: PropTypes.array.isRequired,
    streamData: PropTypes.array,
    apiSource: PropTypes.string.isRequired,
    packetPusher: PropTypes.func.isRequired,
    packetSelector: PropTypes.func.isRequired,
    facts: PropTypes.array.isRequired,
    pageTitle: PropTypes.string,
    pageSubtitle: PropTypes.string,
    graphTitle: PropTypes.string,
    chartTitle: PropTypes.string,
    chartSubtitle: PropTypes.string,
    legendTitle: PropTypes.string,
};

const mapStateToProps = (state, props) => {
    const data = props.packetSelector(state);
    return {
        inoutChartConfig: selectInOutChartConfig(state),
        lineData: collectLineData(data, props.facts),
        streamData: data,
    };
};

export default connect(mapStateToProps)(InOutTab);
