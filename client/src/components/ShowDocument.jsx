import React from 'react';
import PropTypes from 'prop-types';

const ShowDocument = ({
  title,
  content,
  access,
  id,
  ownerID,
  user,
  deleteDocument,
  firstName,
  lastName
}) => (
  <div>
    <div className="col s4 m4">
      <div className="card white">
        <div className="card-content black-text">
          <span className="card-title">{title}</span>
          <div
            className="card-abstract"
            dangerouslySetInnerHTML={{ __html: content }}
          />
          <span className="card-name">{`${firstName} ${lastName}`}</span>
          <span className="doc-access">{access}</span>
        </div>

        <div className="card-action">
          { ((ownerID === user.id) || (user.roleID === 1)) && <div><a
            className="btn-floating waves-effect card-btn-delete btn"
            role="button"
            tabIndex="-1"
            onClick={() => { deleteDocument(id); }}
          >
            <i className="material-icons left">delete</i>Delete
          </a> </div>}
          <a
            href={`/#/dashboard/document/${id}`}
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
  ownerID: 0,
  access: '',
  firstName: '',
  lastName: '',
  user: {}
};
ShowDocument.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
  access: PropTypes.string,
  id: PropTypes.number,
  ownerID: PropTypes.number,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  deleteDocument: PropTypes.func.isRequired,
  user: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};


export default ShowDocument;
