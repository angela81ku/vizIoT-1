'use es6';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import classNames from 'classnames';

const IconContainer = styled.i`
  font-size: ${({ size }) => size}px;
`;

const BIcon = ({ name, size, type, className }) => {
  return (
    <IconContainer
      className={classNames(className, {
        [type]: true,
      })}
      size={size}
    >
      {name}
    </IconContainer>
  );
};

BIcon.defaultProps = {
  size: 16,
  type: 'material-icons',
};

BIcon.propTypes = {
  name: PropTypes.string.isRequired,
  size: PropTypes.number,
  type: PropTypes.string,
};

export default BIcon;
