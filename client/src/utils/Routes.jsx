import React from 'react';
import { hashRouter, Route } from 'react-router-dom';
// import App from '../components/app';
import Signup from '../containers/Signup';
import Login from '../containers/Login';
import Document from '../containers/GetDocument';
import AddDocument from '../containers/AddDocument';
import ShowDocument from '../components/ShowDocument';

const routes = (
  <hashRouter>
    <Route path="/login" component={Login} />
    <Route path="/signup" component={Signup} />
    <Route path="/document" component={Document} />
    <Route path="/addDocument" component={AddDocument} />
    <Route path="/ShowDocument" component={ShowDocument} />

  </hashRouter>
);
export default routes;
