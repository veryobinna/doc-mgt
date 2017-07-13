/* eslint-disable import/no-named-as-default*/
import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import Dashboard from '../containers/Dashboard';
import Signup from '../containers/Signup';
import Login from '../containers/Login';
import GetDocument from '../containers/GetDocument';
import AddDocument from '../containers/AddDocument';
import GetSingleDocument from '../containers/GetSingleDocument';
import UpdateDocument from '../containers/UpdateDocument';
import UpdateUser from '../containers/UpdateUser';
import GetUsers from '../containers/GetUsers';
import CheckAuthentication from '../containers/CheckAuthentication';


const routes = (
  <HashRouter>
    <div className="row">
      <Route exact path="/" component={Login} />
      <Route exact path="/signup" component={Signup} />
      <Route path="/dashboard" component={CheckAuthentication(Dashboard)} />

      <Route
        exact
        path="/dashboard/documents"
        component={CheckAuthentication(GetDocument)}
      />
      <Route
        exact
        path="/dashboard/mydocuments/:id"
        component={CheckAuthentication(GetDocument)}
      />
      <Route
        exact
        path="/dashboard/adddocument"
        component={CheckAuthentication(AddDocument)}
      />
      <Route
        exact
        path="/dashboard/document/:id"
        component={CheckAuthentication(GetSingleDocument)}
      />
      <Route
        exact
        path="/dashboard/updatedocument"
        component={CheckAuthentication(UpdateDocument)}
      />
      <Route
        exact
        path="/dashboard/users/:id"
        component={CheckAuthentication(UpdateUser)}
      />
      <Route exact path="/dashboard/users" component={CheckAuthentication(GetUsers)} />
    </div>
  </HashRouter>
);

export default (routes);
