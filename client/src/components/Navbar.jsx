import React from 'react';
import { Redirect, Link } from 'react-router-dom';

const Navbar = () => (
  <div className="navbar-fixed">
    <nav>
      <div className="nav-wrapper">
        <div className="brand-logo">Doc-mgt</div>
        <ul className="right hide-on-med-and-down">
          <li><a href="badges.html">Components</a></li>
        </ul>
      </div>
    </nav>
  </div>
);
export default Navbar;


