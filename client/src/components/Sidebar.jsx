import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Sidebar = props => (
  <div className="side-bar">
    <ul id="slide-out" className="side-nav fixed">
      <li><div className="sidebar-top">
        <h5
          className="side-bar-top-text"
        > {`${props.status.user.firstName} ${props.status.user.lastName}`}
        </h5>
        <p className="side-bar-top-email">{props.status.user.email}</p>
      </div>
      </li>
      <li><div className="divider" /></li>
      <li>
        <Link
          to={`/dashboard/mydocuments/${props.status.user.id}`}
          className="waves-effect"
          activeClassName="active"
        > Personal Documents
        </Link>
      </li>
      <li>
        <Link
          to="/dashboard/documents"
          activeClassName="active"
        >All Documents</Link>

      </li>
      {props.status.user.roleID === 1 &&
        <li>
          <Link
            to="/dashboard/users"
            className="waves-effect"
            activeClassName="active"
          >Users</Link>
          </li>}
      <li>
        <Link
          to="/dashboard/adddocument"
          activeClassName="active"
        >New Document</Link>
      </li>
      <li>
        <a
          onClick={props.LogoutAction}
          className="waves-effect"
          role="button"
          tabIndex="-1"
        >Logout</a>
      </li>


    </ul>
  </div>
);
Sidebar.getDefaultProps = {
  user: {},
  id: '',
  status: {}
};
Sidebar.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string,
    firstName: PropTypes.string,
    email: PropTypes.string,
  }),
  id: PropTypes.number,
  status: PropTypes.shape({
    user: PropTypes.object
  }),
  LogoutAction: PropTypes.func.isRequired
};
export default Sidebar;
