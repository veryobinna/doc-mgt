import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SignupAction from '../actions/SignupAction';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      password: ''
    };
    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }
  onInputChange(event) {
    const name = event.target.id;
    const value = event.target.value;
    this.setState({ [name]: value });
    console.log(this.state);
  }
  onFormSubmit(event) {
    event.preventDefault();
    this.props.SignupAction(this.state);
  }

  render() {
    return (
      <form onSubmit={this.onFormSubmit}>
        <label htmlFor="firstName">firstName</label>
        <input
          id="firstName"
          type="text"
          placeholder="first name"
          value={this.state.firstName}
          onChange={this.onInputChange}
        />
        <label htmlFor="lastName">lastName</label>
        <input
          id="lastName"
          type="text"
          placeholder="last name"
          value={this.state.lastName}
          onChange={this.onInputChange}
        />
        <label htmlFor="username">username</label>
        <input
          id="username"
          type="text"
          placeholder="username"
          value={this.state.username}
          onChange={this.onInputChange}
        />

        <label htmlFor="email">email</label>
        <input
          id="email"
          type="text"
          placeholder="email"
          value={this.state.email}
          onChange={this.onInputChange}
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={this.state.password}
          onChange={this.onInputChange}
        />

        <button> Submit </button>
      </form>
    );
  }

}
const mapDispatchToProps =
dispatch => bindActionCreators({ SignupAction }, dispatch);

const mapStateToProps = state => ({
  status: state.signup
});

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
