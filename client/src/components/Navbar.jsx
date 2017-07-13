import React from 'react';

/**
 * Navbar renders the navbar
 * @returns {html} Dom components
 */
const Navbar = () => (
  <div className="navbar-fixed">
    <nav>
      <a
        href=""
        data-activates="slide-out"
        className="button-collapse"
        role="button"
        tabIndex="-1"
      ><i className="material-icons">menu</i>
      </a>
      <div className="nav-wrapper">
        <div className="brand-logo">Doc-mgt</div>
      </div>
    </nav>
  </div>
);
export default Navbar;

