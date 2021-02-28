import ConnectedLineChart from './ConnectedLineChart';
import React from 'react';
import PropTypes from 'prop-types';
import {selectLiveLineChartConfig} from '../selectors/chartSelectors';
import styled from 'styled-components';
import {H2} from '../components/BeanUILibrary/functional-css/TypographyStyles';
import { connect } from 'react-redux';
import {useSocket} from '../components/BeanUILibrary/hooks/useSocket';
import {findColors} from '../utility/ColorUtility';

const Title = styled.div`
  ${H2}
  padding-bottom: 3rem;
  font-weight: 200;
`;

const FormattedLineGraph = ({
    resources,
    graphTitle,
    chartTitle,
    chartSubtitle,
    lineData,
    liveLineChartConfig,
    graphColors
}) => {

    // collect data with given resources
    useSocket(resources.apiSource, resources.packetPusher);

    let colors = []
    // check to see if graph colors is defined
    if (!graphColors || graphColors.length === 0) {
        // check to see if there's any data provided
        // if not, colors will remain an empty array since there is nothing to show
        if(lineData && lineData.length > 0) {
            // find out if there is a size attribute
            if (lineData[0].size) {
                // check to see if size is an array
                if (!lineData[0].size.length) {
                    // find colors for each stream provided
                    colors = findColors(lineData[0].size.length)
                } else {
                    // otherwise, is numeric, find single color
                    colors = findColors(1);
                }

            } else {
                throw new Error('size attribute does not exist on provided data as number or array: ' + lineData)
            }
        }
    }
    // otherwise, use provided graph colors
    else {
        colors = graphColors;
    }

    // check to see if colors given are equal to the number of streams provided
    if (lineData && lineData.length > 0
        && lineData[0].size.length
        && colors.length !== lineData[0].size.length) {
        throw new Error('number of colors(' + colors.length + ') provided does not match number of streams(' + lineData[0].size.length + ')')
    }

    return (
        <div style={{width:'100%', height:'100%'}}>
            <Title>{graphTitle}</Title>
            <ConnectedLineChart
                className="main-chart"
                title={chartTitle}
                subtitle={chartSubtitle}
                data={lineData}
                chartConfig={liveLineChartConfig}
                lineColors={colors}
            />
        </div>
    );
}

FormattedLineGraph.propTypes = {
    liveLineChartConfig: PropTypes.object.isRequired,
    resources: PropTypes.object.isRequired,
    lineData: PropTypes.array.isRequired,
    graphColors: PropTypes.array.isRequired,
    graphTitle: PropTypes.string,
    chartTitle: PropTypes.string,
    chartSubtitle: PropTypes.string,
};

const mapStateToProps = (state, props) => {
    let data = props.resources.packetSelector(state);
    if(!data) { data = []; }
    return {
        liveLineChartConfig: selectLiveLineChartConfig(state),
        lineData: data,
    };
};

export default connect(mapStateToProps)(FormattedLineGraph);