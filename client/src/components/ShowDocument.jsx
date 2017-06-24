import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ShowDocument = ({ title, content, access, id, deleteDocument }) => (
  <div className=" n">
    <div className="col s4 m4">
      <div className="card white">
        <div className="card-content black-text">
          <span className="card-title">{title}</span>
          <div>Access: {access}</div>

          <p dangerouslySetInnerHTML={{__html:content}} />
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
          <a
            href={`/#/document/${id}`}
            className=" waves-effect waves-light"
          ><i className="material-icons">visibility</i></a>
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
