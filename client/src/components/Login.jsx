import React, { Component } from 'react';

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
  }
  render() {
    return (
      <form>
        <label htmlFor="Email">Email</label>
        <input
          id="Email"
          type="text"
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
        />
        <button onSubmit=""> Submit </button>
      </form>
    );
  }
}
export default Login;
