'use es6';

import React from 'react';
import PropTypes from 'prop-types';

export const withClickable = BaseComponent => {
  const ClickableWrapper = ({ onClick, ...rest }) => {
    return <BaseComponent onClick={onClick} {...rest} />;
  };

  ClickableWrapper.propTypes = {
    onClick: PropTypes.func.isRequired,
    rest: PropTypes.any,
  };

  return ClickableWrapper;
};
