import React from 'react';
import ReactDOM from 'react-dom';
import App from '../src/components/app';
import Login from '../src/components/Login';


ReactDOM.render(
  <div>
    <Login />
    <App />
  </div>,
  document.getElementById('container'),
);
