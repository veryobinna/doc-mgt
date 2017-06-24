import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter as Router } from 'react-router-dom';
// import createBrowserHistory from 'history/createBrowserHistory';
import toastr from 'toastr';
import configureStore from '../src/store/configureStore';
import routes from '../src/utils/Routes';
import setAuthorizationToken from '../src/utils/Authenticate';
import './index.scss';

toastr.options.timeOut = 3;
const store = configureStore();
//const history = createBrowserHistory();

const token = localStorage.getItem('token');
setAuthorizationToken(token);


ReactDOM.render(
  <Provider store={store}>
    {routes}
  </Provider>,
  document.getElementById('container'),
);
