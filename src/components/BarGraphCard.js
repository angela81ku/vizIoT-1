'use es6';

import React from 'react';
import PropTypes from 'prop-types';
import BarChart from 'VizIoT/components/d3/BarChart';
import MomentUnit from 'VizIoT/constants/MomentUnit';
import AutoFitComponent from './AutoFitComponent';
import { SPACING } from 'VizIoT/data/records/Spacing';
import Flex from 'UIBean/Flex';

class BarGraphCard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { title, subtitle, data, dataWindowSize } = this.props;

    return (
      <Flex className="barGraphCard">
        <h4 className="barGraphCard__title">{title}</h4>
        <h6 className="barGraphCard__subtitle">{subtitle}</h6>
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
