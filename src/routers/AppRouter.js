import React from 'react';
import VizIoT from '../containers/VizIoT';

import NotFoundPage from '../containers/NotFoundPage';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Playground from '../containers/Playground';
import DeviceOverview from '../containers/DeviceOverview';

// exact prop means: exact path match
const AppRouter = () => (
  <HashRouter>
    <Switch>
      <Route path="/" component={VizIoT} exact={true} />
      <Route path="/404" component={NotFoundPage} />
      <Route path="/playground" component={Playground} />
      <Route path="/devices" component={DeviceOverview} />
      <Route component={VizIoT} />
    </Switch>
  </HashRouter>
);

export default AppRouter;
