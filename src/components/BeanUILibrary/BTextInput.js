'use es6';

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  ACTIVE_FILL_COLOR,
  CARD_COLOR, HOVER_FILL_COLOR,
} from 'VizIoT/styles/base/viz-theme';
import { withClickable } from 'UIBean/CommonHOC';
import { useInputValue } from 'UIBean/hooks/useInputValue';

const StyledInput = styled.input`
  display: ${({ inline }) => inline ? 'inline-flex' : 'flex'};
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: fit-content;
  padding: 12px 16px;

  background: ${CARD_COLOR};
  color: white;
  border: solid #ffffff21 1px;
  border-radius: 4rem;
  transition: background 0.2s;

  &:hover {
    background: ${HOVER_FILL_COLOR};
    border-color: white;
  }

  &:active {
    background: ${ACTIVE_FILL_COLOR};
  }
`;

const BTextInput = ({ onChange, ...rest }) => {

  const inputProps = useInputValue('', onChange);

  return (
    <StyledInput
      type="text"
      {...inputProps}
      {...rest}
    />
  );
};

BTextInput.defaultProps = {
  placeholder: 'enter text here',
  onChange: () => {},
  inline: false,
};

BTextInput.propTypes = {
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  inline: PropTypes.bool,
};

export default withClickable(BTextInput);
