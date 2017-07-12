import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { getSingleUser, updateUser } from '../actions/UserActions';

/**
 *
 *
 * @class UpdateUser
 * @extends {Component}
 */
export class UpdateUser extends Component {
  /**
   * Creates an instance of UpdateUser.
   * @param {any} props
   *
   * @memberof UpdateUser
   */
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
  /**
   *
   *
   * @returns {null} no return
   * @memberof UpdateUser
   */
  componentWillMount() {
    this.props.getSingleUser(this.props.match.params.id);
  }

  /**
   *
   *
   * @param {any} nextProps
   * @returns {null} no return
   * @memberof UpdateUser
   */
  componentWillReceiveProps(nextProps) {
    this.setState({
      id: nextProps.users.id,
      firstName: nextProps.users.firstName,
      lastName: nextProps.users.lastName,
      username: nextProps.users.username,
      email: nextProps.users.email,
      roleID: nextProps.users.roleID
    });
  }
  /**
   *
   *
   * @param {any} event
   * @returns {null} no return
   * @memberof UpdateUser
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
   * @memberof UpdateUser
   */
  onFormSubmit(event) {
    event.preventDefault();
    this.props.updateUser(this.state);
  }

  /**
   *
   *
   * @returns {html} DOM element
   *
   * @memberof UpdateUser
   */
  render() {
    return (
      <div className="row container col s12 m12 l9">
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

UpdateUser.getDefaultProps = {
  users: {},
  updateUser: () => { },
  getSingleUser: () => {},
  match: {},
};
UpdateUser.propTypes = {
  users: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  updateUser: PropTypes.func,
  getSingleUser: PropTypes.func,
  match: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateUser);
