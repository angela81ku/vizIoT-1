'use es6';

import React from 'react';
import PropTypes from 'prop-types';

const Sticky = ({ children, className }) => (
  <div className={`sticky ${className}`}>{children}</div>
);

Sticky.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default Sticky;
