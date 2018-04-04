'use es6';

import React from 'react';
import List from './List';
import ListItem from './ListItem';
import Grid from './BeanUILibrary/Grid';
import TruncateString from './BeanUILibrary/TruncateString';
import moment from 'moment';
import styled from 'styled-components';

const FillHeightOrMore = styled(List)`
  flex: 1;

  display: flex;
  justify-content: center;
  flex-direction: column;
`;

export default ({ hosts }) => {
  const hostItems = hosts.map((host, i) => {
    return (
      <ListItem key={i}>
        <Grid>
          <div className="deviceListItem__deviceInfo">
            <h6 className="deviceListItem__deviceName m-top-1">{host.name}</h6>
            {moment.unix(host.timestamp).format('MMM Do YYYY, h:mm:ss a')}
          </div>
          {/*<div className="deviceListItem__countWrapper flex-center-parent">*/}
          {/*<div>*/}
          {/*<TruncateString className="deviceListItem__count m-right-1">*/}
          {/*/!*{moment.unix(host.timestamp).format('MMM Do YYYY, h:mm:ss a')}*!/*/}
          {/*</TruncateString>*/}
          {/*/!*<span>msg</span>*!/*/}
          {/*</div>*/}
          {/*</div>*/}
        </Grid>
      </ListItem>
    );
  });

  return <FillHeightOrMore>{hostItems}</FillHeightOrMore>;
};
