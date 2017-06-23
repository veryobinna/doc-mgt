import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import SignupAction from '../actions/SignupAction';
import { Redirect, Link } from 'react-router-dom';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      password: ''
    };
    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      id: nextProps.status.id
    });
    console.log('the next props', nextProps);
  }
  onInputChange(event) {
    const name = event.target.id;
    const value = event.target.value;
    this.setState({ [name]: value });
  }
  onFormSubmit(event) {
    event.preventDefault();
    this.props.SignupAction(this.state);
    console.log('this signup props', this.props.status);
  }

  render() {
    if (typeof this.state.id === 'number') {
      return (<Redirect
        push
        to={{
          pathname: '/login',
        }}
      />);
    }

    return (
      <div className="row container landing-page">
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
              <label htmlFor="firstName">First Name</label>
            </div>
            <div className="input-field col s6">
              <input
                id="lastName"
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
                type="password"
                value={this.state.password}
                onChange={this.onInputChange}
              />
              <label htmlFor="password">Password</label>
            </div>
          </div>
          <button className="btn">Submit</button>
          <span className="loginPS"> Have an account? <Link to="/login">login here</Link></span>

        </form>
      </div>
    );
  }

}
const mapDispatchToProps =
  dispatch => bindActionCreators({ SignupAction }, dispatch);

const mapStateToProps = state => ({
  status: state.signup
});

Signup.getDefaultProps = {
  documents: {},
  history: {},
  SignupAction: () => { },

};
Signup.propTypes = {
  history: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  SignupAction: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
