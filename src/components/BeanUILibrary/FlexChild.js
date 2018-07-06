'use es6';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// TODO, rename to 'Box'

/*
By default, this wraps the content, and does not grow to fit the parent.
 */
const FlexChild = ({
  alignSelf,
  basis,
  grow,
  order,
  shrink,
  children,
  ...props
}) => {
  const StyledDiv = styled.div.attrs({
    style: props => ({
      flexBasis: basis,
      flexGrow: grow,
      flexShrink: shrink,
      order,
      alignSelf,
    }),
  })``;
  return <StyledDiv {...props}>{children}</StyledDiv>;
};

FlexChild.defaultProps = {
  alignSelf: 'auto',
  basis: 'auto',
  grow: 0,
  order: 0,
  shrink: 1,
};

FlexChild.propTypes = {
  children: PropTypes.node,
  alignSelf: PropTypes.oneOf([
    'auto',
    'baseline',
    'center',
    'end',
    'start',
    'stretch',
  ]),
  basis: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  grow: PropTypes.number,
  order: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.oneOf(['inherit', 'initial', 'unset']),
  ]),
  shrink: PropTypes.number,
};

export default FlexChild;
