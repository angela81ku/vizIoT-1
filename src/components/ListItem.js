import React, { Component } from 'react';
import CardWrapper from './BeanUILibrary/CardWrapper';

export default class ListItem extends Component {
  render() {
    const { children } = this.props;
    return (
      <CardWrapper className="deviceListItem__wrapper m-bot-3" noPadding={true}>
        {children}
      </CardWrapper>
    );
  }
}
