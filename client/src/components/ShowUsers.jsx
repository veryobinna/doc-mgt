import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ShowUsers = ({ id, firstName, lastName, username, email, roleID, roleName, deleteUser }) => (
  

<ul className="collection">
    <li className="collection-item avatar">
      <i className="material-icons circle">perm_identity</i>
      <span className="title">{firstName+' '+lastName}</span>
      <p>{email}</p>
      <p>user type:{roleName}</p>
      <div>
      <a
            className="btn-floating btn-large waves-effect waves-light secondary-content"
            role="button"
            tabIndex="-1"
            onClick={() => { deleteUser(id) }}
          >
            <i className="material-icons ">delete</i>
          </a>
          <Link
          id="mode-edit"
            to={`users/${id}`}
            className="btn-floating btn-large waves-effect waves-light secondary-content"
          ><i className="material-icons">mode_edit</i></Link>
          </div>
    </li>
  </ul>


);
/* <div className=" n">
    <div className="col s4 m4">
      <div className="card blue">
        <div className="card-content yellow-text">
          <span className="card-title">ID: {id}</span>
          <p>{firstName}</p>
          <p>{lastName}</p>
          <p>{username}</p>
          <p>{email}</p>
          <p>{roleID}</p>
        </div>
        <div className="card-action">
          <a
            className=" waves-effect waves-light"
            role="button"
            tabIndex="-1"
            onClick={() => { deleteUser(id) }}
          >
            <i className="material-icons">delete</i>
          </a>
          <Link
            to={`users/${id}`}
            className=" waves-effect waves-light"
          ><i className="material-icons">mode_edit</i></Link>
        </div>
      </div>
    </div>
  </div>
/*ShowUsers.getDefaultProps = {
  document: {},
  title: '',
  content: '',
  id: 0,
  access: '',
  deleteDocument: () => { },
};
ShowUsers.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
  access: PropTypes.string,
  id: PropTypes.number,
  deleteDocument: PropTypes.func
};*/


export default ShowUsers;
