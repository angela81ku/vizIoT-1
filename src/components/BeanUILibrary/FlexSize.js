'use es6';

import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const toSizeClasses = size => {
  return Object.entries(size).reduce((result, ting) => {
    return [`col-${ting[0]}-${ting[1]}`, ...result];
  }, []);
};

class FlexSize extends React.Component {
  render() {
    const { size, space, className, children } = this.props;
    const joinedClassNames = classnames(toSizeClasses(size).concat(space), {
      [className]: !!className,
      [space]: !!space,
    });

    return <div className={joinedClassNames}>{children}</div>;
  }
}

FlexSize.propTypes = {
  size: PropTypes.object,
  padding: PropTypes.bool,
};

FlexSize.defaultProps = {
  className: null,
  size: { md: 12 },
  padding: true,
};

export default FlexSize;
