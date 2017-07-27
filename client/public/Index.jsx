import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import toastr from 'toastr';
import configureStore from '../src/store/configureStore';
import routes from '../src/utils/Routes';
import setAuthorizationToken from '../src/utils/Authenticate';
import './Index.scss';

toastr.options.timeOut = 1000;
const store = configureStore();

const token = localStorage.getItem('token');
setAuthorizationToken(token);


ReactDOM.render(
  <Provider store={store}>
    {routes}
  </Provider>,
  document.getElementById('container'),
);
