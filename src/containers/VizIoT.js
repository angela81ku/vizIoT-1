'use es6';

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Redirect, Switch, Route } from 'react-router-dom';
import styled from 'styled-components';

import TabTitle from '../components/TabTitle';
import OverviewTab from './OverviewTab';
import BubbleLocationTab from './BubbleLocationTab';
import CoverFlow from 'UIBean/CoverFlow';
import DeviceOverview from 'VizIoT/containers/DeviceOverview';
import NotFound from 'VizIoT/containers/NotFound';
import TimeOverview from 'VizIoT/containers/TimeOverview';
import { getTabByPath, tabKeys, Tabs } from 'VizIoT/constants/TabNavigation';
import LoggerContainer from 'VizIoT/containers/LoggerContainer';
import AppMenuBar from 'VizIoT/components/AppMenuBar';
import Navigator from 'VizIoT/components/Navigator';
import { pathOr } from 'ramda';

// my imports
import InOutTab from './InOutTab';

class VideoBackground extends PureComponent {
  render() {
    return (
      <Background>
        <BackgroundRelative>
          <video autoPlay muted loop style={{ width: '100%', minWidth: '1980px'}}>
            <source src="media/bg.mp4" type="video/mp4" />
          </video>
        </BackgroundRelative>
      </Background>
    )
  }
}

const Background = styled.div`
  z-index: -2;
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: #0c1a38;
`;

const BackgroundRelative = styled.div`
  position: relative;
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
    document.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    document.addEventListener('keydown', this.handleKeyDown);
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
    if (e.key === 'i') {
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

    const title = pathOr('', ['title'], getTabByPath(location.pathname));

    return (
      <div id="root-container">
        <VideoBackground />
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
              {/*this is my contribution*/}
              <Route
                exact
                path={`${Tabs[tabKeys.INOUT].path}`}
                component={InOutTab}
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
