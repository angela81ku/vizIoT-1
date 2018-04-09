import React, { Component } from 'react';
import CardWrapper from './BeanUILibrary/CardWrapper';
import styled from 'styled-components';
import * as theme from '../styles/base/viz-theme';

const Card = styled(CardWrapper)`
  font-size: 1rem;
  
  ${props =>
    props.theme === 'log'
      ? `color: ${theme.OFF_BLACK};`
      : 'color: hsl(220, 20.7%, 55.8%);'}
  
  ${props =>
    props.theme === 'log' &&
    `
    border-top-right-radius: 20px !important;
    border-bottom-right-radius: 20px !important;
    border-bottom-left-radius: 20px !important;
    border-top-left-radius: 8px !important;
  `}  
  
  ${props => (props.theme === 'log' ? 'height: 5.0rem;' : 'height: 8.0rem;')}

  ${props =>
    props.theme === 'log'
      ? 'background-color: white !important;'
      : 'background: inherit;'}
  
  .flex-row {
    justify-content: space-between;
    align-items: center;
    height: 100%;
  }
`;

export default class ListItem extends Component {
  render() {
    const { theme, children } = this.props;
    return (
      <Card className="m-bot-3" noPadding={true} theme={theme}>
        {children}
      </Card>
    );
  }
}
