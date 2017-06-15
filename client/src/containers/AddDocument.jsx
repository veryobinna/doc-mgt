import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { addDocument } from '../actions/DocumentActions';

class AddDocument extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      content: '',
      access: ''
    };
    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }
  onInputChange(event) {
    const name = event.target.id;
    const value = event.target.value;
    this.setState({ [name]: value });
  }
  onFormSubmit(event) {
    event.preventDefault();
    this.props.addDocument(this.state);

  }

  render() {
    return (
      <div className="row">
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
                <label htmlFor="content">content</label>
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
  dispatch => bindActionCreators({ addDocument }, dispatch);

const mapStateToProps = state => ({
  documents: state.documentReducer.documents
});

export default connect(mapStateToProps, mapDispatchToProps)(AddDocument);
