import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ShowDocument = ({ title, content, access, id, deleteDocument }) => (
  <div className=" n">
    <div className="col s4 m4">
      <div className="card blue">
        <div className="card-content yellow-text">
          <span className="card-title">{title}</span>
          <p dangerouslySetInnerHTML={{__html:content}} />
          <p>access: {access}</p>
        </div>
        <div className="card-action">
          <a
            className=" waves-effect waves-light"
            role="button"
            tabIndex="-1"
            onClick={() => { deleteDocument(id); }}
          >
            <i className="material-icons">delete</i>
          </a>
          <Link
            to={`document/${id}`}
            className=" waves-effect waves-light"
          ><i className="material-icons">pageview</i></Link>
        </div>
      </div>
    </div>
  </div>
);
ShowDocument.getDefaultProps = {
  document: {},
  title: '',
  content: '',
  id: 0,
  access: '',
  deleteDocument: () => { },
};
ShowDocument.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
  access: PropTypes.string,
  id: PropTypes.number,
  deleteDocument: PropTypes.func
};


export default ShowDocument;
