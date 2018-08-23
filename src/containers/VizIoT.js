'use es6';

import React from 'react';
import PropTypes from 'prop-types';
import keyMirror from 'keymirror';

import TabTitle from '../components/TabTitle';
import AppTime from '../components/AppTime';
import OverviewTab from './OverviewTab';
import BubbleLocationTab from './BubbleLocationTab';
import CoverFlow from 'UIBean/CoverFlow';

import TabRow from 'UIBean/TabRow';
import TabItem from 'UIBean/TabItem';

const tabKeys = keyMirror({
  'OVERVIEW': null,
  'DEVICES': null,
  'GEOGRAPHY': null,
});


const Tabs = {
  [tabKeys.OVERVIEW]: {
    key: tabKeys.OVERVIEW,
    title: 'OVERVIEW',
    background: '',
  },
  [tabKeys.DEVICES]: {
    key: tabKeys.DEVICES,
    title: 'DEVICES',
    background: '',
  },
  [tabKeys.GEOGRAPHY]: {
    key: tabKeys.GEOGRAPHY,
    title: 'GEOGRAPHY',
    background: 'location-bubble-tab-background',
  },
};

const tabOrder = [tabKeys.OVERVIEW, tabKeys.DEVICES, tabKeys.GEOGRAPHY];

class VizIoT extends React.Component {
  state = {
    currentTab: 0,
    showTitle: true,
    scheduler: null,
  };

  getCurrentTabInfo() {
    return Tabs[tabOrder[this.state.currentTab]];
  }

  renderCurrentTab() {
    let currentTabInfo = this.getCurrentTabInfo();
    switch (currentTabInfo.key) {
      case tabKeys.OVERVIEW:
        return <OverviewTab />;
      case tabKeys.DEVICES:
        return <div />;
      case tabKeys.GEOGRAPHY:
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

  renderTitle(title) {
    return <TabTitle subtitle={title} show={this.state.showTitle} />;
  }

  renderTabBar() {
    return (
      <TabRow>
        {
          Object.keys(tabKeys).map(k => {
            const { key } = this.getCurrentTabInfo();
            const { title } = Tabs[k];
            return (
                <TabItem key={k} active={key === k}>{title}</TabItem>);
            }
          )
        }
      </TabRow>
    );
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
    const { key, title, background } = this.getCurrentTabInfo();
    return (
      <div id="rootContainer">
        <div className={`tint-background ${background}`} />
        {this.renderTitle(title)}
        <AppTime />
        <div>
          {this.renderTabBar()}
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
