import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import Dashboard from '../containers/Dashboard';
import Signup from '../containers/Signup';
import Login from '../containers/Login';
import GetDocument from '../containers/GetDocument';
import AddDocument from // eslint-disable-line import/no-named-as-default
  '../containers/AddDocument';
import GetSingleDocument from '../containers/GetSingleDocument';
import UpdateDocument from '../containers/UpdateDocument';
import EditUser from '../containers/EditUser';
import GetUsers from '../containers/GetUsers';
import CheckAuthentication from '../containers/CheckAuthentication';


const routes = (
  <HashRouter>
    <div className="row">
      <Route exact path="/login" component={Login} />
      <Route path="/" component={Dashboard} />
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/documents" component={GetDocument} />
      <Route
        exact
        path="/mydocuments/:id"
        component={CheckAuthentication(GetDocument)}
      />
      <Route
        exact
        path="/adddocument"
        component={CheckAuthentication(AddDocument)}
      />
      <Route
        exact
        path="/document/:id"
        component={CheckAuthentication(GetSingleDocument)}
      />
      <Route
        exact
        path="/updatedocument"
        component={CheckAuthentication(UpdateDocument)}
      />
      <Route
        exact
        path="/users/:id"
        component={CheckAuthentication(EditUser)}
      />
      <Route exact path="/users" component={CheckAuthentication(GetUsers)} />
    </div>
  </HashRouter>
);

export default (routes);
