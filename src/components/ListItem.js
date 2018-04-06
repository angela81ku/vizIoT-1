import React, { Component } from 'react';
import CardWrapper from './BeanUILibrary/CardWrapper';
import styled from 'styled-components';

const Card = styled(CardWrapper)`
  font-size: 1rem;
  ${props =>
    props.theme === 'log'
      ? 'height: 5.0rem'
      : 'height: 8.0rem;'} color: $lighter-color;
`;

export default class ListItem extends Component {
  render() {
    const { theme, children } = this.props;
    return (
      <Card
        className="deviceListItem__wrapper m-bot-3"
        noPadding={true}
        theme={theme}
      >
        {children}
      </Card>
    );
  }
}
