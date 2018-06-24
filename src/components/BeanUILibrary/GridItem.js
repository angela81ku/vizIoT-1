'use es6';

import React from 'react';
import classnames from 'classnames';

class GridItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { size, space, className } = this.props;
    const sizingClassNames = Object.entries(size).reduce(
      (result, ting) => {
        return [`col-${ting[0]}-${ting[1]}`, ...result];
      },
      [space]
    );
    // console.log(sizingClassNames)

    const joinedClassNames = classnames(sizingClassNames, {
      [className]: !!className,
    });

    return <div className={joinedClassNames}>{this.props.children}</div>;
  }
}

GridItem.defaultProps = {
  className: '',
  size: { md: 12 },
};

export default GridItem;
