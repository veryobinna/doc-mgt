import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect, Link } from 'react-router-dom';
import loginAction from '../actions/LoginAction';
import Documents from '../containers/GetDocument';
import Sidebar from '../components/Sidebar';
import GetUsers from '../containers/GetUsers'

class Dashboard extends Component {

  render() {
    if (!this.props.status.valid) {
      console.log('should redirect');
      return (<Redirect
        push
        to={{
          pathname: '/login',
        }}
      />);
    }
    return (
      <div>
        <div className="navbar-fixed">
      <nav>
        <div className="nav-wrapper">
          <Link to="/documents" className="brand-logo">Logo</Link>
          <ul className="right hide-on-med-and-down">
            <li><a href="sass.html">Sass</a></li>
            <li><a href="badges.html">Components</a></li>
          </ul>
        </div>
      </nav>
    </div>
        <div>name: {this.props.status.user.firstName} </div>
        <div className="container document-container">
          <Documents />
          <GetUsers />
        </div>
      </div>
    );
  }
}

/* const Dashboard = () => (
  <div>
    <div className="navbar-fixed">
      <nav>{console.log(TokenValidator())}
        <div className="nav-wrapper">
          <Link to="/documents" className="brand-logo">Logo</Link>
          <ul className="right hide-on-med-and-down">
            <li><a href="sass.html">Sass</a></li>
            <li><a href="badges.html">Components</a></li>
          </ul>
        </div>
      </nav>
    </div>
    <Sidebar />
    <div className="container document-container">
      <Documents />
    </div>
  </div>
);*/
const mapDispatchToProps =
  dispatch => bindActionCreators({ loginAction }, dispatch);

const mapStateToProps = state => ({
  status: state.login
});
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

