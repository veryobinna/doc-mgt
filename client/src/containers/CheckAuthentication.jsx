import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import TokenValidator from '../utils/TokenValidator';
import { LoginAction } from '../actions/AuthAction';

const checkAuthentication = TokenValidator();
export default (ComposedConmponent) => {
  /**
   * @class Authenticate
   * @extends {React.Component}
   */
  class Authenticate extends React.Component {

    /**
     * Creates an instance of Authenticate.
     * @param {object} props
     * @memberOf Authenticate
     */
    constructor(props) {
      super(props);
      this.state = {
        authenticated: checkAuthentication.valid
      };
    }

    /**
     * @memberOf Authenticate
     * @returns {null} no return
     */


    /**
     * @returns {element} DOM element ComposedConmponent
     * @memberOf Authenticate
     */
    render() {
      if (!this.props.status.valid) {
        return (<Redirect
          push
          to={{
            pathname: '/',
          }}
        />);
      }
      return (
        <ComposedConmponent {...this.props} />
      );
    }
  }

  Authenticate.getDefaultProps = {
    status: {}
  };

  Authenticate.propTypes = {
    status: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  };

  const mapStateToProps = state => ({
    status: state.auth
  });

  const mapDispatchToProps = dispatch => ({
    LoginAction: bindActionCreators(LoginAction, dispatch)
  });

  return connect(mapStateToProps, mapDispatchToProps)(Authenticate);
};

