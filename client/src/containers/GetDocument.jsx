import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';
import { getDocument, getMyDocument,
  deleteDocument, searchDocument } from '../actions/DocumentActions';
import ShowDocument from '../components/ShowDocument';
import SearchBar from '../components/SearchBar';
import Footer from '../components/Footer';

class GetDocument extends Component {
  constructor(props) {
    super(props);
    this.state = {
      documents: [{}],
      query: '',
      offset: 0,
      limit: 6,
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

  componentWillMount() {
    console.log('the props', this.props.match.params.id)
    if (this.props.match.params.id) {
      this.getMyDocument()
      console.log('we got to the getMyDocument area')
    }
    if (this.props.match.url === '/documents') {

      this.getDocument()
    }

  }

  componentWillReceiveProps(nextProps) {
    console.log('we even recieved nextprops');
    this.setState({ documents: nextProps.documents, paginate: nextProps.paginate });

  }

  getMyDocument() {
    this.setState({ search: false, getDocument: false, getMyDocument: true });
    this.props.getMyDocument(this.props.match.params.id, this.state.limit, this.state.offset);


  }
  getDocument() {
    this.setState({ search: false, getDocument: true, getMyDocument: false });
    console.log(' limit and offset', this.state.limit, this.state.offset);

    this.props.getDocument(this.state.limit, this.state.offset);

  }


  onSearch(event) {
    if (event) {
      this.state.query = event.target.value;
      //this.setState({query:event.target.value})
    }
    this.setState({
      search: true,
      getDocument: false,
      getMyDocument: false,
    })
    console.log('query, limit and offset', this.state.query, this.state.limit, this.state.offset);
    this.props.searchDocument(this.state.query, this.state.limit, this.state.offset);
  }

  deleteDocument(id) {
    this.props.deleteDocument(id)
      .then(() => {
        this.getDocument();
      });
  }
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
        <Footer />
      </div>
    );
  }
}

const mapDispatchToProps =
  dispatch => bindActionCreators({ getDocument, getMyDocument, deleteDocument, searchDocument }, dispatch);

const mapStateToProps = state => ({
  documents: state.documentReducer.documents.document,
  paginate: state.documentReducer.documents.paginate

});

GetDocument.getDefaultProps = {
  documents: {},
  getDocument: () => { },
  getMyDocument: () => { },
  deleteDocument: () => { },
  searchDocument: () => { },

};
GetDocument.propTypes = {
  documents: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  getDocument: PropTypes.func,
  getMyDocument: PropTypes.func,
  deleteDocument: PropTypes.func,
  searchDocument: PropTypes.func

};

export default connect(mapStateToProps, mapDispatchToProps)(GetDocument);
