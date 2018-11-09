'use es6';

import React from 'react';
import PropTypes from 'prop-types';
import BarChart from 'VizIoT/components/d3/BarChart';
import MomentUnit from 'VizIoT/constants/MomentUnit';
import AutoFitComponent from './AutoFitComponent';
import { SPACING } from 'VizIoT/data/records/Spacing';
import Flex, { FlexDirection } from 'UIBean/Flex';
import styled from 'styled-components';
import { H4 } from 'UIBean/functional-css/TypographyStyles';
import { EXTRA_LIGHT_COLOR } from 'VizIoT/styles/base/viz-theme';

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

class BarGraphCard extends React.Component {
  render() {
    const { title, subtitle, data, dataWindowSize } = this.props;

    return (
      <Flex direction={FlexDirection.COLUMN}>
        <Title>{title}</Title>
        <Subtitle>{subtitle}</Subtitle>
        <AutoFitComponent className={this.props.className}>
          <BarChart
            data={data}
            dataWindowSize={dataWindowSize}
            dataWindowUnit={MomentUnit.SECONDS}
            dimension={{
              width: 0,
              height: 0,
            }}
            padding={new SPACING({ l: 20, r: 0, t: 20, b: 20 })}
          />
        </AutoFitComponent>
      </Flex>
    );
  }
}

BarGraphCard.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.node,
  data: PropTypes.array.isRequired,
  dataWindowSize: PropTypes.number.isRequired,
  margins: PropTypes.instanceOf(SPACING),
};

export default BarGraphCard;
