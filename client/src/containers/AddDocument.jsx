import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { addDocument, getDocument } from '../actions/DocumentActions';

class AddDocument extends Component {
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
  componentDidMount() {
    CKEDITOR.replace('content');

  }

  componentWillReceiveProps(nextProps) {
    if(this.props.documents!==nextProps.documents){
    this.props.history.replace('/documents');
  }
  }


  onInputChange(event) {
    const name = event.target.id;
    const value = event.target.value;
    this.setState({ [name]: value });
  }
  onFormSubmit(event) {
    event.preventDefault();
    const data = CKEDITOR.instances.content.getData();
    const newDocument = this.state
    newDocument.content = data
    this.props.addDocument(newDocument);
    //this.props.getDocument();
  }

  render() {
    console.log('the props from state', this.props.documents.paginate)
    return (
      <div className="row component-render">
        <form className="col s10" onSubmit={this.onFormSubmit}>
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
                <option value="" disabled>Choose your option</option>
                <option value="public">public</option>
                <option value="private">private</option>
                <option value="role">role</option>
              </select>
              <label htmlFor="access" className="active" >Access</label>
            </div>
          </div>
          <button className="waves-effect waves-light btn">Submit</button>
        </form>
      </div>
    );
  }
}

AddDocument.getDefaultProps = {
  addDocument: () => { },
};
AddDocument.propTypes = {
  addDocument: PropTypes.func
};

const mapDispatchToProps =
  dispatch => bindActionCreators({ addDocument, getDocument }, dispatch);

const mapStateToProps = state => ({
  documents: state.documentReducer.documents,
  paginate: state.documentReducer.documents.paginate

});

export default connect(mapStateToProps, mapDispatchToProps)(AddDocument);
