/* global $ */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Redirect, Link } from 'react-router-dom';
import { signupAction } from '../actions/AuthAction';

/**
 *
 *
 * @class Signup
 * @extends {Component}
 */
class Signup extends Component {
  /**
   * Creates an instance of Signup.
   * @param {any} props
   *
   * @memberof Signup
   */
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    };
    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }
  /**
   *
   *
   * @param {any} nextProps
   * @returns {null} no return
   * @memberof Signup
   */
  componentWillReceiveProps(nextProps) {
    this.setState({
      id: nextProps.status.id
    });
  }
  /**
   *
   *
   * @param {any} event
   * @returns {null} no return
   * @memberof Signup
   */
  onInputChange(event) {
    const name = event.target.id;
    const value = event.target.value;
    this.setState({ [name]: value });


    $('.signup-form').validate({
      rules: {
        firstName: {
          required: true,
          minlength: 6,
        },
        lastName: {
          required: true,
          minlength: 6,
        },
        email: {
          email: true,
          required: true,
        },
        password: {
          required: true,
          minlength: 6,
        },
        username: {
          required: true,
          minlength: 4,
        },
        confirmPassword: {
          required: true,
          equalTo: '#password',
        },
      },
      errorElement: 'div',
      errorPlacement: (error, element) => {
        const placement = $(element).data('error');
        if (placement) {
          $(placement).append(error);
        } else {
          error.insertAfter(element);
        }
      },
    });
  }
  /**
   *
   *
   * @param {any} event
   * @returns {null} no return
   * @memberof Signup
   */
  onFormSubmit(event) {
    event.preventDefault();
    this.props.signupAction(this.state);
  }

  /**
   *
   *
   * @returns {html} DOM elements
   *
   * @memberof Signup
   */
  render() {
    if (this.props.status.valid) {
      return (<Redirect
        push
        to={{
          pathname: `/dashboard/mydocuments/${this.props.status.user.id}`
        }}
      />);
    }

    return (
      <div className="row landing-page">
        <div className="row-container col s6 m6 offset-s3 offset-m3">
          <div className="welcome-text"> Welcome to Doc-mgt.</div>
          <form onSubmit={this.onFormSubmit} className="col s12 signup-form">
            <div className="row">
              <div className="input-field col s6">
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  className="valdate"
                  value={this.state.firstName}
                  onChange={this.onInputChange}
                />
                <label htmlFor="firstName">First Name</label>
              </div>
              <div className="input-field col s6">
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  className="valdate"
                  value={this.state.lastName}
                  onChange={this.onInputChange}
                />
                <label htmlFor="lastName">Last Name</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input
                  id="username"
                  name="username"
                  type="text"
                  className="validate"
                  value={this.state.username}
                  onChange={this.onInputChange}
                />
                <label htmlFor="username">Username</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input
                  id="email"
                  name="email"
                  type="text"
                  className="validate"
                  value={this.state.email}
                  onChange={this.onInputChange}
                />
                <label htmlFor="email">Email</label>
              </div>
            </div>

            <div className="row">
              <div className="input-field col s12">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={this.state.password}
                  onChange={this.onInputChange}
                />
                <label htmlFor="password">Password</label>
              </div>
            </div>

            <div className="row">
              <div className="input-field col s12">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={this.state.confirmPassword}
                  onChange={this.onInputChange}
                />
                <label htmlFor="password">Confrim Password</label>
              </div>
            </div>
            <button className="btn">Submit</button>
            <span className="loginPS">
            Have an account? <Link to="/">login here</Link>
            </span>

          </form>
        </div>
      </div>
    );
  }

}
const mapDispatchToProps =
  dispatch => bindActionCreators({ signupAction }, dispatch);

const mapStateToProps = state => ({
  status: state.auth
});

Signup.getDefaultProps = {
  documents: {},
  status: {},
  signupAction: () => { },

};
Signup.propTypes = {
  status: PropTypes.shape({
    valid: PropTypes.bool,
    user: PropTypes.object,
    id: PropTypes.number,
  }),
  signupAction: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
