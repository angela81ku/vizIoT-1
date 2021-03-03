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

// fetching: do in the containers
// connection: as deep as i can.

const LineGraphPage = ({
    graphResource,
    graphSocketOverride,
    metricResource,
    metricSocketOverride,
    pageTitle,
    pageSubtitle,
    graphTitle,
    chartTitle,
    chartSubtitle,
    legendTitle,
    facts,
}) => {

    // use facts to populate colors
    // if isGraphed == true, include color
    // if no color provided, do not add
    let graphColors = [];
    if (facts) {
        facts.forEach(fact => {
            if (fact.isGraphed === true && fact.color) {
                graphColors.push(fact.color);
            }
        })
    }

    // if facts are defined, render the facts
    const factRenderer = (facts, legendTitle, metricResource, graphResource, metricSocketOverride) => {
        if (facts) {
            return (
                <FlexedFacts
                    displayFacts={facts}
                    legendTitle={legendTitle}
                    resources={metricResource ? metricResource : graphResource}
                    socketOverride={metricSocketOverride}
                />
            )
        }
    }

    return (
        <TabContainer>
            <SectionTitle title={pageTitle} size="lg" cardPadding={false}/>
            <SectionSubtitle text={pageSubtitle} margins={true}/>
            <div className="small-spacer" />

            {factRenderer(facts, legendTitle, metricResource, graphResource, metricSocketOverride)}
            <FormattedLineGraph
                resources={graphResource}
                socketOverride={graphSocketOverride}
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

// set graph socket override to make sure resource passed to graph is implemented/not implemented
// use metric Socket override to make sure resource passed to is implemented/not implemented
LineGraphPage.propTypes = {
    graphResource: PropTypes.object.isRequired,
    graphSocketOverride: PropTypes.bool,
    metricResource: PropTypes.object,
    metricSocketOverride: PropTypes.bool,
    facts: PropTypes.array,
    pageTitle: PropTypes.string,
    pageSubtitle: PropTypes.string,
    graphTitle: PropTypes.string,
    chartTitle: PropTypes.string,
    chartSubtitle: PropTypes.string,
    legendTitle: PropTypes.string,
};


export default LineGraphPage;
