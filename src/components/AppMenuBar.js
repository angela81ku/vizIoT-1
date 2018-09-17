'use es6';

import React from 'react';
import moment from 'moment';
import Sticky from 'UIBean/Sticky';
import styled from 'styled-components';

const TimeContainer = styled(Sticky)`
  top: 15px;
  right: 15px;
  margin: 0;
`;

class AppMenuBar extends React.Component {
  constructor(props) {
    super(props);
  }

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
      <div>
        <Sticky className="appTime__wrapper">
          <div className="appTime__logo p-right-1">
            <i className="material-icons p-right-1">visibility</i>
            <span className="appTime__text">VizIoT</span>
          </div>
        </Sticky>
        <TimeContainer>
          <span>{this.state.currentMoment.format('h:mm:ss a')}</span>
        </TimeContainer>
      </div>
    );
  }
}

AppMenuBar.propTypes = {};

export default AppMenuBar;
