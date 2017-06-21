import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import Documents from '../containers/GetDocument';

const Sidebar = (user) => (
  <div className="side-bar">
    <ul  className="side-nav fixed">

      <li><div className="side-bar-top"><i className="material-icons side-bar-top-icon">person_pin</i><h5 id="side-bar-top-text"> {user.firstName + ' ' + user.lastName}</h5></div></li>
      <li><div className="divider"></div></li>             
      <li><Link to="/documents" className="waves-effect" >Public Documents</Link></li>
      <li><Link to="/users" className="waves-effect" >Users</Link></li>
      <li><Link to="/adddocument" className="waves-effect" >New Document</Link></li>


    </ul>
  </div>
);
export default Sidebar;
