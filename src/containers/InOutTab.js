'use es6';

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { useSocket } from '../components/BeanUILibrary/hooks/useSocket';

// my imports
import SectionSubtitle from '../components/SectionSubtitle';
import SectionTitle from '../components/SectionTitle';
import InOutFacts from './InOutFacts';
import FormattedLineGraph from './FormattedLineGraph';

const TabContainer = styled.div`
  padding: 0 11.8rem;
  padding-top: 80px;
  margin: 0 auto;
`;

// finds number of streams to be displayed on the line graph
// based on visibility of facts
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

// if displayStreams and lineColors exist, select these colors for the linegraph
// otherwise, just place all line colors into a graph
const findGraphColors = (colors, streams) => {
    let graphColors = [];
    let index = 0;
    colors.forEach(stream => {
        if (streams.includes(index++)) {
            graphColors.push(stream);
        }
    });
    return graphColors;
}

// fetching: do in the containers
// connection: as deep as i can.

const InOutTab = ({
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
    const graphColors = findGraphColors(colors, streams);

    if (displayFacts.includes(undefined)) {
        throw new Error('\'title\' must be defined for all \'fact\' objects')
    }

    if (streamData && streamData.length > 0 && streamData[0].size.length !== facts.length) {
        throw new Error('number of streams from packet selector must be equal to number of facts provided:' +
            ' numberOfStreams=' + streamData[0].size.length + ' numberOfFacts=' + facts.length);
    }

    useSocket(apiSource, packetPusher);

    return (
        <TabContainer>
            <SectionTitle title={pageTitle} size="lg" cardPadding={false}/>
            <SectionSubtitle text={pageSubtitle} margins={true}/>
            <div className="small-spacer" />

            <InOutFacts
                lineColors={colors}
                streamData={streamData}
                legendTitle={legendTitle}
                displayFacts={displayFacts}
                displayStreams={streams}
            />
            <FormattedLineGraph
                graphTitle={graphTitle}
                chartTitle={chartTitle}
                chartSubtitle={chartSubtitle}
                lineData={lineData}
                graphColors={graphColors}
            />
            <div className="xl-spacer" />
        </TabContainer>
    );
};

InOutTab.defaultProps = {
    networkId: 42,
};

InOutTab.propTypes = {
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
        lineData: collectLineData(data, props.facts),
        streamData: data,
    };
};

export default connect(mapStateToProps)(InOutTab);
