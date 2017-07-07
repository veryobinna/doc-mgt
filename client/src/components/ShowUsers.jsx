import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ShowUsers = ({ id, firstName, lastName, username, email, roleID, roleName, deleteUser }) => (
  

<ul className="collection">
    <li className="collection-item avatar ">
      <i className="material-icons circle">perm_identity</i>
      <span className="title">{firstName+' '+lastName}</span>
      <p>{email}</p>
      <p>Role: {roleName}</p>
      <div>
      <a
            className="btn-floating btn-large btn-user-del btn secondary-content"
            role="button"
            tabIndex="-1"
            onClick={() => { deleteUser(id) }}
          >
            <i className="material-icons ">delete</i>
          </a>
          <Link
          id="mode-edit"
            to={`users/${id}`}
            className="btn-floating btn-large btn-user-edit btn secondary-content"
          ><i className="material-icons">mode_edit</i></Link>
          </div>
    </li>
  </ul>


);

export default ShowUsers;
