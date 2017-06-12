import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import LoginAction from '../actions/LoginAction';


/**
 *
 *
 * @class Login
 * @extends {Component}
 */
class Login extends Component {
  /**
   * Creates an instance of Login.
   * @param {any} props
   *
   * @memberof Login
   */
  constructor(props) {
    super(props);

    this.state = {
      loginID: '',
      password: ''
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
    this.props.LoginAction(this.state);
  }
  render() {
    return (
      <form onSubmit={this.onFormSubmit}>
        <label htmlFor="loginID">LoginID</label>
        <input
          id="loginID"
          type="text"
          placeholder="email or username"
          value={this.state.loginID}
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
dispatch => bindActionCreators({ LoginAction }, dispatch);

// state is a function param that reps the state within our redux store
// state.login refs what is in index reducer
const mapStateToProps = state => ({
  status: state.login
});

// take the result of the first fuction with two parameter,
// then pass the second guy,login, to the result
export default connect(mapStateToProps, mapDispatchToProps)(Login);
