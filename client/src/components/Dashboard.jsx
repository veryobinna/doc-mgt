import React from 'react';
import {Link} from 'react-router-dom';
import Login from '../containers/Login';
import Signup from '../containers/Signup';

const Dashboard = () => (
  <div className="navbar-fixed">
    <nav>
      <div className="nav-wrapper">
        <Link to="/documents" className="brand-logo">Logo</Link>
        <ul className="right hide-on-med-and-down">
          <li><a href="sass.html">Sass</a></li>
          <li><a href="badges.html">Components</a></li>
        </ul>
      </div>
    </nav>
  </div>
);
export default Dashboard;
