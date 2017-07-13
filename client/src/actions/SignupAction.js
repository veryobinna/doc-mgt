import axios from 'axios';
import toastr from 'toastr';
import types from './ActionTypes';
import setAuthorizationToken from '../utils/Authenticate';

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
const signup = userParams => dispatch => axios
  .post('/users', userParams)
  .then((res) => {
    const { token } = res.data;
    setAuthorizationToken(token);
    localStorage.setItem('token', token);
    dispatch(signupDetails(res.data));
    toastr.success('successful');
  })
  .catch((error) => {
    toastr.error(error.response.data.message.errors[0].message);
  });

export { signup, signupDetails };
