'use es6';

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import classNames from 'classnames';

const IconContainer = styled.i`
  font-size: ${({ size }) => size}px;
  font-weight: ${({ weight }) => weight};
`;

const BIcon = ({ name, size, weight, type, className }) => {
  return (
    <IconContainer
      className={classNames(className, {
        [type]: true,
      })}
      size={size}
      weight={weight}
    >
      {name}
    </IconContainer>
  );
};

BIcon.defaultProps = {
  size: 16,
  weight: 400,
  type: 'material-icons',
};

BIcon.propTypes = {
  name: PropTypes.string.isRequired,
  size: PropTypes.number,
  type: PropTypes.string,
  weight: PropTypes.number,
};

export default BIcon;
