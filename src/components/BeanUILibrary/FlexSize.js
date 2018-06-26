'use es6';

import React from 'react';
import classnames from 'classnames';

const toSizeClasses = size => {
  return Object.entries(size).reduce((result, ting) => {
    return [`col-${ting[0]}-${ting[1]}`, ...result];
  }, []);
};

class FlexSize extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { size, space, className, padding, children } = this.props;
    const joinedClassNames = classnames(toSizeClasses(size).concat(space), {
      [className]: !!className,
      noPadding: !padding,
    });

    return <div className={joinedClassNames}>{children}</div>;
  }
}

FlexSize.defaultProps = {
  className: null,
  size: { md: 12 },
  padding: true,
};

export default FlexSize;
