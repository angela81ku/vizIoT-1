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

class LineGraphPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            metricWidth: undefined
        }
    }

    setGraphWidth() {
        const metricMult = 1.25;
        let metricWidth = document.getElementById('fact-flex').clientWidth;
        console.log(metricWidth)
        metricWidth *= metricMult;
        console.log(metricWidth);
        this.setState({ metricWidth });
    }

    componentDidMount() {
        this.setGraphWidth()
        window.addEventListener('resize', this.setGraphWidth.bind(this))
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.setGraphWidth.bind(this))
    }

    // if facts are defined, render the facts
    factRenderer = (facts, legendTitle, metricResource, graphResource, metricSocketOverride) => {
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

    lineGraphRenderer = (graphResource, graphSocketOverride, graphTitle, chartTitle, chartSubtitle, graphColors, metricWidth) => {
        if (metricWidth) {
            return (
                <div style={{width:metricWidth}}>
                    <FormattedLineGraph
                        resources={graphResource}
                        socketOverride={graphSocketOverride}
                        graphTitle={graphTitle}
                        chartTitle={chartTitle}
                        chartSubtitle={chartSubtitle}
                        graphColors={graphColors}
                    />
                </div>
            )
        }
    }

    render () {

        const graphResource = this.props.graphResource;
        const graphSocketOverride = this.props.graphSocketOverride;
        const metricResource = this.props.metricResource;
        const metricSocketOverride = this.props.metricSocketOverride;
        const pageTitle = this.props.pageTitle;
        const pageSubtitle = this.props.pageSubtitle;
        const graphTitle = this.props.graphTitle;
        const chartTitle = this.props.chartTitle;
        const chartSubtitle = this.props.chartSubtitle;
        const legendTitle = this.props.legendTitle;
        const facts = this.props.facts;
        const metricWidth = this.state.metricWidth;

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

        return <TabContainer>
            <SectionTitle title={pageTitle} size="lg" cardPadding={false}/>
            <SectionSubtitle text={pageSubtitle} margins={true}/>
            <div className="small-spacer"/>

            {this.factRenderer(facts, legendTitle, metricResource, graphResource, metricSocketOverride)}
            {this.lineGraphRenderer(graphResource, graphSocketOverride, graphTitle, chartTitle, chartSubtitle, graphColors, metricWidth)}
            <div className="xl-spacer"/>
        </TabContainer>

    }
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
