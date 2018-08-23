'use es6';

import { Component } from 'react';
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { BODY_TEXT_COLOR } from 'VizIoT/styles/base/viz-theme';
import TypographyComponent from 'UIBean/TypographyComponent';

const { H3 } = TypographyComponent;

const TabContainer = styled.div`
  margin: 0 30px;
`;

const Container = styled(H3)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  
  width: 100%;
  
  min-width: 130px;
  height: 70px;
  line-height: 35px;
  
  font-family: ${'DINCondensed-Bold'};
  font-weight: 500;
  letter-spacing: 2.2px;
  color: ${BODY_TEXT_COLOR};
  ${props => props.active ? 'opacity: 1;': 'opacity: 0.50;'}
  
  transition: opacity, transform 0.2s;
  transition-timing-function: ease-in-out;
  
  ${props => !props.active && 
    `
    &:hover {
      opacity: 1;
      cursor: pointer;
      transform: translateY(-4px);
    }
    ` 
  }
`;

const Underline = styled.div`
  width: 100px;
  border-top: 2px solid white;
  border-radius: 10px;
  border-bottom: 2px solid white;
  align-self: center;
  margin: -2.5px auto;
`;


export default class TabItem extends Component {
  render() {
    const { active, hover, children } = this.props;
    return (
      <TabContainer>
        <Container active={active} hover={hover}>
          {children}
        </Container>
        { active && <Underline /> }
      </TabContainer>
    );
  }
}

TabItem.defaultProps = {
  active: false,
  hover: false
};

TabItem.propTypes = {
  children: PropTypes.any,
  active: PropTypes.bool,
  hover: PropTypes.bool,
};