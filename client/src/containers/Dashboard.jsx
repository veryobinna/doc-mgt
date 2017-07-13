import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { LoginAction, LogoutAction } from '../actions/AuthAction';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';


/**
 *
 *
 * @param {any} props
 * @returns {html} DOM element
 */
export const Dashboard = props => (
  <div className="">
    <Navbar />
    <div className="col s3">
      <Sidebar {...props} />
    </div>
    <Footer />
  </div>
  );
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
  status: state.auth
});
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

