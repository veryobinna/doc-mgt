import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';
import {
  getDocument, getMyDocument,
  deleteDocument, searchDocument
} from '../actions/DocumentActions';
import ShowDocument from '../components/ShowDocument';
import SearchBar from '../components/SearchBar';

/**
 *
 *
 * @class GetDocument
 * @extends {Component}
 */
class GetDocument extends Component {
  /**
   * Creates an instance of GetDocument.
   * @param {any} props
   *
   * @memberof GetDocument
   */
  constructor(props) {
    super(props);
    this.state = {
      documents: [{ User: {} }],
      query: '',
      offset: 0,
      limit: 12,
      search: false,
      getDocument: false,
      getMyDocument: false,
      paginate: ''
    };
    this.deleteDocument = this.deleteDocument.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.getDocument = this.getDocument.bind(this);
    this.getMyDocument = this.getMyDocument.bind(this);
    this.onPageClick = this.onPageClick.bind(this);
  }

  /**
   *
   *
   * @returns {null} no returns
   * @memberof GetDocument
   */
  componentWillMount() {
    if (this.props.match.params.id) {
      this.getMyDocument();
    }
    if (this.props.match.url === '/documents') {
      this.getDocument();
    }
  }


  /**
   *
   *
   * @param {any} nextProps
   * @returns {null} no return
   * @memberof GetDocument
   */
  componentWillReceiveProps(nextProps) {
    this.setState({
      documents: nextProps.documents,
      paginate: nextProps.paginate
    });
  }

  /**
 *
 *
 * @param {any} event
 * @returns {null} no return
 * @memberof GetDocument
 */
  onSearch(event) {
    if (event) {
      this.state.query = event.target.value;
      // this.setState({query:event.target.value})
    }
    this.setState({
      search: true,
      getDocument: false,
      getMyDocument: false,
    });
    this.props.searchDocument(
      this.state.query,
      this.state.limit,
      this.state.offset);
  }

  /**
 *
 *
 * @param {any} event
 * @returns {null} no return
 * @memberof GetDocument
 */
  onPageClick(event) {
    const selected = event.selected;
    const offset = selected * 6;

    if (this.state.search) {
      this.setState({ offset },
        this.onSearch // callback
      );
    }
    if (this.state.getDocument) {
      this.setState({ offset },
        this.getDocument // callback
      );
    }
    if (this.state.getMyDocument) {
      this.setState({ offset },
        this.getMyDocument // callback
      );
    }
  }

  /**
   *
   *
   * @returns {null} no return
   * @memberof GetDocument
   */
  getMyDocument() {
    this.setState({ search: false, getDocument: false, getMyDocument: true });
    this.props.getMyDocument(
      this.props.match.params.id,
      this.state.limit,
      this.state.offset);
  }
  /**
   *
   *
   * @returns {null} no return
   * @memberof GetDocument
   */
  getDocument() {
    this.setState({ search: false, getDocument: true, getMyDocument: false });
    this.props.getDocument(this.state.limit, this.state.offset);
  }


  /**
   *
   *
   * @param {any} id
   * @returns {null} no return
   * @memberof GetDocument
   */
  deleteDocument(id) {
    this.props.deleteDocument(id)
      .then(() => {
        this.getDocument();
      });
  }

  /**
   *
   *
   * @returns {html} DOM elements
   *
   * @memberof GetDocument
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
    const documents = this.state.documents.map((document) => {
      const items = {
        id: document.id,
        title: document.title,
        content: document.content,
        access: document.access,
        firstName: document.User.firstName,
        lastName: document.User.lastName,
        deleteDocument: this.deleteDocument
      };
      return <ShowDocument key={Math.random()} {...items} />;
    });
    return (
      <div className="col s12 m12 l9">
        <SearchBar onSearch={this.onSearch} />
        <div className="row">
          {documents}
        </div>
        <ReactPaginate
          initialPage={this.state.initialPage}
          previousLabel={'previous'}
          nextLabel={'next'}
          breakLabel={<a href="">...</a>}
          breakClassName={'break-me'}
          pageCount={this.state.paginate.pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={this.onPageClick}
          containerClassName={'pagination'}
          subContainerClassName={'pages pagination'}
          activeClassName={'active'}
        />
      </div>
    );
  }
}

const mapDispatchToProps =
  dispatch => bindActionCreators({
    getDocument,
    getMyDocument,
    deleteDocument,
    searchDocument
  }, dispatch);

const mapStateToProps = state => ({
  documents: state.documentReducer.documents.document,
  paginate: state.documentReducer.documents.paginate,
  status: state.login
});

GetDocument.getDefaultProps = {
  documents: {},
  getDocument: () => { },
  getMyDocument: () => { },
  deleteDocument: () => { },
  searchDocument: () => { },
  match: {},
  paginate: {},
  status: {}

};
GetDocument.propTypes = {
  documents: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  getDocument: PropTypes.func,
  getMyDocument: PropTypes.func,
  deleteDocument: PropTypes.func,
  searchDocument: PropTypes.func,
  match: PropTypes.object, // eslint-disable-line react/forbid-prop-types,
  paginate: PropTypes.object, // eslint-disable-line react/forbid-prop-types,
  status: PropTypes.object // eslint-disable-line react/forbid-prop-types
};

export default connect(mapStateToProps, mapDispatchToProps)(GetDocument);
