import React from 'react';
import { Link } from 'react-router-dom';
import Login from '../containers/Login';
import Signup from '../containers/Signup';
import TokenValidator from '../utils/TokenValidator';
import Documents from '../containers/GetDocument';

const Dashboard = () => (
  <div>
    <div className="navbar-fixed">
      <nav>{console.log(TokenValidator())}
        <div className="nav-wrapper">
          <Link to="/documents" className="brand-logo">Logo</Link>
          <ul className="right hide-on-med-and-down">
            <li><a href="sass.html">Sass</a></li>
            <li><a href="badges.html">Components</a></li>
          </ul>
        </div>
      </nav>
    </div>
    <div className="container">
      <Documents />
    </div>
  </div>
);
export default Dashboard;
