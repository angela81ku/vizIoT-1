import React from 'react';
import PropTypes from 'prop-types';
import Grid from './BeanUILibrary/Grid';
import moment from 'moment';

class AppTitle extends React.Component {
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
    this.setState(() => ({
      showShadow: scrollTop > 20,
    }));
  };

  componentDidMount() {
    this.interval = setInterval(this.updateTime, 1000);
    window.addEventListener('scroll', this.handleScroll);
  }

  render() {
    return (
      <header
        className={`appTitle fade ${(this.state.showShadow && 'showShadow') ||
          ''}`}
      >
        <Grid>
          <div className="appTitle__pageTitle">
            <div>
              <h3>
                <strong>NETWORK</strong>
              </h3>
            </div>
            <h3>{this.props.subtitle}</h3>
          </div>
          <div className="appTitle__centerPlaceholder" />
          <div className="appTitle__rightStuff">
            <div className="appTitle__logo">
              <i className="material-icons">visibility</i>
              <h1>VizIoT</h1>
            </div>

            <div className="appTitle__time m-top-1">
              <h4>{this.state.currentMoment.format('h:mm:ss a')}</h4>
            </div>
          </div>
        </Grid>
      </header>
    );
  }
}

AppTitle.propTypes = {
  subtitle: PropTypes.string.isRequired,
};

export default AppTitle;
