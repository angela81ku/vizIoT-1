'ues es6';

import React, {Component} from 'react';
import styled from 'styled-components';

const NoBulletListItem = styled.li`
  list-style-type: none;
`;

export default class ListItem extends Component {
  render() {
    const {children} = this.props;
    return <NoBulletListItem className="m-bot-3">{children}</NoBulletListItem>;
  }
}
