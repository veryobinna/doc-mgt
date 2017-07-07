import React from 'react';
import PropTypes from 'prop-types';

const ShowDocument = ({
  title,
  content,
  access,
  id,
  deleteDocument,
  firstName,
  lastName
}) => (
  <div>
    <div className="col s4 m4">
      <div className="card white">
        <div className="card-content black-text">
          <span className="card-title">{title}</span>
          <span className="card-name">{`${firstName} ${lastName}`}</span>
          <span className="doc-access">{access}</span>
          <p dangerouslySetInnerHTML={{ __html: content }} />
        </div>

        <div className="card-action">
          <div><a
            className="btn-floating waves-effect card-btn-delete btn"
            role="button"
            tabIndex="-1"
            onClick={() => { deleteDocument(id); }}
          >
            <i className="material-icons left">delete</i>Delete
          </a> </div>
          <a
            href={`/#/document/${id}`}
            className="btn-floating waves-effect  btn"
          ><i className="material-icons left">visibility</i>View</a>
          <div className="clear" />
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
  firstName: '',
  lastName: ''
};
ShowDocument.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
  access: PropTypes.string,
  id: PropTypes.number,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  deleteDocument: PropTypes.func.isRequired
};


export default ShowDocument;
