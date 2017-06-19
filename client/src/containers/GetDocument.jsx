import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { getDocument, deleteDocument } from '../actions/DocumentActions';
import ShowDocument from '../components/ShowDocument';

class GetDocument extends Component {
  constructor(props) {
    super(props);
    this.state = {
      documents: [{}],
    };
    this.deleteDocument = this.deleteDocument.bind(this);
  }

  componentWillMount() {
    this.props.getDocument();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.documents.length !== nextProps.documents.length) {
      this.setState({ documents: nextProps.documents });
    }
  }

  deleteDocument(id) {
    this.props.deleteDocument(id)
      .then(() => {
        this.props.getDocument();
      });
  }
  render() {
    const documents = this.state.documents.map((document) => {
      const items = {
        id: document.id,
        title: document.title,
        content: document.content,
        access: document.access,
        deleteDocument: this.deleteDocument
      };
      return <ShowDocument key={Math.random()} {...items} />;
    });
    return (
      <div>
        <h1>Documents</h1>
        <div key={documents.id} className="row">
          {documents}
        </div>
      </div>
    );
  }
}

const mapDispatchToProps =
  dispatch => bindActionCreators({ getDocument, deleteDocument }, dispatch);

const mapStateToProps = state => ({
  documents: state.documentReducer.documents
});

GetDocument.getDefaultProps = {
  documents: {},
  getDocument: () => { },
  deleteDocument: () => { },

};
GetDocument.propTypes = {
  documents: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  getDocument: PropTypes.func,
  deleteDocument: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(GetDocument);
