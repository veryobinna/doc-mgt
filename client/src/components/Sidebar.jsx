import React from 'react';
import { Link } from 'react-router-dom';
import Documents from '../containers/GetDocument';

const Sidebar = (user) => (
  <div className="side-bar">
    <ul  className="side-nav fixed">

      <li><div><i className="material-icons">perm_identity</i>{user.firstName + ' ' + user.lastName}</div></li>
      <li><div className="divider"></div></li>
       <li><div><i className="material-icons">perm_identity</i>{user.firstName + ' ' + user.lastName}</div></li>

      <li><a className="waves-effect" href="#!">Third Link With Waves</a></li>
    </ul>
  </div>
);
export default Sidebar;
