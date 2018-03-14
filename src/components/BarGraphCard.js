import React from 'react';
import PropTypes from 'prop-types';
import BarChart from './d3/BarChart';
import MomentUnit from '../constants/MomentUnit';
import AutoFitComponent from './AutoFitComponent';
import { SPACING } from '../data/records/Spacing';
import FlexWrapper from './BeanUILibrary/FlexWrapper';

class BarGraphCard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { title, subtitle, data, dataWindowSize } = this.props;

    return (
      <FlexWrapper className="barGraphCard">
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
      </FlexWrapper>
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
