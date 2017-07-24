import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import swal from 'sweetalert';
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
export class GetDocument extends Component {
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
      holder: 'Search Documents',
      search: false,
      getDocument: false,
      getMyDocument: false,
      paginate: {
        pageCount: 0
      }
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
    if (this.props.match.url === '/dashboard/documents') {
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
    let { query } = { ...this.state };
    const { limit, offset } = this.state;
    if (event) {
      query = event.target.value;
    }
    this.setState({
      query,
      search: true,
      getDocument: false,
      getMyDocument: false,
    });
    this.props.searchDocument(query, limit, offset);
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
      this.setState({ offset }, this.getDocument);
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
    swal({
      title: 'Are you sure?',
      text: 'Are you sure that you want to delete this photo?',
      type: 'warning',
      showCancelButton: true,
      closeOnConfirm: false,
      confirmButtonText: 'Yes, delete it!',
      confirmButtonColor: '#ec6c62'
    }, (isConfirm) => {
      if (isConfirm) {
        swal('Deleted!', 'File Deleted.', 'success');
        this.props.deleteDocument(id)
      .then(() => {
        this.getDocument();
      });
      } else {
        swal('Cancelled', 'File not Deleted', 'error');
      }
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
    const documents = this.state.documents.map((document) => {
      const items = {
        id: document.id,
        ownerID: document.ownerID,
        title: document.title,
        content: document.content,
        access: document.access,
        firstName: document.User.firstName,
        lastName: document.User.lastName,
        deleteDocument: this.deleteDocument,
        user: this.props.status.user,
      };
      return <ShowDocument key={Math.random()} {...items} />;
    });
    return (
      <div className="get-document col s12 m12 l9">
        <SearchBar onSearch={this.onSearch} holder={this.state.holder} />
        <div className="row">
          {documents}
        </div>
        {this.state.documents.length > 0 &&
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
        />}
        { this.state.documents.length === 0 &&
        <div className="no-result">No Documents </div>}
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
  status: state.auth
});

GetDocument.getDefaultProps = {
  documents: {},
  match: {},
  paginate: {},
  status: {},

};
GetDocument.propTypes = {
  documents: PropTypes.shape({
    id: PropTypes.number,
    ownerID: PropTypes.ownerID,
    title: PropTypes.title,
    content: PropTypes.content,
    access: PropTypes.access,
  }),
  getDocument: PropTypes.func.isRequired,
  getMyDocument: PropTypes.func.isRequired,
  deleteDocument: PropTypes.func.isRequired,
  searchDocument: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.object,
    url: PropTypes.string
  }),
  paginate: PropTypes.shape({
    pageCount: PropTypes.object
  }),
  status: PropTypes.shape({
    user: PropTypes.object
  }),
};

export default connect(mapStateToProps, mapDispatchToProps)(GetDocument);
