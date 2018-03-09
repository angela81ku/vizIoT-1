import React from 'react';
import PropTypes from 'prop-types';
import AppTitle from '../components/AppTitle';
import AppTime from '../components/AppTime';
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

const tabOrder = [Tabs.OVERVIEW, Tabs.LOCATIONS];
class VizIoT extends React.Component {
  state = {
    currentTab: 0,
    showTitle: true,
  };

  getCurrentTabInfo() {
    return tabOrder[this.state.currentTab];
  }

  renderCurrentTab() {
    let currentTabInfo = this.getCurrentTabInfo();
    switch (currentTabInfo) {
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

  handleLeftArrow = () => {
    this.setState(({ currentTab }) => ({
      currentTab: --currentTab % tabOrder.length,
    }));
  };

  handleRightArrow = () => {
    this.setState(({ currentTab }) => ({
      currentTab: ++currentTab % tabOrder.length,
    }));
  };

  render() {
    const { key, background } = this.getCurrentTabInfo();

    console.log(key);
    return (
      <div className="">
        {this.renderOverlayTitle(key)}
        <AppTitle subtitle={key} />
        <AppTime />
        <div className={`tint-background ${background}`}>
          <CoverFlow
            onLeft={this.handleLeftArrow}
            onRight={this.handleRightArrow}
          >
            <div key={key}>
              <div className="padded-container">
                {this.renderCurrentTab()}
                <div className="large-spacer" />
                <div className="large-spacer" />
                <div className="large-spacer" />
              </div>
            </div>
          </CoverFlow>
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
