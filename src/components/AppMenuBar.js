'use es6';

import React from 'react';
import moment from 'moment';
import Sticky from 'UIBean/Sticky';
import styled from 'styled-components';
import Flex, { JustifyContent } from 'UIBean/Flex';
import FlexChild from 'UIBean/FlexChild';
import BIcon from 'UIBean/BIcon';

const Background = styled(Sticky)`
  top: 0;
  z-index: 0;
  width: 100%;
  height: 60px;
  background: #3a446188;
  border-bottom: 1px solid #7e89a6;
`;

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
    return (
      <Background>
      <Flex alignItems={JustifyContent.CENTER}
            justifyContent={JustifyContent.SPACE_BETWEEN}
            fillAll>
        <FlexChild className="appTime__wrapper m-left-12">
          <div className="appTime__logo p-right-1">
            <BIcon className="p-right-1" name="visibility" />
            <span className="appTime__text">VizIoT</span>
          </div>
        </FlexChild>
        <FlexChild className="m-right-12">
          {this.state.currentMoment.format('h:mm:ss a').toUpperCase()}
        </FlexChild>
      </Flex>
      </Background>
    );
  }
}

AppMenuBar.propTypes = {};

export default AppMenuBar;
