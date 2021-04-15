import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {TransitionGroup, CSSTransition} from 'react-transition-group';

class CoverFlow extends React.Component {
  render() {
    const {classNames, keyName, children, onLeft, onRight} = this.props;
    return (
      <div className={classnames('coverFlow', classNames)}>
        {/*<div*/}
        {/*className="coverFlow__leftButton coverFlow__button"*/}
        {/*onClick={onLeft}*/}
        {/*>*/}
        {/*<i className="fas fa-angle-left" />*/}
        {/*</div>*/}
        {/*<div*/}
        {/*className="coverFlow__rightButton coverFlow__button"*/}
        {/*onClick={onRight}*/}
        {/*>*/}
        {/*<i className="fas fa-angle-right" />*/}
        {/*</div>*/}
        <TransitionGroup>
          <CSSTransition
            key={keyName}
            classNames="carousel"
            // timeout={{ enter: 2000, exit: 2000 }}
            timeout={5000}
          >
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
  keyName: PropTypes.string.isRequired,
};

export default CoverFlow;
