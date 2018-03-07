import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class CoverFlowContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classNames, children } = this.props;

    return (
      <div className={classnames('coverFlowContainer', classNames)}>
        <div className="coverFlowContainer__leftButton">
          <i class="fas fa-angle-left" />
        </div>
        <div className="coverFlowContainer__rightButton">
          <i class="fas fa-angle-right" />
        </div>
        {children}
      </div>
    );
  }
}

CoverFlowContainer.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export default CoverFlowContainer;
