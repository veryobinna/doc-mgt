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
   * calls the getSingleUser action on mount
   * @returns {null} no return
   * @memberof UpdateUser
   */
  componentWillMount() {
    this.props.getSingleUser(this.props.match.params.id);
  }

  /**
   * sets the state to the new props
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
   * sets the istate to the input value
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
   * calls the updatedocument action and redirects to users component
   * @param {any} event
   * @returns {null} no return
   * @memberof UpdateUser
   */
  onFormSubmit(event) {
    event.preventDefault();
    this.props.updateUser(this.state);
    this.props.history.replace('/dashboard/users');
  }

  /**
   * renders the UpdateUser component
   * @returns {html} DOM element
   * @memberof UpdateUser
   */
  render() {
    return (
      <div className="update-users row container col s12 m12 l9">
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
          </div>
          <div className="input-field">
            <select
              className="browser-default"
              id="roleID"
              value={`${this.state.roleID}`}
              onChange={this.onInputChange}
            >
              <option value="" disabled>Role Title</option>
              <option value="1">Admin</option>
              <option value="2">moderator</option>
              <option value="3">regular</option>
            </select>
            <label htmlFor="roleID" className="active" >Role Title</label>
          </div>
          <div className="row">
            <div className="input-field">
              <button className="btn-update btn">Update</button>
            </div>
          </div>
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
  history: {},
};
UpdateUser.propTypes = {
  users: PropTypes.shape({
    id: PropTypes.number,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    username: PropTypes.username,
    email: PropTypes.email,
    roleID: PropTypes.roleID,
  }),
  updateUser: PropTypes.func,
  getSingleUser: PropTypes.func,
  match: PropTypes.shape({
    params: PropTypes.object,
    url: PropTypes.string
  }),
  history: PropTypes.shape({
    replace: PropTypes.func
  }),
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateUser);
