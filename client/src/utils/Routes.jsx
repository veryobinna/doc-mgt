import React from 'react';
import { hashRouter, Switch, Route } from 'react-router-dom';
// import App from '../components/app';
import Signup from '../containers/Signup';
import Login from '../containers/Login';


const routes = (
  <hashRouter>
    <Switch>
      <Route path="/signup" component={Signup} />
      <Route exact path="/login" component={Login} />
    </Switch>
  </hashRouter>
);
export default routes;
