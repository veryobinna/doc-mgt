import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ShowUsers = ({
  id, firstName, lastName, email, roleName, deleteUser }) => (


    <ul className="collection">
      <li className="collection-item avatar ">
        <span className="title">{`${firstName} ${lastName}`}</span>
        <p>{email}</p>
        <p>Role: {roleName}</p>
        <div>
          <a
            className="btn-floating btn-large btn-del btn secondary-content"
            role="button"
            tabIndex="-1"
            onClick={() => { deleteUser(id); }}
          >
            <i className="material-icons ">delete</i>
          </a>
          <Link
            id="mode-edit"
            to={`users/${id}`}
            className="btn-floating btn-large btn-edit btn secondary-content"
          ><i className="material-icons">mode_edit</i></Link>
        </div>
      </li>
    </ul>


);

ShowUsers.getDefaultProps = {
  roleName: '',
  email: '',
  id: '',
  firstName: '',
  lastName: '',
};

ShowUsers.propTypes = {
  id: PropTypes.number,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  roleName: PropTypes.string,
  email: PropTypes.string,
  deleteUser: PropTypes.func.isRequired,

};

export default ShowUsers;
