import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { getDocument, getMyDocument, deleteDocument } from '../actions/DocumentActions';
import ShowDocument from '../components/ShowDocument';
import SearchBar from '../components/SearchBar';

class GetDocument extends Component {
  constructor(props) {
    super(props);
    this.state = {
      documents: [{}],
    };
    this.deleteDocument = this.deleteDocument.bind(this);
  }

  componentWillMount() {
    console.log('the props', this.props.match.params.id)
    if (this.props.match.params.id) {
      console.log('we got to the getMyDocument area')
      this.props.getMyDocument(this.props.match.params.id);
    }
    if (this.props.match.url === '/documents') {

      this.props.getDocument();
    }

  }

  componentWillReceiveProps(nextProps) {
    console.log('we even recieved nextprops');
    this.setState({ documents: nextProps.documents });

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
      <div className="component-render">
        <SearchBar />
        <div className="row">
          {documents}
        </div>
      </div>
    );
  }
}

const mapDispatchToProps =
  dispatch => bindActionCreators({ getDocument, getMyDocument, deleteDocument }, dispatch);

const mapStateToProps = state => ({
  documents: state.documentReducer.documents
});

GetDocument.getDefaultProps = {
  documents: {},
  getDocument: () => { },
  getMyDocument: () => { },
  deleteDocument: () => { },

};
GetDocument.propTypes = {
  documents: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  getDocument: PropTypes.func,
  getMyDocument: PropTypes.func,
  deleteDocument: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(GetDocument);
