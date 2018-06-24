'use es6';

import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class DataWell extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { className, children } = this.props;
    return (
      <li className={classnames('dataWell', className)}>
        <div className="dataWell__inner">{children}</div>
      </li>
    );
  }
}

DataWell.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

export default DataWell;
