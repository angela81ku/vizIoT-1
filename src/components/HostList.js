'use es6';

import React from 'react';
import List from './List';
import ListItem from './ListItem';
import Grid from './BeanUILibrary/Grid';
import TruncateString from './BeanUILibrary/TruncateString';
import moment from 'moment';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import * as theme from '../styles/base/viz-theme';

const FillHeightOrMore = styled(List)`
  flex: 1;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: left;

  .flex-row {
    justify-content: space-between;
    align-items: center;
    height: 100%;
  }
`;

const LeftWrapper = styled.div`
  padding: 0 0 0 17px;
  text-wrap: normal;
`;

const Content = styled.div`
  font-size: 1rem;
  color: ${theme.OFF_BLACK};
`;

const RightWrapper = styled.div`
  height: 100%;
  padding-left: 17px;
  padding-right: 17px;
  flex-direction: column;
  flex-shrink: 0;
  align-items: flex-start;
  color: ${theme.LIGHTER_COLOR};
`;

const SmallCopy = styled.span`
  font-size: 1.1rem;
`;

const HostList = ({ hosts }) => {
  const hostItems = hosts.map((host, i) => {
    return (
      <ListItem key={host.timestamp + host.name} theme={'log'}>
        <Grid>
          <LeftWrapper>
            <SmallCopy>{host.origin || 'Unknown origin'}</SmallCopy>
            <Content className="m-top-1">{host.name}</Content>
          </LeftWrapper>
          <RightWrapper className="flex-center-parent">
            <div>
              <TruncateString className="deviceListItem__count m-right-1">
                {moment.unix(host.timestamp).format('h:mm:ss')}
              </TruncateString>
              {/*<span>msg</span>*/}
            </div>
          </RightWrapper>
        </Grid>
      </ListItem>
    );
  });

  return <FillHeightOrMore>{hostItems}</FillHeightOrMore>;
};

HostList.defaultProps = { hosts: [] };
HostList.propType = {
  hosts: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      timestamp: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
};

export default HostList;
