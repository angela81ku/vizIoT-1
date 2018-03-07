import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export default function DataWellTitle({ className, children }) {
  return (
    <span className={classnames('dataWell__title', className)}>{children}</span>
  );
}

DataWellTitle.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};
