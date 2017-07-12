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
    dispatch(loginDetails(res.data));
    if (!test) {
      const { token } = res.data;
      setAuthorizationToken(token);
      localStorage.setItem('token', token);
      toastr.success('successful');
    }
  })
  .catch((error) => {
    if (!test) {
      toastr.error(error.response.data.message);
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


export { LoginAction, LogoutAction, loginDetails };
