import React from 'react';
import { hashRouter, Route } from 'react-router-dom';
// import App from '../components/app';
import Signup from '../containers/Signup';
import Login from '../containers/Login';


const routes = (
  <hashRouter>
    <Route path="/login" component={Login} />
    <Route path="/signup" component={Signup} />
  </hashRouter>
);
export default routes;
