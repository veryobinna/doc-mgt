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
    <Route exact path="/login" component={Login} />
    <Route exact path="/" component={Dashboard} />
    <Route exact path="/signup" component={Signup} />
    <Route exact path="/documents" component={GetDocument} />
    <Route exactpath="/adddocument" component={AddDocument} />
    <Route exact path="/document/:id" component={GetSingleDocument} />
    <Route exact path="/editdocument" component={EditDocument} />
    <Route exact path="/users/:id" component={EditUser} />

  </hashRouter>
);
export default routes;
