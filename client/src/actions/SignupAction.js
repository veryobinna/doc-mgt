import axios from 'axios';
import types from './ActionTypes';
/**
 * payload has no parenthesis because it is a single function argument
 * with no curly braces
 * @param {any} payload
 * @returns {null} no return
 */
const signupDetails = payload => ({
  type: types.SIGNUP_DETAILS, payload
});

const signup = userParams => (dispatch) => {
  axios
  .post('/users', userParams)
  .then((res) => {
    dispatch(signupDetails(res.data));
  })
    .catch((error) => { throw (error); });
};

export default signup;
