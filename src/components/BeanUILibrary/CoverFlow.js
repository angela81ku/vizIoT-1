import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { CSSTransitionGroup } from 'react-transition-group';

class CoverFlow extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classNames, children, onLeft, onRight } = this.props;

    return (
      <div className={classnames('coverFlow', classNames)}>
        <div
          className="coverFlow__leftButton coverFlow__button"
          onClick={onLeft}
        >
          <i className="fas fa-angle-left" />
        </div>
        <div
          className="coverFlow__rightButton coverFlow__button"
          onClick={onRight}
        >
          <i className="fas fa-angle-right" />
        </div>
        <CSSTransitionGroup
          transitionName="carousel"
          transitionEnterTimeout={2000}
          transitionLeaveTimeout={2000}
        >
          {children}
        </CSSTransitionGroup>
      </div>
    );
  }
}

CoverFlow.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export default CoverFlow;
