import React from 'react';
import VizIoT from '../containers/VizIoT';
import NotFoundPage from '../containers/NotFoundPage';
import { HashRouter, Route, Switch } from 'react-router-dom';

// exact prop means: exact path match
const AppRouter = () => (
  <HashRouter>
    <Switch>
      <Route path="/" component={VizIoT} exact={true} />
      <Route path="/404" component={NotFoundPage} />
      <Route component={NotFoundPage} />
    </Switch>
  </HashRouter>
);

export default AppRouter;
