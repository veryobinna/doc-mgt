import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import swal from 'sweetalert';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';
import { getUsers, deleteUser, searchUsers } from '../actions/UserActions';
import ShowUsers from '../components/ShowUsers';
import SearchBar from '../components/SearchBar';

/**
 *
 *
 * @class GetUsers
 * @extends {Component}
 */
class GetUsers extends Component {
  /**
   * Creates an instance of GetUsers.
   * @param {any} props
   *
   * @memberof GetUsers
   */
  constructor(props) {
    super(props);
    this.state = {
      users: [{ Role: {} }],
      query: '',
      offset: 0,
      limit: 5,
      paginate: '',
      search: false,
      getUsers: false

    };
    this.deleteUser = this.deleteUser.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.onPageClick = this.onPageClick.bind(this);
    this.getUsers = this.getUsers.bind(this);
  }

  /**
   *
   *
   * @returns {null} no return
   * @memberof GetUsers
   */
  componentWillMount() {
    this.getUsers();
  }


  /**
   *
   *
   * @param {any} nextProps
   * @returns {null} no return
   * @memberof GetUsers
   */
  componentWillReceiveProps(nextProps) {
    this.setState({ users: nextProps.users, paginate: nextProps.paginate });
  }

  /**
   *
   *
   * @param {any} event
   * @returns {null} no return
   * @memberof GetUsers
   */
  onSearch(event) {
    if (event) {
      this.state.query = event.target.value;
    }
    this.setState({
      search: true,
      getUsers: false,
    });

    this.props.searchUsers(
      this.state.query,
    this.state.limit,
    this.state.offset);
  }
  /**
   *
   *
   * @param {any} event
   * @returns {null} no return
   * @memberof GetUsers
   */
  onPageClick(event) {
    const selected = event.selected;
    const offset = selected * 5;

    if (this.state.search) {
      this.setState({ offset, users: [{}] },
        this.onSearch // callback
      );
    }
    if (this.state.getUsers) {
      this.setState({ offset },
        this.getUsers // callback
      );
    }
  }
  /**
   *
   *
   * @returns {null} no return
   * @memberof GetUsers
   */
  getUsers() {
    this.setState({
      search: false,
      getUsers: true,
    });
    this.props.getUsers(this.state.limit, this.state.offset);
  }
  /**
   *
   *
   * @param {any} id
   * @returns {null} no return
   * @memberof GetUsers
   */
  deleteUser(id) {
    swal({
      title: 'Are you sure?',
      text: 'Are you sure that you want to delete this user?',
      type: 'warning',
      showCancelButton: true,
      closeOnConfirm: false,
      confirmButtonText: 'Yes, delete it!',
      confirmButtonColor: '#ec6c62'
    }, (isConfirm) => {
      if (isConfirm) {
        swal('Deleted!', 'User Deleted.', 'success');
        this.props.deleteUser(id)
      .then(() => {
        this.props.getUsers();
      });
      } else {
        swal('Cancelled', 'User not Deleted', 'error');
      }
    });
  }
  /**
   *
   *
   * @returns {html} DOM element
   *
   * @memberof GetUsers
   */
  render() {
    const users = this.state.users.map((user) => {
      const items = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        email: user.email,
        roleID: user.roleID,
        roleName: `${user.Role.name}`,
        deleteUser: this.deleteUser
      };
      return <ShowUsers key={Math.random()} {...items} />;
    });
    return (
      <div className="col s12 m12 l9">
        <SearchBar onSearch={this.onSearch} />
        <div className="row">
          {users}
        </div>
        {this.state.users.length > 0 &&
        <ReactPaginate
          initialPage={this.state.initialPage}
          previousLabel={'previous'}
          nextLabel={'next'}
          breakLabel={<a href="">...</a>}
          breakClassName={'break-me'}
          pageCount={this.state.paginate.pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={this.onPageClick}
          containerClassName={'pagination'}
          subContainerClassName={'pages pagination'}
          activeClassName={'active'}
        />}
        { this.state.users.length === 0 &&
        <div className="no-result">No user found </div>}
      </div>
    );
  }
}

const mapDispatchToProps =
  dispatch => bindActionCreators({
    getUsers, deleteUser, searchUsers
  }, dispatch);

const mapStateToProps = state => ({
  users: state.usersReducer.users.users,
  paginate: state.usersReducer.users.paginate
});

GetUsers.getDefaultProps = {
  users: {},
  id: '',
  status: {},
  deleteUser: () => { },
  searchUsers: () => { },
  getUsers: {},
  paginate: {}

};
GetUsers.propTypes = {
  users: PropTypes.shape({
    id: PropTypes.number,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    username: PropTypes.username,
    email: PropTypes.email,
    roleID: PropTypes.roleID,
  }),
  searchUsers: PropTypes.func,
  getUsers: PropTypes.func,
  deleteUser: PropTypes.func,
  paginate: PropTypes.shape({
    pageCount: PropTypes.object
  }),

};

export default connect(mapStateToProps, mapDispatchToProps)(GetUsers);
