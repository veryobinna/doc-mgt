import React from 'react';
import PropTypes from 'prop-types';

const ShowSingleDocument = props => (
  <div className="">
    <div id="modal1" className="modal modal-fixed-footer">
      <div className="modal-content">
        <h4 id="doc-title">{props.document.title}</h4>
        <p dangerouslySetInnerHTML={{ __html: props.document.content }} />
      </div>
      <div className="modal-footer">
        Date Published: {props.document.createdAt.slice(0, 10)}
        {((props.document.ownerID === props.status.user.id) ||
        (props.status.user.roleID === 1)) &&
          <a
            className="btn-floating modal-action modal-close  btn btn-flat"
            id="edit-doc"
            role="button"
            tabIndex="-1"
            onClick={props.updateDocument}
          >
            <i className="large material-icons">mode_edit</i></a>}
      </div>
    </div>
  </div>
);

ShowSingleDocument.getDefaultProps = {
  document: {},
  title: '',
  content: '',
  status: {}
};
ShowSingleDocument.propTypes = {
  document: PropTypes.shape({
    title: PropTypes.string,
    content: PropTypes.string,
    ownerID: PropTypes.number,
    createdAt: PropTypes.string,
  }),
  status: PropTypes.shape({
    user: PropTypes.object
  }),
  title: PropTypes.string,
  content: PropTypes.string,
  updateDocument: PropTypes.func.isRequired
};


export default ShowSingleDocument;
