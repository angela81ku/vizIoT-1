'use es6';

import React from 'react';
import List from './List';
import ListItem from './ListItem';
import Grid from './BeanUILibrary/Grid';
import TruncateString from './BeanUILibrary/TruncateString';
import moment from 'moment';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const FillHeightOrMore = styled(List)`
  flex: 1;

  display: flex;
  justify-content: center;
  flex-direction: column;

  .flex-row {
    justify-content: space-between;
    align-items: center;
    height: 100%;
  }
`;

const HostList = ({ hosts }) => {
  const hostItems = hosts.map((host, i) => {
    return (
      <ListItem key={i} theme={'log'}>
        <Grid>
          <div className="deviceListItem__deviceInfo">
            <h6 className="deviceListItem__deviceName m-top-1">{host.name}</h6>
            {moment.unix(host.timestamp).format('h:mm:ss a')}
          </div>
          <div className="deviceListItem__countWrapper flex-center-parent">
            <div>
              <TruncateString className="deviceListItem__count m-right-1">
                {moment.unix(host.timestamp).format('h:mm:ss')}
              </TruncateString>
              {/*<span>msg</span>*/}
            </div>
          </div>
        </Grid>
      </ListItem>
    );
  });

  return <FillHeightOrMore>{hostItems}</FillHeightOrMore>;
};

HostList.defaultProps = { hosts: [] };
HostList.propType = {
  hosts: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
};

export default HostList;
