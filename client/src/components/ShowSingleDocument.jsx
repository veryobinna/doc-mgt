import React from 'react';
import PropTypes from 'prop-types';

const ShowSingleDocument = props => (
  <div>{console.log('errrrrr', props.document.title)}
    <div id="modal1" className="modal modal-fixed-footer">
      <div className="modal-content">
        <h4>{props.document.title}</h4>
        <p dangerouslySetInnerHTML={{ __html: props.document.content }} />
      </div>
      {props.status.user.id===props.document.ownerID &&
      <div className="modal-footer">
        <a onClick={props.updateDocument} className="modal-action modal-close waves-effect waves-green btn-flat "><i className="large material-icons">mode_edit</i></a>
      </div>}
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
