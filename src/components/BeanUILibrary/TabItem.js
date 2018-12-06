'use es6';

import { Component } from 'react';
import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { BODY_TEXT_COLOR } from 'VizIoT/styles/base/viz-theme';

const TabContainer = styled(NavLink)`
  margin: 0 30px;
`;

const Container = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  width: 100%;

  min-width: 130px;
  height: 70px;
  line-height: 35px;

  font-weight: 500;
  color: ${BODY_TEXT_COLOR};
  ${props =>
    props.active
      ? 'opacity: 1;'
      : 'opacity: 0.35;'} transition: opacity, transform 0.2s;
  transition-timing-function: ease-in-out;

  ${props =>
    !props.active &&
    `
    &:hover {
      opacity: 1;
      cursor: pointer;
      transform: translateY(-4px);
    }
    `};
`;

const Underline = styled.div`
  width: 100px;
  border-top: 1px solid white;
  border-radius: 10px;
  border-bottom: 1px solid white;
  align-self: center;
  margin: -2.5px auto;
`;

const Streak = styled.div`
  margin: 0 auto;
  width: 100%;
  height: 1px;
  background: linear-gradient(
    to right,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.98) 50%,
    rgba(255, 255, 255, 1) 51%,
    rgba(255, 255, 255, 0) 99%,
    rgba(255, 255, 255, 0) 100%
  );
  opacity: 0.3;
`;

export default class TabItem extends Component {
  render() {
    const { active, hover, to, children, ...rest } = this.props;
    return (
      <TabContainer to={to} {...rest}>
        {active && <Streak />}
        <Container active={active} hover={hover}>
          {children}
        </Container>
        {active && <Streak />}
      </TabContainer>
    );
  }
}

TabItem.defaultProps = {
  active: false,
  hover: false,
  to: '/',
};

TabItem.propTypes = {
  children: PropTypes.any,
  active: PropTypes.bool,
  hover: PropTypes.bool,
  to: PropTypes.string.isRequired,
};
