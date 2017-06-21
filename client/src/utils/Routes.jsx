import React from 'react';
import { hashRouter, Route } from 'react-router-dom';
import Dashboard from '../containers/Dashboard';
import Signup from '../containers/Signup';
import Login from '../containers/Login';
import GetDocument from '../containers/GetDocument';
import AddDocument from '../containers/AddDocument';
import GetSingleDocument from '../containers/GetSingleDocument';
import EditDocument from '../containers/EditDocument';
import EditUser from '../containers/EditUser';
import GetUsers from '../containers/GetUsers';


const routes = (
  <hashRouter>
    <Route exact path="/login" component={Login} />
    <Route path="/" component={Dashboard} />
    <Route exact path="/signup" component={Signup} />
    <Route path="/documents" component={GetDocument} />
    <Route exact path="/adddocument" component={AddDocument} />
    <Route exact path="/document/:id" component={GetSingleDocument} />
    <Route exact path="/editdocument" component={EditDocument} />
    <Route exact path="/users/:id" component={EditUser} />
    <Route exact path="/users" component={GetUsers} />

  </hashRouter>
);
export default routes;
