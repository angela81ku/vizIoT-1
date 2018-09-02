'use es6';

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { CARD_COLOR, LIGHTER_COLOR, LIGHTER_COLOR_TRANS } from 'VizIoT/styles/base/viz-theme';
import { withClickable } from 'UIBean/CommonHOC';

export const ButtonShapes = {
  ICON: 'ICON',
  RECT: 'RECT',
};

const ButtonShapesList = Object.keys(ButtonShapes);

const shapeToRadius = (shape) => {
  if (shape === ButtonShapes.ICON) {
    return '50%';
  } else {
    return '1rem';
  }
};

const BButtonWrapper = styled.button`
  display: inline-block;
  width: fit-content;
  padding: 6px;

  background: ${CARD_COLOR};
  color: white;
  border: none;
  border-radius: ${({ shape }) => shapeToRadius(shape)};

  &:hover {
    background: ${LIGHTER_COLOR_TRANS};
  }

  &:active {
    background: ${LIGHTER_COLOR};
  }
`;

const BButton = ({ shape, ...rest }) => {
  return (
    <BButtonWrapper type="button" shape={shape} {...rest} />
  );
};

BButton.defaultProps = {
  shape: ButtonShapes.ICON,
};

BButton.propTypes = {
  shape: PropTypes.oneOf(ButtonShapesList),
};

export default withClickable(BButton);
