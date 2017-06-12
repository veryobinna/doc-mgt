import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter as Router } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import configureStore from '../src/store/configureStore';
import routes from '../src/utils/Routes';
import './index.scss';



const store = configureStore();
const history = createBrowserHistory();


ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      {routes}
    </Router>
  </Provider>,
  document.getElementById('container'),
);
