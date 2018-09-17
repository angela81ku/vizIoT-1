'use es6';

import styled from 'styled-components';
import React from 'react';
import AppMenuBar from 'VizIoT/components/AppMenuBar';
import TabItem from 'UIBean/TabItem';
import TabRow from 'UIBean/TabRow';
import { tabKeys, Tabs } from 'VizIoT/constants/TabNavigation';
import Sticky from 'UIBean/Sticky';

const Container = styled.div`
  position: relative;
  width: 100vw;
  z-index: 3;
`;

const NavItemsContainer = styled(TabRow)`
  height: 140px;
`;

const getTabByPath = path => {
  const key = Object.keys(tabKeys).filter(k => Tabs[k].path === path);
  return Tabs[key];
};

const Shadow = styled(Sticky)`
  top: 0;
  z-index: 0;
  width: 100%;
  height: 120px;
  background: linear-gradient(
    to bottom,
    rgba(6, 15, 23, 0.82) 19%,
    rgba(52, 64, 96, 0) 83%
  );
`;

export default ({ location }) => {
  const { key } = getTabByPath(location.pathname) || {};

  return (
    <Container>
      <Shadow />
      <AppMenuBar />
      <NavItemsContainer>
        {Object.keys(tabKeys).map(k => {
          const { title, path } = Tabs[k];
          return (
            <TabItem key={k} active={key === k} to={path}>
              {title}
            </TabItem>
          );
        })}
      </NavItemsContainer>
    </Container>
  );
};
