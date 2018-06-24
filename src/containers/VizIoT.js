import React from 'react';
import PropTypes from 'prop-types';
import TabTitle from '../components/TabTitle';
import AppTime from '../components/AppTime';
import OverviewTab from './OverviewTab';
import BubbleLocationTab from './BubbleLocationTab';
import CoverFlow from 'UIBean/CoverFlow';

const Tabs = {
  OVERVIEW: {
    key: 'OVERVIEW',
    background: '',
  },
  LOCATIONS: {
    key: 'GEOGRAPHY',
    background: 'location-bubble-tab-background',
  },
};

const tabOrder = [Tabs.OVERVIEW, Tabs.LOCATIONS];
class VizIoT extends React.Component {
  state = {
    currentTab: 0,
    showTitle: true,
    scheduler: null,
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

  scheduleHideTitle = () => {
    const { scheduler } = this.state;
    scheduler && clearTimeout(scheduler);

    this.setState(() => ({
      scheduler: setTimeout(() => {
        this.setState({
          showTitle: false,
        });
      }, 6000),
    }));
  };

  componentDidMount() {
    this.scheduleHideTitle();
  }

  renderTitle(key) {
    return <TabTitle subtitle={key} show={this.state.showTitle} />;
  }

  handleLeftArrow = () => {
    this.setState(({ currentTab }) => ({
      currentTab: --currentTab < 0 ? tabOrder.length - 1 : currentTab,
      showTitle: true,
      scheduler: null,
    }));
    this.scheduleHideTitle();
  };

  handleRightArrow = () => {
    this.setState(({ currentTab, scheduler }) => ({
      currentTab: ++currentTab % tabOrder.length,
      showTitle: true,
      scheduler: null,
    }));
    this.scheduleHideTitle();
  };

  render() {
    const { key, background } = this.getCurrentTabInfo();
    return (
      <div>
        {this.renderTitle(key)}
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
