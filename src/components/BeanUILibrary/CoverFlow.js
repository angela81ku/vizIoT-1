import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

class CoverFlow extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classNames, key, children, onLeft, onRight } = this.props;

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
        <TransitionGroup>
          <CSSTransition key="key" classNames="carousel" timeout={{ enter: 2000, exit: 2000 }}>
            {children}
          </CSSTransition>
        </TransitionGroup>
      </div>
    );
  }
}

CoverFlow.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export default CoverFlow;
