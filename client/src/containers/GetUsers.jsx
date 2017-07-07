import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import toastr from 'toastr';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';
import { getUsers, deleteUser, searchUsers } from '../actions/UserActions';
import ShowDocument from '../components/ShowDocument';
import ShowUsers from '../components/ShowUsers';
import SearchBar from '../components/SearchBar';

class GetUsers extends Component {
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

  componentWillMount() {
    this.getUsers();
  }
  getUsers() {
    this.setState({
      search: false,
      getUsers: true,
    });
    this.props.getUsers(this.state.limit, this.state.offset);
    console.log('the search qury, limit and offset', this.state.query, this.state.limit, this.state.offset);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ users: nextProps.users, paginate: nextProps.paginate });
  }

  onSearch(event) {
    if (event) {
      this.state.query = event.target.value;
    }
    this.setState({
      search: true,
      getUsers: false,
    });
    console.log('the search qury, limit and offset', this.state.query, this.state.limit, this.state.offset);

    this.props.searchUsers(this.state.query, this.state.limit, this.state.offset);
  }
  onPageClick(event) {
    const selected = event.selected;
    const offset = selected * 5;

    if (this.state.search) {
      this.setState({ offset, users:[{}] },
        this.onSearch // callback
      );
    }
    if (this.state.getUsers) {
      this.setState({ offset },
        this.getUsers // callback
      );
    }
  }
  deleteUser(id) {
    this.props.deleteUser(id)
      .then(() => {
        this.props.getUsers();
      });
  }
  render() {
    console.log('this.users details.......', this.state.users);
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
        />
      </div>
    );
  }
}

const mapDispatchToProps =
  dispatch => bindActionCreators({ getUsers, deleteUser, searchUsers }, dispatch);

const mapStateToProps = state => ({
  users: state.usersReducer.users.users,
  paginate: state.usersReducer.users.paginate
});

export default connect(mapStateToProps, mapDispatchToProps)(GetUsers);
