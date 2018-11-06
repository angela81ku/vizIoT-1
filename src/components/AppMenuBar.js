'use es6';

import React from 'react';
import moment from 'moment';
import styled from 'styled-components';
import Flex, { JustifyContent } from 'UIBean/Flex';
import FlexChild from 'UIBean/FlexChild';
import BIcon from 'UIBean/BIcon';
import TypographyComponent from 'UIBean/TypographyComponent';
import TabItem from 'UIBean/TabItem';
import TabRow from 'UIBean/TabRow';
const { H3 } = TypographyComponent;
import { tabKeys, Tabs } from 'VizIoT/constants/TabNavigation';
import { _hideWhen } from 'VizIoT/styles/base/styled-component-mixins/layout';
import { ScreenSizes } from 'UIBean/Breakpoints';

const Background = styled(Flex)`
  width: 100%;
  height: 150px;
  padding: 0 6%;
  text-shadow: #67e5ff 0px 0px 40px;
`;

const LogoText = styled(H3)`
  font-weight: 400;
  text-align: left;
  display: inline-flex;
`;

const ClockText = styled(H3)`
  font-weight: lighter;
  text-align: right;
`;

const TabRowStyled = styled(TabRow)`
  ${_hideWhen(ScreenSizes.sm)}
`;

const getTabByPath = path => {
  const key = Object.keys(tabKeys).filter(k => Tabs[k].path === path);
  return Tabs[key];
};

class AppMenuBar extends React.Component {
  state = {
    currentMoment: moment(),
  };

  componentWillUnmount() {
    clearInterval(this.interval);
    window.removeEventListener('scroll', this.handleScroll);
  }

  updateTime = () => {
    this.setState(() => ({ currentMoment: moment() }));
  };

  handleScroll = event => {
    let scrollTop = window.scrollY;
  };

  componentDidMount() {
    this.interval = setInterval(this.updateTime, 1000);
    window.addEventListener('scroll', this.handleScroll);
  }

  render() {

    const { key } = getTabByPath(this.props.location.pathname) || {};

    return (
      <Background alignItems={JustifyContent.CENTER}
                  justifyContent={JustifyContent.SPACE_BETWEEN}
                  fillAll>
          <FlexChild grow={2}>
            <LogoText className="appTime__logo">
              <BIcon className="p-right-3" size={25} name="visibility" />
              <span>VizIoT</span>
            </LogoText>
          </FlexChild>
          <TabRowStyled>
            {Object.keys(tabKeys).map(k => {
              const { title, path } = Tabs[k];
              return (
                <TabItem key={k} active={key === k} to={path}>
                  {title}
                </TabItem>
              );
            })}
          </TabRowStyled>
          <FlexChild grow={2}>
            <ClockText>
              {this.state.currentMoment.format('h:mm:ss a').toUpperCase()}
              </ClockText>
          </FlexChild>
      </Background>
    );
  }
}

AppMenuBar.propTypes = {};

export default AppMenuBar;
