import React from 'react';
import { Switch, Redirect } from 'react-router-dom';

import RouteWithLayout from './components/RouteWithLayout/RouteWithLayout';
import Main from './layouts/Main/Main';

const Routes = () => {
  return (
    <Switch>
      <Redirect exact from="/" to="/dashboard" />
      <RouteWithLayout
        component={<div>Hi there</div>}
        layout={Main}
        path="/dashboard"
      />

      <Redirect to="/not-found" />
    </Switch>
  );
};

export default Routes;
