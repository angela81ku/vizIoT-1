'use es6';

import React, {useCallback, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  ACTIVE_FILL_COLOR,
  CARD_COLOR, HOVER_FILL_COLOR, TRON,
} from 'VizIoT/styles/base/viz-theme';
import {withClickable} from 'UIBean/CommonHOC';
import {useInputValue} from 'UIBean/hooks/useInputValue';

const CheckboxContainer = styled.label`
  display: ${({inline}) => inline ? 'inline-flex' : 'flex'};
  flex-direction: row;
  position: relative;
  justify-content: center;
  align-items: center;
  width: fit-content;
  padding-top: 12px;
  padding-bottom: 12px;
  padding-left: 40px;
  padding-right: 16px;

  background: ${CARD_COLOR};
  color: ${({isChecked}) => isChecked ? TRON : 'white'};
  ${
  ({isChecked}) => isChecked
    ? `border: solid ${TRON} 1px;`
    : 'border: solid #ffffff21 1px;'
};
  border-radius: 4rem;
  transition: background 0.2s;

  &:hover {
    background: ${HOVER_FILL_COLOR};
    border-color: ${TRON};
    color: ${TRON};
  }

  &:active {
    background: ${ACTIVE_FILL_COLOR};
    color: ${TRON};
  }
  
  & > input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }
  
  &:hover input ~ .checkmark {
      border: 3px solid ${TRON}; 

    // background-color: ${TRON};
  }
  
  & input:checked ~ .checkmark {
    // background-color: ${TRON};
    border: 3px solid ${TRON}; 
  }
  
  & input:checked ~ .checkmark:after {
    display: block;
  }
  
`;

const Checkmark = styled.span`
  position: absolute;
  left: 12px;
  height: 20px;
  width: 20px;
  border-radius: 50%;
  border: 3px solid white; 
  
  &:after {
    content: "";
    position: absolute;
    display: none;
  }
  
  &:after {
    left: 2px;
    top: 2px;
    width: 10px;
    height: 10px
    border-radius: 50%;
    background-color: ${TRON};

    // left: 5px;
    // top: 0px;
    // width: 5px;
    // height: 10px;
    // border: solid white;
    // border-width: 0 3px 3px 0;
    // -webkit-transform: rotate(45deg);
    // -ms-transform: rotate(45deg);
    // transform: rotate(45deg);
  }

`;

const BCheckBox = ({onChange, title, ...rest}) => {

  const inputProps = useInputValue(false, onChange);
  const value = inputProps.value;

  return (
    <CheckboxContainer isChecked={value} {...rest}>
      <input type="checkbox" {...inputProps} />
      <Checkmark className="checkmark"/>
      {title}
    </CheckboxContainer>
  );
};

BCheckBox.defaultProps = {
  onChange: () => {
  },
  title: 'Checkbox',
  inline: false,
};

BCheckBox.propTypes = {
  onChange: PropTypes.func,
  title: PropTypes.string,
  inline: PropTypes.bool,
};

export default withClickable(BCheckBox);
