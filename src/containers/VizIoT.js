'use es6';

import React from 'react';
import PropTypes from 'prop-types';
import keyMirror from 'keymirror';
import {
  Switch,
  Route,
  Link,
  Redirect
} from 'react-router-dom';


import TabTitle from '../components/TabTitle';
import AppTime from '../components/AppTime';
import OverviewTab from './OverviewTab';
import BubbleLocationTab from './BubbleLocationTab';
import CoverFlow from 'UIBean/CoverFlow';

import TabRow from 'UIBean/TabRow';
import TabItem from 'UIBean/TabItem';
import DeviceOverview from 'VizIoT/containers/DeviceOverview';

const tabKeys = keyMirror({
  'OVERVIEW': null,
  'DEVICES': null,
  'GEOGRAPHY': null,
});

const Tabs = {
  [tabKeys.OVERVIEW]: {
    key: tabKeys.OVERVIEW,
    title: 'OVERVIEW',
    path: '/overview',
    background: '',
  },
  [tabKeys.DEVICES]: {
    key: tabKeys.DEVICES,
    title: 'DEVICES',
    path: '/devices',
    background: '',
  },
  [tabKeys.GEOGRAPHY]: {
    key: tabKeys.GEOGRAPHY,
    title: 'GEOGRAPHY',
    path: '/geography',
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

  getTabByPath(path) {
    const currentKey = Object.keys(tabKeys).filter(k => Tabs[k].path === path);
    return Tabs[currentKey];
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
            const { key } = this.getTabByPath(this.props.location.pathname) || {};
            const { title, path } = Tabs[k];

            return (
                <TabItem
                  key={k}
                  active={key === k}
                  to={path}
                >
                  {title}
                </TabItem>);
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
    const { location } = this.props;
    const maybeTab = this.getTabByPath(location.pathname);
    const { title, background} = maybeTab || {};

    return (
      <div id="rootContainer">
        <div className={`tint-background ${background && background}`} />
        {title && this.renderTitle(title)}
        <AppTime />
        <div>
          {this.renderTabBar()}
          <CoverFlow
            location={location.key}
            onLeft={this.handleLeftArrow}
            onRight={this.handleRightArrow}
          >
            <div key={location.key}>
              <div className="padded-container">
                <Switch location={location}>
                  <Route exact path='/' component={OverviewTab} />
                  <Route path={`${Tabs[tabKeys.OVERVIEW].path}`} component={OverviewTab} />
                  <Route exact path={`${Tabs[tabKeys.DEVICES].path}`} component={DeviceOverview} />
                  <Route exact path={`${Tabs[tabKeys.GEOGRAPHY].path}`} component={BubbleLocationTab} />
                  <Route render={() => <div>Not Found</div>} />
                </Switch>
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
