import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class CoverFlow extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classNames, children } = this.props;

    return (
      <div className={classnames('coverFlow', classNames)}>
        <div className="coverFlow__leftButton coverFlow__button">
          <i class="fas fa-angle-left" />
        </div>
        <div className="coverFlow__rightButton coverFlow__button">
          <i class="fas fa-angle-right" />
        </div>
        {children}
      </div>
    );
  }
}

CoverFlow.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export default CoverFlow;
