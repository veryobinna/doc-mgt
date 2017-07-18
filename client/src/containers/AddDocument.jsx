import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { addDocument, getDocument } from '../actions/DocumentActions';

/**
 * @export
 * @class AddDocument
 * @extends {Component}
 */
export class AddDocument extends Component {
  /**
   * Creates an instance of AddDocument.
   * @param {any} props
   * @memberof AddDocument
   */
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      content: '',
      access: '',
      paginate: {}
    };
    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }
  /**
   * @returns{null} no return
   * @memberof AddDocument
   */
  componentDidMount() {
    CKEDITOR.replace('content');
  }

  /**
   *
   * @param {any} nextProps
   * @returns{null} no return
   * @memberof AddDocument
   */
  componentWillReceiveProps(nextProps) {
    if (this.props.documents !== nextProps.documents) {
      this.props.history.replace('/dashboard/documents');
    }
  }


  /**
   *
   *
   * @param {any} event
   * @returns{null} no return
   * @memberof AddDocument
   */
  onInputChange(event) {
    const name = event.target.id;
    const value = event.target.value;
    this.setState({ [name]: value });
  }
  /**
   *
   *
   * @param {any} event
   * @returns{null} no return
   * @memberof AddDocument
   */
  onFormSubmit(event) {
    event.preventDefault();
    const data = CKEDITOR.instances.content.getData();
    const newDocument = this.state;
    newDocument.content = data;
    this.props.addDocument(newDocument);
  }

  /**
   *
   *
   * @returns {html} DOM elements
   * @memberof AddDocument
   */
  render() {
    return (
      <div className="col s12 m12 l9">
        <form onSubmit={this.onFormSubmit}>
          <div className="row">
            <div className="input-field col s12">
              <input
                id="title"
                type="text"
                className="validate"
                value={this.state.title}
                onChange={this.onInputChange}
              />
              <label htmlFor="title">Title</label>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <textarea
                  id="content"
                  className="materialize-textarea"
                  value={this.state.content}
                  onChange={this.onInputChange}
                />
              </div>
            </div>
            <div className="input-field col s12">
              <select
                className="browser-default"
                id="access"
                value={`${this.state.access}`}
                onChange={this.onInputChange}
              >
                <option value="" disabled>Visibility</option>
                <option value="public">public</option>
                <option value="private">private</option>
                <option value="role">role</option>
              </select>
              <label htmlFor="access" className="active" >Access</label>
            </div>
          </div>
          <button className="btn-doc waves-effect waves-light btn">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

AddDocument.getDefaultProps = {
  documents: '',
  history: {}
};
AddDocument.propTypes = {
  addDocument: PropTypes.func.isRequired,
  documents: PropTypes.string,
  history: PropTypes.shape({
    replace: PropTypes.function
  }),
};

const mapDispatchToProps =
  dispatch => bindActionCreators({ addDocument, getDocument }, dispatch);

const mapStateToProps = state => ({
  documents: state.documentReducer.documents,
  paginate: state.documentReducer.documents.paginate

});

export default connect(mapStateToProps, mapDispatchToProps)(AddDocument);
