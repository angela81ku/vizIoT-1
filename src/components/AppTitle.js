import React from 'react';
import PropTypes from 'prop-types';
import Grid from './BeanUILibrary/Grid';
import moment from 'moment';

class AppTitle extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {}

  componentWillUnmount() {
    clearInterval(this.interval);
    window.removeEventListener('scroll', this.handleScroll);
  }

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
      <div className="appTitle__wrapper">
        <header
          className={`appTitle fade ${(this.state.showShadow && 'showShadow') ||
            ''}`}
        >
          <Grid>
            <div className="appTitle__leftPlaceholder" />
            <div className="appTitle__title">
              <div>
                <h3>
                  <strong>NETWORK</strong>
                </h3>
              </div>
              <h3>{this.props.subtitle}</h3>
            </div>
            <div className="appTitle__rightStuff">
            </div>
          </Grid>
        </header>
      </div>
    );
  }
}

AppTitle.propTypes = {
  subtitle: PropTypes.string.isRequired,
};

export default AppTitle;
