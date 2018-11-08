'use es6';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import classNames from 'classnames';

const IconContainer = styled.i`
  font-size: ${({ size }) => size}px;
  font-weight: ${({ weight }) => weight};
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  fill: white;
`;

class BIcon extends Component {
  render() {
    const { name, size, weight, type, className } = this.props;
    let newProp = { 'data-eva': name };
    if (type !== 'eva') {
      newProp = {};
    }

    return (
      <IconContainer
        {...newProp}
        className={classNames(className, {
          [type]: true,
          [name]: type === 'fas',
        })}
        size={size}
        weight={weight}
      >
        {name}
      </IconContainer>
    );
  }


  componentDidMount() {
    eva.replace();
  }
}

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
