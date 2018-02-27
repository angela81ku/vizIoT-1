import React from 'react';
import PropTypes from 'prop-types';
import AppTitle from '../components/AppTitle';
import OverviewTab from './OverviewTab';
import BubbleLocationTab from './BubbleLocationTab';

class VizIoT extends React.Component {
  renderCurrentTab() {
    return <BubbleLocationTab />;
  }

  render() {
    return (
      <div className="">
        <div className="tint-background">
          <div className="padded-container">
            <div className="medium-spacer" />
            <AppTitle />
            <div className="small-spacer" />

            {this.renderCurrentTab()}

            <div className="large-spacer" />
            <div className="large-spacer" />
            <div className="large-spacer" />
            <div className="large-spacer" />
            <div className="large-spacer" />
            <div className="large-spacer" />
            <div className="large-spacer" />
            <div className="large-spacer" />
          </div>
        </div>
      </div>
    );
  }
}

VizIoT.defaultProps = {
  appConfig: {
    networkId: 42,
  },
};

VizIoT.propTypes = {
  appConfig: PropTypes.object,
};

export default VizIoT;
