import React from 'react';
import PropTypes from 'prop-types';
import CardWrapper from './BeanUILibrary/CardWrapper';
import BarChart from './d3/BarChart';
import DataWindowUnit from '../constants/MomentUnit';
import AutoFitComponent from './AutoFitComponent';
import { SPACING } from '../data/records/Spacing';

class BarGraphCard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { title, subtitle, data, dataWindowSize } = this.props;

    return (
      <CardWrapper noBackground={true} noShadow={true}>
        <h6 className="barGraphCard__subtitle">{subtitle}</h6>
        <h4 className="barGraphCard__title">{title}</h4>

        <div className="small-spacer" />

        <AutoFitComponent className={this.props.className}>
          <BarChart
            data={data}
            dataWindowSize={dataWindowSize}
            dataWindowUnit={DataWindowUnit.SECONDS}
            dimension={{
              width: 0,
              height: 0,
            }}
            padding={new SPACING({ l: 20, r: 0, t: 20, b: 20 })}
          />
        </AutoFitComponent>
      </CardWrapper>
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
