import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class DataWellValue extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { className, children } = this.props;
    return (
      <div className={classnames('dataWell__value', className)}>
        {children}
      </div>
    );
  }
}

DataWellValue.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

export default DataWellValue;
