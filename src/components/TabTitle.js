import React from 'react';
import PropTypes from 'prop-types';
import Grid from 'UIBean/Grid';

class TabTitle extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {};

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
      <div className={`tabTitle__wrapper ${this.props.show ? 'show' : ''}`}>
        <header
          className={`tabTitle fade ${(this.state.showShadow && 'showShadow') ||
            ''}`}
        >
          <Grid>
            <div className="tabTitle__leftPlaceholder" />
            <div className="tabTitle__title">
              <div>
                <h3>
                  <strong>NETWORK</strong>
                </h3>
              </div>
              <h3>{this.props.subtitle}</h3>
            </div>
            <div className="tabTitle__rightStuff" />
          </Grid>
        </header>
      </div>
    );
  }
}

TabTitle.propTypes = {
  subtitle: PropTypes.string.isRequired,
  show: PropTypes.bool,
};

export default TabTitle;
