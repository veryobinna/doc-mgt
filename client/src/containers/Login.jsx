import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
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
    this.props.LoginAction(this.state).then(
      this.props.history.replace('/dashboard')
      );
  }
  render() {
    return (
      <div className="container landing-page">
        <div className="row">
          <div className="col s6 offset-s6">
            <form onSubmit={this.onFormSubmit}>
              <label
                htmlFor="loginID"
                data-error="wrong"
                data-success="right"
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
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps =
  dispatch => bindActionCreators({ LoginAction }, dispatch);

// state is a function param that reps the state within our redux store
// state.login refs what's in index reducer
const mapStateToProps = state => ({
  status: state.login
});

Login.getDefaultProps = {
  LoginAction: () => { },
  history: {}
};
Login.propTypes = {
  LoginAction: PropTypes.func,
  history: PropTypes.object // eslint-disable-line react/forbid-prop-types
};

// take the result of the first fuction with two parameter,
// then pass the second guy,login, to the result
export default connect(mapStateToProps, mapDispatchToProps)(Login);
