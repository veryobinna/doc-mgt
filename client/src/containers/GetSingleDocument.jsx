import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { getSingleDocument } from '../actions/DocumentActions';
import ShowSingleDocument from '../components/ShowSingleDocument';
import UpdateDocument from '../containers/UpdateDocument';


/**
 *
 *
 * @class GetSingleDocument
 * @extends {Component}
 */
class GetSingleDocument extends Component {
  /**
   * Creates an instance of GetSingleDocument.
   * @param {any} props
   *
   * @memberof GetSingleDocument
   */
  constructor(props) {
    super(props);
    this.state = {
      document: { createdAt: '' }
    };
    this.updateDocument = this.updateDocument.bind(this);
  }

  /**
   *
   *
   *@returns {null} no return
   * @memberof GetSingleDocument
   */
  componentWillMount() {
    this.props.getSingleDocument(this.props.match.params.id);
  }

  /**
   *
   *
   * @param {any} nextProps
   *@returns {null} no return
   * @memberof GetSingleDocument
   */
  componentWillReceiveProps(nextProps) {
    this.setState({ document: nextProps.documents });
  }

  /**
   *
   *
   * @returns {html} DOM element
   *
   * @memberof GetSingleDocument
   */
  updateDocument() {
    this.props.history.replace('/updatedocument');
    return <UpdateDocument document={this.state} />;
  }


  /**
   *
   *
   * @returns {html} DOM element
   *
   * @memberof GetSingleDocument
   */
  render() {
    if (!this.props.status.valid) {
      return (<Redirect
        push
        to={{
          pathname: '/login',
        }}
      />);
    }
    return (
      <div className="">
        <ShowSingleDocument
          document={this.state.document}
          updateDocument={this.updateDocument}
          status={this.props.status}
        />
      </div>
    );
  }
}
const mapDispatchToProps =
  dispatch => bindActionCreators({ getSingleDocument }, dispatch);

const mapStateToProps = state => ({
  documents: state.documentReducer.documents,
  status: state.login

});

GetSingleDocument.getDefaultProps = {
  documents: {},
  history: {},
  match: {},
  params: {},
  id: '',
  status: {},
  getSingleDocument: () => { },

};
GetSingleDocument.propTypes = {
  documents: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  history: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  match: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  params: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  status: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  id: PropTypes.string,
  getSingleDocument: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(GetSingleDocument);
