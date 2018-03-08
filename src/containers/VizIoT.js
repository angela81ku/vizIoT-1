import React from 'react';
import PropTypes from 'prop-types';
import AppTitle from '../components/AppTitle';
import OverviewTab from './OverviewTab';
import BubbleLocationTab from './BubbleLocationTab';
import CoverFlow from '../components/BeanUILibrary/CoverFlow';

const Tabs = {
  OVERVIEW: {
    key: 'OVERVIEW',
    background: '',
  },
  LOCATIONS: {
    key: 'LOCATIONS',
    background: 'location-bubble-tab-background',
  },
};

class VizIoT extends React.Component {
  state = {
    currentTab: Tabs.OVERVIEW,
    showTitle: true,
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

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        showTitle: false,
      });
    }, 3000);
  }

  renderOverlayTitle(key) {
    if (this.state.showTitle) {
      return null;
    }
    return null;
  }

  render() {
    const { key, background } = this.state.currentTab;

    return (
      <div className="">
        {this.renderOverlayTitle(key)}
        <AppTitle subtitle={key} />
        <CoverFlow>
          <div className="tint-background2">
            <div />
          </div>
          <div className={`tint-background ${background}`}>
            <div className="padded-container">
              {this.renderCurrentTab()}

              <div className="large-spacer" />
              <div className="large-spacer" />
              <div className="large-spacer" />
              <div className="large-spacer" />
            </div>
          </div>
        </CoverFlow>
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
