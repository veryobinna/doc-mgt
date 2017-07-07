import React from 'react';
import PropTypes from 'prop-types';

const ShowSingleDocument = props => (
  <div className="">
    <div id="modal1" className="modal modal-fixed-footer">
      <div className="modal-content">
        <h4>{props.document.title}</h4>
        <p dangerouslySetInnerHTML={{ __html: props.document.content }} />
      </div>
      <div className="modal-footer">
        {props.document.createdAt.slice(0, 10)}
        {props.status.user.id === props.document.ownerID &&
          <a
            className="btn-floating modal-action modal-close  btn btn-flat"
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
  document: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  title: PropTypes.string,
  content: PropTypes.string,
  status: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  updateDocument: PropTypes.func.isRequired
};


export default ShowSingleDocument;
