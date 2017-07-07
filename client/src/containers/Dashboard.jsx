import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { LoginAction, LogoutAction } from '../actions/LoginAction';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';


/**
 *
 *
 * @param {any} props
 * @returns {html} DOM element
 */
const Dashboard = (props) => {
  if (!props.status.valid) {
    return (<Redirect
      push
      to={{
        pathname: '/login',
      }}
    />);
  }

  return (
    <div className="">
      <Navbar />
      <div className="col s3">
        <Sidebar {...props} />
      </div>
    </div>
  );
};
Dashboard.getDefaultProps = {
  status: {},
  valid: false
};
Dashboard.propTypes = {
  status: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  valid: PropTypes.bool,
};

const mapDispatchToProps =
  dispatch => bindActionCreators({ LoginAction, LogoutAction }, dispatch);

const mapStateToProps = state => ({
  status: state.login
});
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

