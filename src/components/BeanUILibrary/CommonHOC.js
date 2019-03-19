'use es6';

import React from 'react';
import PropTypes from 'prop-types';
import { identity } from 'ramda';

export const withClickable = BaseComponent => {
  const ClickableWrapper = ({ onClick, ...rest }) => {
    return <BaseComponent onClick={onClick} {...rest} />;
  };

  ClickableWrapper.defaultProps = {
    onClick: identity,
  };

  ClickableWrapper.propTypes = {
    onClick: PropTypes.func,
    rest: PropTypes.any,
  };

  return ClickableWrapper;
};
