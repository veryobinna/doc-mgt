import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';
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
    this.redirect = this.redirect.bind(this);

  }
  onInputChange(event) {
    const name = event.target.id;
    const value = event.target.value;
    this.setState({ [name]: value });
    console.log(this.state);
  }
  onFormSubmit(event) {
    event.preventDefault();
    this.props.SignupAction(this.state).then(
      this.props.history.replace('/login')
    )
  }
  redirect() {
    return (<Redirect to="/login" />);
  }

  render() {
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
                id="firstName"
                type="text"
                className="valdate"
                value={this.state.firstName}
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

export default connect(mapStateToProps, mapDispatchToProps)(Signup);







           /*<div className="container landing-page">
        <div className="row">
          <div className="col s6 offset-s6">
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
          </div>
        </div>
      </div>*/