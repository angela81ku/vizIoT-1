import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export default function DataWellTitle({ className, children }) {
  return (
    <div className={classnames('dataWell__title', className)}>{children}</div>
  );
}

DataWellTitle.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};
