'use es6';

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { useSocket } from '../components/BeanUILibrary/hooks/useSocket';

// my imports
import SectionSubtitle from '../components/SectionSubtitle';
import SectionTitle from '../components/SectionTitle';
import FlexedFacts from './FlexedFacts';
import FormattedLineGraph from './FormattedLineGraph';

const TabContainer = styled.div`
  padding: 0 11.8rem;
  padding-top: 80px;
  margin: 0 auto;
`;

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

const LineGraphPage = ({
    graphResource,
    pageTitle,
    pageSubtitle,
    graphTitle,
    chartTitle,
    chartSubtitle,
    legendTitle,
    facts,
}) => {

    // use facts to populate colors

    let graphColors = [];
    facts.forEach(fact => {
        if (fact.isGraphed) {
            graphColors.push(fact.color);
        }
    })

    return (
        <TabContainer>
            <SectionTitle title={pageTitle} size="lg" cardPadding={false}/>
            <SectionSubtitle text={pageSubtitle} margins={true}/>
            <div className="small-spacer" />

            <FlexedFacts
                displayFacts={facts}
                legendTitle={legendTitle}
                resources={graphResource}
            />
            <FormattedLineGraph
                resources={graphResource}
                graphTitle={graphTitle}
                chartTitle={chartTitle}
                chartSubtitle={chartSubtitle}
                graphColors={graphColors}
            />
            <div className="xl-spacer" />
        </TabContainer>
    );
};

LineGraphPage.defaultProps = {
    networkId: 42,
};

LineGraphPage.propTypes = {
    graphResource: PropTypes.object.isRequired,
    metricResources: PropTypes.object,
    facts: PropTypes.array.isRequired,
    pageTitle: PropTypes.string,
    pageSubtitle: PropTypes.string,
    graphTitle: PropTypes.string,
    chartTitle: PropTypes.string,
    chartSubtitle: PropTypes.string,
    legendTitle: PropTypes.string,
};


export default LineGraphPage;
