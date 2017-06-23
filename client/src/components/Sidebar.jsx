import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import Documents from '../containers/GetDocument';

const Sidebar = (props) => (
  <div className="side-bar">
    <ul  className="side-nav fixed">
      <li><div className="sidebar-top">
        <img className="image-holder" src={'/dist/img/image-holder.jpg'} />
      <h5 className="side-bar-top-text"> {props.status.user.firstName + ' ' + props.status.user.lastName}</h5>
      <p className="side-bar-top-email">{props.status.user.email}</p>
      <p className="side-bar-top-text">User level: {props.status.user.roleID}</p>
      </div>
      </li>
      <li><div className="divider"></div></li>             
      <li><Link to="/documents" className="waves-effect" >Public Documents</Link></li>
      {props.status.user.roleID===3 &&       
      <li><Link to="/users" className="waves-effect" >Users</Link></li>}
      <li><Link to="/adddocument" className="waves-effect" >New Document</Link></li>
      <li><a onClick={props.LogoutAction} className="waves-effect" >Logout</a></li>


    </ul>
  </div>
);
export default Sidebar;
