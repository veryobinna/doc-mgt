import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { updateDocument } from '../actions/DocumentActions';

class UpdateDocument extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.documents.id,
      title: this.props.documents.title,
      content: this.props.documents.content,
      access: this.props.documents.access
    };
    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }
componentWillMount() {
  this.setState({ title: this.props.documents.title });
}
  onInputChange(event) {
    const name = event.target.id;
    const value = event.target.value;
    this.setState({ [name]: value });
  }
  onFormSubmit(event) {
    event.preventDefault();
    this.props.updateDocument(this.state);
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
              <label htmlFor="title">.</label>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <textarea
                  id="content"
                  className="materialize-textarea"
                  value={this.state.content}
                  onChange={this.onInputChange}
                />
                <label htmlFor="content">.</label>
              </div>
            </div>
            <div className="input-field col s12">
              <select
                className="browser-default"
                id="access"
                value={this.state.access}
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
          <button className="waves-effect waves-light btn">Update</button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps =
  dispatch => bindActionCreators({ updateDocument }, dispatch);

const mapStateToProps = state => ({
  documents: state.documentReducer.documents
});

UpdateDocument.getDefaultProps = {
  documents: {},
  title: '',
  content: '',
  updateDocument: () => { },
};
UpdateDocument.propTypes = {
  documents: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  title: PropTypes.string,
  content: PropTypes.string,
  updateDocument: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateDocument);
