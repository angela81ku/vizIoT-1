'use es6';

import React from 'react';
import PropTypes from 'prop-types';
import keyMirror from 'keymirror';
import {
  Redirect,
  Switch,
  Route,
} from 'react-router-dom';


import TabTitle from '../components/TabTitle';
import AppTime from '../components/AppTime';
import OverviewTab from './OverviewTab';
import BubbleLocationTab from './BubbleLocationTab';
import CoverFlow from 'UIBean/CoverFlow';

import TabRow from 'UIBean/TabRow';
import TabItem from 'UIBean/TabItem';
import DeviceOverview from 'VizIoT/containers/DeviceOverview';
import NotFoundPage from 'VizIoT/containers/NotFoundPage';

const tabKeys = keyMirror({
  'OVERVIEW': null,
  'DEVICES': null,
  'TIME': null,
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
  [tabKeys.TIME]: {
    key: tabKeys.TIME,
    title: 'TIME',
    path: '/time',
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
    redirectTo: null,
    showTitle: true,
    scheduler: null,
  };

  componentWillReceiveProps(props) {
    const { location: { pathname } } = props;
    this.setState(({ redirectTo }) => ({
      // After we receive new or changed props, reset redirect when location === redirectTo.
      redirectTo: pathname === redirectTo ? null : redirectTo,
    }));
  }

  componentDidMount() {
    this.scheduleHideTitle();
  }

  getCurrentTabIdxFromLocation() {
    const { location } = this.props;
    const { key } = this.getTabByPath(location.pathname) || {};
    return _.indexOf(tabOrder, key)
  }

  getTabByPath(path) {
    const key = Object.keys(tabKeys).filter(k => Tabs[k].path === path);
    return Tabs[key];
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

  renderTitle(title) {
    return <TabTitle subtitle={title} show={this.state.showTitle} />;
  }

  renderTabBar() {
    const { key } = this.getTabByPath(this.props.location.pathname) || {};
    return (
      <TabRow>
        {
          Object.keys(tabKeys).map(k => {
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
    let currentTabIndex = this.getCurrentTabIdxFromLocation(); // May be OOB
    if (currentTabIndex >= 0) {
      const nextTabIndex = --currentTabIndex < 0 ? tabOrder.length - 1 : currentTabIndex;
      this.setState(() => ({
        showTitle: true,
        scheduler: null,
        redirectTo: Tabs[tabOrder[nextTabIndex]].path,
      }));
      this.scheduleHideTitle();
    }
  };

  handleRightArrow = () => {
    let currentTabIndex = this.getCurrentTabIdxFromLocation(); // May be OOB
    if (currentTabIndex >= 0) {
      const nextTabIndex = ++currentTabIndex % tabOrder.length;
      this.setState(() => ({
        showTitle: true,
        scheduler: null,
        redirectTo: Tabs[tabOrder[nextTabIndex]].path,
      }));
      this.scheduleHideTitle();
    }
  };

  render() {
    const { redirectTo } = this.state;
    const { location } = this.props;

    // If the current location is diff from the state's index
    if (redirectTo && redirectTo !== location.pathname) {
      // Redirect triggers when state is changed
      return <Redirect to={redirectTo}/>
    }

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
            <div className="padded-container">
              <Switch location={location}>
                <Route path={`${Tabs[tabKeys.OVERVIEW].path}`} component={OverviewTab} />
                <Route exact path={`${Tabs[tabKeys.DEVICES].path}`} component={DeviceOverview} />
                <Route exact path={`${Tabs[tabKeys.GEOGRAPHY].path}`} component={BubbleLocationTab} />
                <Route render={() => <NotFoundPage />} />
              </Switch>
              <div className="large-spacer" />
              <div className="large-spacer" />
              <div className="large-spacer" />
              <div className="large-spacer" />
              <div className="large-spacer" />
              <div className="large-spacer" />
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
