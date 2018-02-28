import React from 'react';
import PropTypes from 'prop-types';
import AppTitle from '../components/AppTitle';
import OverviewTab from './OverviewTab';
import BubbleLocationTab from './BubbleLocationTab';

const Tabs = {
  OVERVIEW: 'OVERVIEW',
  LOCATIONS: 'LOCATIONS',
};

class VizIoT extends React.Component {
  state = {
    currentTab: Tabs.LOCATIONS,
  };

  renderCurrentTab() {
    switch (this.state.currentTab) {
      case Tabs.OVERVIEW:
        return <OverviewTab />;
      case Tabs.LOCATIONS:
        return <BubbleLocationTab />;
    }
    return <OverviewTab />;
  }

  render() {
    return (
      <div className="">
        <AppTitle subtitle={this.state.currentTab} />

        <div className="tint-background">
          <div className="padded-container">
            <div className="large-spacer" />
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
