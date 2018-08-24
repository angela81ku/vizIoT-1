import React from 'react';
import VizIoT from '../containers/VizIoT';

import NotFoundPage from '../containers/NotFoundPage';
import { HashRouter, Redirect, Route, Switch } from 'react-router-dom';
import Playground from '../containers/Playground';

// exact prop means: exact path match
const AppRouter = () => (
  <HashRouter>
    <Switch>
      <Redirect exact from="/" to='/overview' />
      <Route path="/playground" component={Playground} />
      <Route component={VizIoT} />
      <Route render={() => <NotFoundPage />} />
    </Switch>
  </HashRouter>
);

export default AppRouter;
