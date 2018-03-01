import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class FlexWrapper extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      className,
      children,
    } = this.props;

    return <div className={classnames('flexWrapper', className)}>{children}</div>;
  }
}

FlexWrapper.propTypes = {
  className: PropTypes.string,
};

export default FlexWrapper;
