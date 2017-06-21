import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { getSingleUser, updateUser } from '../actions/UserActions';

class UpdateUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      roleID: '',
      };
    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }
componentWillMount() {
  //this.setState({ getUser(this.props.match.params.id) });
  console.log('get user and set to props via next props');
   this.props.getSingleUser(this.props.match.params.id);
  console.log('the proops are',this.props.match.params.id)
}

componentWillReceiveProps(nextProps) {
  this.setState({
     id: nextProps.users.id,
      firstName: nextProps.users.firstName,
      lastName: nextProps.users.lastName,
      username: nextProps.users.username,
      email: nextProps.users.email,
      roleID: nextProps.users.roleID
  })
  console.log('the next props', nextProps)
  
}
  onInputChange(event) {
    const name = event.target.id;
    const value = event.target.value;
    this.setState({ [name]: value });
  }
  onFormSubmit(event) {
    event.preventDefault();
    this.props.updateUser(this.state);
  }

  render() {
    return (
      <div className="row container landing-page component-render">
        <form onSubmit={this.onFormSubmit} className="col s12">
          <div className="row">
            <div className="input-field col s6">
              <input
                id="firstName"
                type="text"
                className="valdate"
                value={this.state.firstName}
                onChange={this.onInputChange}
              />
            </div>
            <div className="input-field col s6">
              <input
                id="lastName"
                type="text"
                className="valdate"
                value={this.state.lastName}
                onChange={this.onInputChange}
              />
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <input
                id="username"
                type="text"
                className="validate"
                value={this.state.username}
                onChange={this.onInputChange}
              />
            </div>
          </div>

          <div className="row">
            <div className="input-field col s12">
              <input
                id="roleID"
                type="text"
                className="validate"
                value={this.state.roleID}
                onChange={this.onInputChange}
              />
            </div>
          </div>

          <div className="row">
            <div className="input-field col s12">
              <input
                id="email"
                type="text"
                className="validate"
                value={this.state.email}
                onChange={this.onInputChange}
              />
            </div>
          </div>
          <button className="btn">Update</button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps =
  dispatch => bindActionCreators({ updateUser, getSingleUser }, dispatch);

const mapStateToProps = state => ({
  users: state.usersReducer.users
});

// UpdateDocument.getDefaultProps = {
//   documents: {},
//   title: '',
//   content: '',
//   updateDocument: () => { },
// };
// UpdateDocument.propTypes = {
//   documents: PropTypes.object, // eslint-disable-line react/forbid-prop-types
//   title: PropTypes.string,
//   content: PropTypes.string,
//   updateDocument: PropTypes.func
// };

export default connect(mapStateToProps, mapDispatchToProps)(UpdateUser);
