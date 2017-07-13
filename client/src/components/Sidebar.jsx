import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Sidebar = props => (
  <div className="side-bar">
    <ul id="slide-out" className="side-nav fixed">
      <li><div className="sidebar-top">
        <img
          className="image-holder"
          alt="user"
          src={'/dist/img/image-holder.jpg'}
        />
        <h5
          className="side-bar-top-text"
        > {`${props.status.user.firstName} ${props.status.user.lastName}`}
        </h5>
        <p className="side-bar-top-email">{props.status.user.email}</p>
        <p className="side-bar-top-text">Role: {props.status.user.roleName}</p>
      </div>
      </li>
      <li><div className="divider" /></li>
      <li>
        <Link to="/dashboard/documents" className="waves-effect" >Public Documents</Link>
      </li>
      <li>
        <Link
          to={`/dashboard/mydocuments/${props.status.user.id}`}
          className="waves-effect"
        > My Documents
        </Link>
      </li>
      {props.status.user.roleID === 1 &&
        <li><Link to="/dashboard/users" className="waves-effect" >Users</Link></li>}
      <li>
        <Link to="/dashboard/adddocument" className="waves-effect" >New Document</Link>
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
    <a
      href=""
      data-activates="slide-out"
      className="button-collapse"
      role="button"
      tabIndex="-1"
    ><i className="material-icons">menu</i>
    </a>
  </div>
);
Sidebar.getDefaultProps = {
  user: {},
  id: '',
  status: {}
};
Sidebar.propTypes = {
  user: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  id: PropTypes.number,
  status: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  LogoutAction: PropTypes.func.isRequired
};
export default Sidebar;
