'use es6';

import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import LiveLineGraph from 'VizIoT/components/d3/LiveLineGraph';
import MomentUnit from 'VizIoT/constants/MomentUnit';
import AutoFitComponent from './AutoFitComponent';
import {SPACING} from 'VizIoT/data/records/Spacing';
import Flex, {FlexDirection} from 'UIBean/Flex';
import styled from 'styled-components';
import {H4} from 'UIBean/functional-css/TypographyStyles';
import {EXTRA_LIGHT_COLOR} from 'VizIoT/styles/base/viz-theme';

const Title = styled.div`
  ${H4}
  font-weight: 700;
`;

const Subtitle = styled.div`
  font-weight: 400;
  margin-bottom: 4px;
  color: ${EXTRA_LIGHT_COLOR};
  text-transform: uppercase;
  font-size: 1.1rem;
  letter-spacing: 2px;
`;

const LineChart = ({title, subtitle, data, dataWindowSize, lineColors, className}) => {

  return data.length >= 1 && (
    <Flex direction={FlexDirection.COLUMN}>
      {title && <Title>{title}</Title>}
      {subtitle && <Subtitle>{subtitle}</Subtitle>}
      <AutoFitComponent className={className}>
        <LiveLineGraph
          data={data}
          dataWindowSize={dataWindowSize}
          dataWindowUnit={MomentUnit.SECONDS}
          dimension={{
            width: 0,
            height: 0,
          }}
          padding={new SPACING({l: 20, r: 0, t: 20, b: 20})}
          transitionDuration={1000}
          lineColors={lineColors}
        />
      </AutoFitComponent>
    </Flex>
  );
}

LineChart.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.node,
  data: PropTypes.array.isRequired,
  dataWindowSize: PropTypes.number.isRequired,
  margins: PropTypes.instanceOf(SPACING),
  lineColors: PropTypes.array
};

export default LineChart;
