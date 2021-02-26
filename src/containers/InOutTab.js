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

// collects the streams that should be shown if display streams are provided
// otherwise collects all the data provided to be displayed
const collectStreams = (data, displayStreams) => {

    let packetData = []
    if (!displayStreams && data && data.length) {
        data.map(({startMS, size}) => {
            packetData.push({startMS: startMS, size: size});
        })
    } else if (data && data.length) {
        data.map(({startMS, size}) => {
            let index = 0;
            let sizeData = size.filter(stream => {
                return displayStreams.includes(index++)
            })
            packetData.push({startMS: startMS, size: sizeData});
        })
    }

    return packetData;
}

// creates col if none are provided
const interpolateColors = numberOfStreams => {
    const maxVal = 255;
    const jumpVal = Math.floor(maxVal/numberOfStreams);
    const colors = [];
    for (let i = 0; i < numberOfStreams; ++i) {
        const jump = i * jumpVal;
        const r = i * jump;
        const g = Math.floor(maxVal/2)
        const b = maxVal - (jump)
        const colorString = 'rgb('+ r + ', ' + g + ', ' + b +')';
        colors.push(colorString);
    }

    console.log(colors)

    return colors;
}

// fetching: do in the containers
// connection: as deep as i can.

const InOutTab = ({
    inoutChartConfig,
    data,
    apiSource,
    packetPusher,
    packetSelector,
    dataColors,
    pageTitle,
    pageSubtitle,
    graphTitle,
    chartTitle,
    chartSubtitle,
    legendTitle,
    displayFacts,
    displayStreams,
    numberOfStreams
}) => {

    // ERROR CHECKING

    // ensure that there are enough color for each data stream provided
    if (dataColors && numberOfStreams !== dataColors.length) {
        throw new Error('numOfStreams must be equal to number of colors provided in dataColors');
    }

    // ensure that there are not more displayStream values than there are streams
    if (displayStreams && displayStreams.length > numberOfStreams) {
        throw new Error('There cannot be more displayStreams than there are numberOfStreams')
    }

    // ensure there are not more than 255 streams
    // not just because that's an insane number of streams, but also the color interpolation doesn't work past 255
    if (numberOfStreams > 255) {
        throw new Error('Cannot support more than 255 streams');
    }

    // set up default values for displayStreams if none are provided
    let streams = [];
    if (!displayStreams) {
        for (let i = 0; i < numberOfStreams; ++i) {
            streams.push(i);
        }
    } else {
        streams = displayStreams;
    }

    // set up default values for dataColors if none are provided
    let colors = [];
    if (!dataColors) {
        colors = interpolateColors(numberOfStreams);
    } else {
        colors = dataColors;
    }

    useSocket(apiSource, packetPusher);

    const renderMainChart = () => {

        let index = 0;

        // if displayStreams and lineColors exist, select these colors for the linegraph
        // otherwise, just place all line colors into a graph
        let graphColors = [];
        // if (lineColors && displayStreams) {
            graphColors = colors.filter(stream => {
                return streams.includes(index++)
            });
        // } else if (lineColors) {
        //     graphColors = lineColors;
        // } else if (displayStreams) {
        //     graphColors =
        // }

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
                        lineColors={colors}
                        packetSelector={packetSelector}
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
    displayFacts: PropTypes.array.isRequired,
    numberOfStreams: PropTypes.number.isRequired,
    displayStreams: PropTypes.array,
    dataColors: PropTypes.array,
    pageTitle: PropTypes.string,
    pageSubtitle: PropTypes.string,
    graphTitle: PropTypes.string,
    chartTitle: PropTypes.string,
    chartSubtitle: PropTypes.string,
    legendTitle: PropTypes.string,

};

const mapStateToProps = (state, props) => {
    return {
        inoutChartConfig: selectInOutChartConfig(state),
        data: collectStreams(props.packetSelector(state), props.displayStreams),
    };
};

export default connect(mapStateToProps)(InOutTab);
