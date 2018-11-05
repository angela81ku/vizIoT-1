'use es6';

import React from 'react';
import moment from 'moment';
import styled from 'styled-components';
import Flex, { JustifyContent } from 'UIBean/Flex';
import FlexChild from 'UIBean/FlexChild';
import BIcon from 'UIBean/BIcon';
import TypographyComponent from 'UIBean/TypographyComponent';
const { H3 } = TypographyComponent;

const Background = styled.div`
  z-index: 0;
  width: 100%;
  height: 150px;
  padding: 0 6%;
`;
const Ting = styled.div`
  // background: rgba(15, 43, 64, 0.78);
  // border-bottom: 1px solid #7e89a6;
  text-shadow: #67e5ff 0px 0px 40px;
  // border: 2px solid #0f3b5c;
  width: 100%;
  height: 100%;
`;

const ClockText = styled(H3)`
  font-weight: lighter;
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
        <Ting>
          <Flex alignItems={JustifyContent.CENTER}
                justifyContent={JustifyContent.SPACE_BETWEEN}
                fillAll>
            <FlexChild className="appTime__wrapper m-left-5">
              <div className="appTime__logo">
                <BIcon className="p-right-3" name="visibility" />
                <H3 className="appTime__text">VizIoT</H3>
              </div>
            </FlexChild>
            {this.props.children}
            <FlexChild className="m-right-12">
              <ClockText>
                {this.state.currentMoment.format('h:mm:ss a').toUpperCase()}
                </ClockText>
            </FlexChild>
          </Flex>
        </Ting>
      </Background>
    );
  }
}

AppMenuBar.propTypes = {};

export default AppMenuBar;
