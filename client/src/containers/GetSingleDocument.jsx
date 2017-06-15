import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { getSingleDocument } from '../actions/DocumentActions';
import ShowSingleDocument from '../components/ShowSingleDocument';
import EditDocument from '../containers/EditDocument';


class GetSingleDocument extends Component {
  constructor(props) {
    super(props);
    this.state = {
      document: {}
    };
    this.updateDocument = this.updateDocument.bind(this);
  }

  componentWillMount() {
    this.props.getSingleDocument(this.props.match.params.id);
  }

  componentWillReceiveProps(nextProps) {
    // if (this.props.documents.length !== nextProps.documents.length) {
    //   console.log(nextProps.documents);
    //   // const documents =
    this.setState({ document: nextProps.documents });
  }

  updateDocument() {
    this.props.history.replace('/editdocument');
    return <EditDocument document={this.state} />;
  }


  render() {
    return (
      <div>
        <div>Single view</div>
        <ShowSingleDocument
          document={this.state.document}
          updateDocument={this.updateDocument}
        />
      </div>
    );
  }
}
const mapDispatchToProps =
  dispatch => bindActionCreators({ getSingleDocument }, dispatch);

const mapStateToProps = state => ({
  documents: state.documentReducer.documents
});
// GetSingleDocument.contextTypes = {
//   router: Proptypes.object.isRequired
// }

GetSingleDocument.getDefaultProps = {
  documents: {},
  history: {},
  match: {},
  params: {},
  id: '',
  deleteDocument: () => { },

};
GetSingleDocument.propTypes = {
  documents: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  history: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  match: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  params: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  id: PropTypes.string,
};

export default connect(mapStateToProps, mapDispatchToProps)(GetSingleDocument);
