import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ShowDocument = ({ title, content, access, id, deleteDocument, firstName, lastName }) => (
  <div className=" n">
    <div className="col s4 m4">
      <div className="card white">
        <div className="card-content black-text">
          <span className="card-title">{title}</span>
          <p dangerouslySetInnerHTML={{ __html: content }} />
        </div>

        <div className="card-action">
          <span>{`${firstName} ${lastName}`}</span>
          <span className="doc-access">{access}</span>
          <div><a
            className="waves-effect card-button-delete btn"
            role="button"
            tabIndex="-1"
            onClick={() => { deleteDocument(id); }}
          >
            <i className="material-icons left">delete</i>Delete
          </a> </div>
          <a
            href={`/#/document/${id}`}
            className=" waves-effect card-button-view btn"
          ><i className="material-icons left">visibility</i>View</a>
          <div className="clear"></div>
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
