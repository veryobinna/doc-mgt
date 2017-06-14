import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ShowDocument = ({title, content, access, id, deleteDocument}) => (
  <div className="col s3 m3">
    <div className="card blue">
      <div className="card-content yellow-text">
        <span className="card-title">{title}</span>
        <p>{content}</p>
        <p>access: {access}</p>
      </div>
      <div className="card-action">
        <a
          className=" waves-effect waves-light"
          role="button"
          tabIndex="-1"
          onClick={(e) => { deleteDocument(id); }}
        >
          <i className="material-icons">delete</i>
        </a>
        <Link
          to={`documents/${id}`}
          className=" waves-effect waves-light"
        ><i className="material-icons">pageview</i></Link>
      </div>
    </div>
  </div>
);


export default ShowDocument;
