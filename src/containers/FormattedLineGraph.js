import ConnectedLineChart from './ConnectedLineChart';
import React from 'react';
import PropTypes from 'prop-types';
import {selectLiveLineChartConfig} from '../selectors/chartSelectors';
import styled from 'styled-components';
import {H2} from '../components/BeanUILibrary/functional-css/TypographyStyles';
import { connect } from 'react-redux';

const Title = styled.div`
  ${H2}
  padding-bottom: 3rem;
  font-weight: 200;
`;

const FormattedLineGraph = ({
    graphTitle,
    chartTitle,
    chartSubtitle,
    lineData,
    liveLineChartConfig,
    graphColors
}) => {
    return (
        <div style={{width:'100%', height:'100%'}}>
            <Title>{graphTitle}</Title>
            <ConnectedLineChart
                className="main-chart"
                title={chartTitle}
                subtitle={chartSubtitle}
                data={lineData}
                chartConfig={liveLineChartConfig}
                lineColors={graphColors}
            />
        </div>
    );
}

FormattedLineGraph.propTypes = {
    inoutChartConfig: PropTypes.object.isRequired,
    lineData: PropTypes.array.isRequired,
    graphColors: PropTypes.array.isRequired,
    graphTitle: PropTypes.string,
    chartTitle: PropTypes.string,
    chartSubtitle: PropTypes.string,
};

const mapStateToProps = (state) => {
    return {
        liveLineChartConfig: selectLiveLineChartConfig(state),
    };
};

export default connect(mapStateToProps)(FormattedLineGraph);