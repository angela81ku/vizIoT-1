import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export default function DataWellTitle({ className, children, fontSize }) {
  if (fontSize) {
    return (
      <div style={{fontSize: fontSize}} className={classnames('dataWell__title', className)}>{children}</div>
    );
  } else {
    return (
      <div className={classnames('dataWell__title', className)}>{children}</div>
    )
  }
}

DataWellTitle.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  fontSize: PropTypes.string,
};
