import axios from 'axios';
import toastr from 'toastr';
import setAuthorizationToken from '../utils/Authenticate';
import types from './ActionTypes';

const test = process.env.NODE_ENV === 'test';
/**
 * LoginDetails contains the dispatched Login action
 * payload has no parenthesis because it is a single function argument
 * with no curly braces
 * @param {any} payload
 * @returns {null} no return
 */
const loginDetails = payload => ({
  type: types.LOGIN_DETAILS, payload
});


/**
 * Calls the API and returns the user details and token
 * @param {any} userParams
 * @returns{promise} returns a promise
 */
const LoginAction = userParams => dispatch => axios
  .post('/login', userParams)
  .then((res) => {
    if (!test) {
      const { token } = res.data;
      setAuthorizationToken(token);
      localStorage.setItem('token', token);
      dispatch(loginDetails(res.data));
      toastr.success('successful');
    } else {
      dispatch(loginDetails(res.data));
    }
  })
  .catch((error) => {
    if (!test) {
      toastr.error(error.response.data.message);
    }
  });







/**
 * SignupDetails contains the user details
 * payload has no parenthesis because it is a single function argument
 * with no curly braces
 * @param {any} payload
 * @returns {null} no return
 */
const signupDetails = payload => ({
  type: types.SIGNUP_DETAILS, payload
});

/**
 * Sends the user details to the API
 * @param {any} userParams
 * @returns{promise} returns a promise
 */
const signupAction = userParams => dispatch => axios
  .post('/users', userParams)
  .then((res) => {
    if (!test) {
      const { token } = res.data;
      setAuthorizationToken(token);
      localStorage.setItem('token', token);
      dispatch(signupDetails(res.data));
      toastr.success('successful');
    } else {
      dispatch(signupDetails(res.data));
    }
  })
  .catch((error) => {
    if (!test) {
      toastr.error(error.response.data.message.errors[0].message);
    }
  });





/**
 * Clears the token from the local storage
 *
 * @returns {object} dispatched the user details
 */
const LogoutAction = () => {
  window.localStorage.removeItem('token');
  return {
    type: types.LOG_OUT, payload: { user: null }
  };
};


export { LoginAction, signupAction, LogoutAction, loginDetails };
