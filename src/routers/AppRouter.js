import React from 'react';
import VizIoT from '../containers/VizIoT';
import NotFoundPage from '../containers/NotFoundPage';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// exact prop means: exact path match
const AppRouter = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" component={VizIoT} exact={true} />
      <Route path="/404" component={NotFoundPage} />
      <Route component={NotFoundPage} />
    </Switch>
  </BrowserRouter>
);

export default AppRouter;
