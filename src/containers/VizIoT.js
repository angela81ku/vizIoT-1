'use es6';

import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Switch, Route } from 'react-router-dom';
import styled from 'styled-components';

import TabTitle from '../components/TabTitle';
import OverviewTab from './OverviewTab';
import BubbleLocationTab from './BubbleLocationTab';
import CoverFlow from 'UIBean/CoverFlow';
import DeviceOverview from 'VizIoT/containers/DeviceOverview';
import NotFound from 'VizIoT/containers/NotFound';
import ActivitySidebar from 'VizIoT/components/ActivitySidebar';
import TimeOverview from 'VizIoT/containers/TimeOverview';
import { getTabByPath, tabKeys, tabOrder, Tabs } from 'VizIoT/constants/TabNavigation';
import LoggerContainer from 'VizIoT/containers/LoggerContainer';
import AppMenuBar from 'VizIoT/components/AppMenuBar';
import Navigator from 'VizIoT/components/Navigator';
import { BACKGROUND_COLOR } from 'VizIoT/styles/base/viz-theme';
import { getIn } from 'immutable';
import { fetchDevices } from 'VizIoT/actionsRequest/deviceRequest';

const Background = styled.div`
  z-index: -2;
  position: fixed;
  width: 100%;
  height: 100%;
`;

class VizIoT extends React.Component {
  state = {
    redirectTo: null,
    showTitle: true,
    scheduler: null,
    showNav: false,
  };

  componentWillReceiveProps(props) {
    const {
      location: { pathname },
    } = props;
    this.setState(({ redirectTo }) => ({
      // After we receive new or changed props, reset redirect when location === redirectTo.
      redirectTo: pathname === redirectTo ? null : redirectTo,
    }));
  }

  componentDidMount() {
    this.scheduleHideTitle();
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

  // handleRightArrow = () => {
  //   let currentTabIndex = this.getCurrentTabIdxFromLocation(); // May be OOB
  //   if (currentTabIndex >= 0) {
  //     const nextTabIndex = ++currentTabIndex % tabOrder.length;
  //     this.setState(() => ({
  //       showTitle: true,
  //       scheduler: null,
  //       redirectTo: Tabs[tabOrder[nextTabIndex]].path,
  //     }));
  //     this.scheduleHideTitle();
  //   }
  // };

  onToggleNav = () => {
    this.setState({
      showNav: !this.state.showNav,
    });
  };

  handleKeyDown = e => {
    if (e.key === 'Tab') {
      e.preventDefault();
      this.onToggleNav();
    }
  };

  render() {
    const { redirectTo, showNav, showTitle } = this.state;
    const { location } = this.props;

    // If the current location is diff from the state's index
    if (redirectTo && redirectTo !== location.pathname) {
      // Redirect triggers when state is changed
      return <Redirect to={redirectTo} />;
    }

    const title = getIn(getTabByPath(location.pathname), ['title'], '');

    return (
      <div id="root-container" onKeyDown={this.handleKeyDown}>
        <Background>
          <video autoPlay muted loop>
            <source src="media/bg.mp4" type="video/mp4" />
          </video>
        </Background>
        <TabTitle subtitle={title} show={showTitle} />
        <div>
          <AppMenuBar />
          <Navigator location={location} isHidden={!showNav} />
          {/*<ActivitySidebar />*/}
          <CoverFlow
            keyName={location.pathname}
            onLeft={this.handleLeftArrow}
            onRight={this.handleRightArrow}
          >
            <Switch location={location}>
              <Route
                path={`${Tabs[tabKeys.LOGGER].path}`}
                component={LoggerContainer}
              />
              <Route
                path={`${Tabs[tabKeys.OVERVIEW].path}`}
                component={OverviewTab}
              />
              <Route
                exact
                path={`${Tabs[tabKeys.DEVICES].path}`}
                component={DeviceOverview}
              />
              <Route
                exact
                path={`${Tabs[tabKeys.TIME].path}`}
                component={TimeOverview}
              />
              <Route
                exact
                path={`${Tabs[tabKeys.DESTINATIONS].path}`}
                component={BubbleLocationTab}
              />
              <Route render={() => <NotFound />} />
            </Switch>
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
