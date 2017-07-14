import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { LoginAction } from '../actions/AuthAction';

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
  /**
   *
   *
   * @param {any} event
   * @returns {null} no return
   * @memberof Login
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
   * @returns {null} no return
   * @memberof Login
   */
  onFormSubmit(event) {
    event.preventDefault();
    this.props.LoginAction(this.state);
  }
  /**
   *
   *
   * @returns {html} DOM elements
   *
   * @memberof Login
   */
  render() {
    if (this.props.status.valid) {
      return (<Redirect
        push
        to={{
          pathname: `/dashboard/mydocuments/${this.props.status.user.id}`,
        }}
      />);
    }
    return (
      <div className="landing-page">
        <div className="row">
          <div className=" row-container col s6 m6 offset-s3 offset-m3 ">
            <div className="welcome-text"> Welcome to Doc-mgt.</div>
            <form onSubmit={this.onFormSubmit}>
              <label
                htmlFor="loginID"
              >LoginID</label>
              <input
                id="loginID"
                type="text"
                placeholder="email or username"
                className="validate"
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
              <button className="btn waves-effect waves-light"> Submit </button>
              <span className="loginPS">
                Have no account? <Link to="/signup">signup here</Link>
              </span>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps =
  dispatch => bindActionCreators({ LoginAction }, dispatch);

const mapStateToProps = state => ({
  status: state.auth
});

Login.getDefaultProps = {
  LoginAction: () => { },
  status: {}
};
Login.propTypes = {
  LoginAction: PropTypes.func,
  status: PropTypes.shape({
    valid: PropTypes.bool,
    user: PropTypes.object,
  })
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
