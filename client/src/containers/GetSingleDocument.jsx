import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Proptypes from 'prop-types';
import { getSingleDocument } from '../actions/DocumentActions';
import ShowSingleDocument from '../components/ShowSingleDocument';


class GetSingleDocument extends Component {
  constructor(props) {
    super(props);
    this.state = {
      document: {}
    };
  }

  componentWillMount() {
    this.props.getSingleDocument(this.props.match.params.id);
  }

  componentWillReceiveProps(nextProps) {
    console.log('nextprops', nextProps);
    // if (this.props.documents.length !== nextProps.documents.length) {
    //   console.log(nextProps.documents);
    //   // const documents =
    this.setState({ document: nextProps.documents });
    //   console.log(this.state);
    // }
  }


  render() {
    console.log('props', this.props)
    console.log('state', this.state)
    return (
      <div>
        <div>Single view</div>
        <ShowSingleDocument document={this.state.document} />
      </div>
    )
  }
}
const mapDispatchToProps =
  dispatch => bindActionCreators({ getSingleDocument }, dispatch);

const mapStateToProps = state => ({
  documents: state.documents
});
// GetSingleDocument.contextTypes = {
//   router: Proptypes.object.isRequired
// }

export default connect(mapStateToProps, mapDispatchToProps)(GetSingleDocument);