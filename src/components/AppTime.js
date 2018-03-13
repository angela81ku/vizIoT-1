import React from 'react';
import moment from 'moment';
import Sticky from './BeanUILibrary/Sticky';

class AppTime extends React.Component {
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
      <Sticky className="appTime__wrapper">
        <div className="appTime__logo">
          <i className="material-icons p-right-1">visibility</i>
          <h4>VizIoT</h4>
        </div>
        <div className="appTitle__time m-top-1">
          <h4>{this.state.currentMoment.format('h:mm:ss a')}</h4>
        </div>
      </Sticky>
    );
  }
}

AppTime.propTypes = {};

export default AppTime;
