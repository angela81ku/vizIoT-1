'use es6';

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled, {keyframes} from 'styled-components';
import { useSocket } from '../components/BeanUILibrary/hooks/useSocket';

// my imports
import SectionSubtitle from '../components/SectionSubtitle';
import SectionTitle from '../components/SectionTitle';
import FlexedFacts from './FlexedFacts';
import FormattedLineGraph from './FormattedLineGraph';
import Flex, {FlexDirection, JustifyContent} from "../components/BeanUILibrary/Flex";
import FlexSize from '../components/BeanUILibrary/FlexSize';
import {H2, H4} from "../components/BeanUILibrary/functional-css/TypographyStyles";
import {selectThreeDevices} from "../selectors/deviceSelectors";
import {selectDeviceToLiveSamples} from "../selectors/packetSelector";
import {selectSingleDeviceChartConfig} from "../selectors/chartSelectors";
import DeviceCollection from "../components/device/DeviceCollection";
import {useTimedFetcher} from "../components/BeanUILibrary/hooks/useTimedFetcher";
import {fetchDevices} from "../actionsRequest/deviceRequest";
import DeviceContainer from "./IndividualDeviceContainer";
import {findColors} from "../utility/ColorUtility";

const TabContainer = styled.div`
  padding: 0 11.8rem;
  padding-top: 80px;
  margin: 0 auto;
`;

const fade = keyframes`
  from {
    opacity: 0;
  }
  
  to {
    opacity: 1;
  }
`;

const StyledLineRenderer = styled.div`
  animation: ${fade} 2.25s;
`

// fetching: do in the containers
// connection: as deep as i can.

class LineGraphPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            metricWidth: undefined,
            metricRect: undefined,
            graphRect: undefined
        }
    }

    setGraphWidth() {
        const factFlex = document.getElementById('fact-flex');
        const metricMult = 1.25;
        const metricW = factFlex.clientWidth;
        const metricWidth = metricW * metricMult;
        this.setState({ metricWidth });
    }

    setMetricRect() {
        // get bounds of metric container (if it exists yet)
        let metricRect = undefined;
        const metricContainer = document.getElementById('fact-flex')
        if (metricContainer) {
            metricRect = metricContainer.getBoundingClientRect();
        }

        this.setState({metricRect})
    }

    setGraphRect() {
        // get bounds of graph container (if it exists yet)
        let graphRect = undefined;
        const graphContainer = document.getElementById('graph-container');
        if (graphContainer) {
            graphRect = graphContainer.getBoundingClientRect();
        }
        this.setState({graphRect})
    }

    unsetGraphRect() {
        this.setState({
            graphRect: undefined,
        })
    }

    unsetMetricRect() {
        this.setState({
            metricRect: undefined,
        })
    }

    componentDidMount() {
        this.setGraphWidth();
        this.setMetricRect();
        this.setGraphRect();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

        // get current values from state
        const metricRect = this.state.metricRect;
        const graphRect = this.state.graphRect;

        // if either component is null, call setRects, which calls setState
        // prevents infinite render-loop
        if (metricRect === undefined) {
            this.setMetricRect();
        }
        if (graphRect === undefined) {
            this.setGraphRect();
        }
    }

    componentWillUnmount() {
        this.unsetMetricRect();
        this.unsetGraphRect();
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
                <div style={{width: metricWidth}} id={'graph-container'}>
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

    metricGraphLineRenderer = (metricRect, graphRect, color) => {
        if (metricRect && graphRect && graphRect.height > 100) {
            // console.log(metricRect);
            // console.log(graphRect);
            const windowWidth = window.innerWidth;
            const windowHeight = window.innerHeight;
            // vertical line near metrics
            const metricx1 = metricRect.width;
            const metricy1 = 0;
            const metricx2 = metricx1;
            const metricy2 = metricRect.height;

            // horizontal line
            const horizontalx1 = metricx1;
            const horizontaly1 = metricRect.height / 2.0;
            const horiztonalx2 = graphRect.width;
            const horizontaly2 = horizontaly1;

            //vertical line near graph
            const graphx1 = horiztonalx2;
            const graphy1 = horizontaly1;
            const graphx2 = graphx1;
            const graphy2 = graphRect.height + metricy2 - 10;

            return <StyledLineRenderer>
                <svg width={windowWidth} height={windowHeight} style={{top:metricRect.top, left:metricRect.left, position:'absolute'}}>
                    <line strokeWidth="2px" stroke={color} x1={metricx1} y1={metricy1} x2={metricx2} y2={metricy2} id="metric-vert"/>
                    <line strokeWidth="2px" stroke={color} x1={horizontalx1} y1={horizontaly1} x2={horiztonalx2} y2={horizontaly2} id="metric-horiz"/>
                    <line strokeWidth="2px" stroke={color} x1={graphx1} y1={graphy1} x2={graphx2} y2={graphy2} id="graph-vert"/>
                </svg>
            </StyledLineRenderer>
        }

    }

    deviceContainerRenderer = (graphResource, fetcher, colors) => {
        if (graphResource && fetcher) {
            return <DeviceContainer
              individualGraphResource={graphResource}
              individualDeviceFetcher={fetcher}
              graphColors={colors}
            />
        }
    }

    render () {

        setTimeout(this.setGraphRect.bind(this), 100)

        // prop vals
        const graphResource = this.props.graphResource;
        const graphSocketOverride = this.props.graphSocketOverride;
        const metricResource = this.props.metricResource;
        const metricSocketOverride = this.props.metricSocketOverride;
        const individualGraphResource = this.props.individualGraphResource;
        const individualDeviceFetcher = this.props.individualDeviceFetcher;
        const pageTitle = this.props.pageTitle;
        const pageSubtitle = this.props.pageSubtitle;
        const graphTitle = this.props.graphTitle;
        const chartTitle = this.props.chartTitle;
        const chartSubtitle = this.props.chartSubtitle;
        const legendTitle = this.props.legendTitle;
        const facts = this.props.facts;

        // state vals
        const metricWidth = this.state.metricWidth;
        const metricRect = this.state.metricRect;
        const graphRect = this.state.graphRect;

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
            {/*this.metricGraphLineRenderer(metricRect, graphRect, 'white')*/}
            {this.deviceContainerRenderer(individualGraphResource, individualDeviceFetcher, graphColors)}
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
    individualGraphResource: PropTypes.object,
    individualDeviceFetcher: PropTypes.object,
    facts: PropTypes.array,
    pageTitle: PropTypes.string,
    pageSubtitle: PropTypes.string,
    graphTitle: PropTypes.string,
    chartTitle: PropTypes.string,
    chartSubtitle: PropTypes.string,
    legendTitle: PropTypes.string,
};


export default LineGraphPage;
