import React from 'react';
import PropTypes from 'prop-types';

const ShowSingleDocument = props => (
  <div className="col s3 m3">
    <h2>Document View</h2>
    <h3>{props.document.title}</h3>
    <p>{props.document.content}</p>

    <div className="fixed-action-btn">
      <a
        role="button"
        tabIndex={0}
        onClick={props.updateDocument}
        className="btn-floating btn-large red"
      >
        <i className="large material-icons">mode_edit</i>
      </a>

    </div>
  </div>
);

ShowSingleDocument.getDefaultProps = {
  document: {},
  title: '',
  content: '',
  updateDocument: () => { },
};
ShowSingleDocument.propTypes = {
  document: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  title: PropTypes.string,
  content: PropTypes.string,
  updateDocument: PropTypes.func
};


export default ShowSingleDocument;
