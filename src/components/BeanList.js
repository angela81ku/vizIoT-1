'use es6';

import React, { Component } from 'react';
import FlipMove from 'react-flip-move';

export default class BeanList extends Component {
  render() {
    const { children, className } = this.props;
    return (
      <FlipMove duration={750} className={className} easing="ease-out">
        {children}
      </FlipMove>
    );
  }
}
