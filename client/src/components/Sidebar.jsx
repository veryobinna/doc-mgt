import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import Documents from '../containers/GetDocument';
const Sidebar = (props) => (
  <div className="side-bar">
    <ul  className="side-nav fixed">

      <li><div className="side-bar-top"><i className="material-icons side-bar-top-icon">person_pin</i><h5 id="side-bar-top-text"> {props.status.user.firstName + ' ' + props.status.user.lastName}</h5></div></li>
      <li><div className="divider"></div></li>             
      <li><Link to="/documents" className="waves-effect" >Public Documents</Link></li>
      <li><Link to="/users" className="waves-effect" >Users</Link></li>
      <li><Link to="/adddocument" className="waves-effect" >New Document</Link></li>
      <li><a onClick={props.LogoutAction} className="waves-effect" >Logout</a></li>


    </ul>
  </div>
);
export default Sidebar;
