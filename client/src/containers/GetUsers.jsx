import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import toastr from 'toastr';
import PropTypes from 'prop-types';
import { getUsers, deleteUser } from '../actions/UserActions';
import ShowDocument from '../components/ShowDocument';
import ShowUsers from '../components/ShowUsers';
import SearchBar from '../components/SearchBar';

class GetUsers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [{}],
    };
    this.deleteUser = this.deleteUser.bind(this);
  }

  componentWillMount() {
    this.props.getUsers();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ users: nextProps.users });
  }

  deleteUser(id) {
    this.props.deleteUser(id)
      .then(() => {
        this.props.getUsers();

      });
  }
  render() {
    console.log('this.props', this.props)
    const users = this.state.users.map((user) => {
      const items = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        email: user.email,
        roleID: user.roleID,
        deleteUser: this.deleteUser
      };
      return <ShowUsers key={Math.random()} {...items} />;
    });
    return (
      <div className="component-render">
        <SearchBar />
        <div className="row">
          {users}
        </div>
      </div>
    );
  }
}

const mapDispatchToProps =
  dispatch => bindActionCreators({ getUsers, deleteUser }, dispatch);

const mapStateToProps = state => ({
  users: state.usersReducer.users
});

// GetDocument.getDefaultProps = {
//   documents: {},
//   getDocument: () => { },
//   deleteDocument: () => { },

// };
// GetDocument.propTypes = {
//   documents: PropTypes.object, // eslint-disable-line react/forbid-prop-types
//   getDocument: PropTypes.func,
//   deleteDocument: PropTypes.func
// };

export default connect(mapStateToProps, mapDispatchToProps)(GetUsers);
