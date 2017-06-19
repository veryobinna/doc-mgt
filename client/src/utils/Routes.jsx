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


const routes = (
  <hashRouter>
    <Route path="/login" component={Login} />
    <Route path="/dashboard" component={Dashboard} />
    <Route path="/signup" component={Signup} />
    <Route path="/documents" component={GetDocument} />
    <Route path="/adddocument" component={AddDocument} />
    <Route path="/document/:id" component={GetSingleDocument} />
    <Route path="/editdocument" component={EditDocument} />
    <Route path="/users/:id" component={EditUser} />

  </hashRouter>
);
export default routes;
