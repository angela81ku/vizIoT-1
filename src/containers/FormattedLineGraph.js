import ConnectedLineChart from './ConnectedLineChart';
import React from 'react';
import PropTypes from 'prop-types';
import {selectInOutChartConfig} from '../selectors/chartSelectors';
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
    inoutChartConfig,
    graphColors
}) => {
    return (
        <div>
            <Title>{graphTitle}</Title>
            <ConnectedLineChart
                className="main-chart"
                title={chartTitle}
                subtitle={chartSubtitle}
                data={lineData}
                chartConfig={inoutChartConfig}
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
        inoutChartConfig: selectInOutChartConfig(state),
    };
};

export default connect(mapStateToProps)(FormattedLineGraph);