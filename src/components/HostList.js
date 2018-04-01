'use es6';

import React from 'react';
import List from './List';
import ListItem from './ListItem';
import Grid from './BeanUILibrary/Grid';
import TruncateString from './BeanUILibrary/TruncateString';

export default ({ hosts }) => {
  const hostItems = hosts
    .sort((a, b) => {
      return b.lastSeen.unix() - a.lastSeen.unix();
    })
    .map(host => {
      return (
        <ListItem key={host.name}>
          <Grid>
            <div className="deviceListItem__deviceInfo">
              <h6 className="deviceListItem__deviceName m-top-1">
                {host.name}
              </h6>
            </div>
            <div className="deviceListItem__countWrapper flex-center-parent">
              <div>
                <TruncateString className="deviceListItem__count m-right-1">
                  {10}
                </TruncateString>
                <span>msg</span>
              </div>
            </div>
          </Grid>
        </ListItem>
      );
    });

  return <List>{hostItems}</List>;
};
