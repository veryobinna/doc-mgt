import axios from 'axios';
import toastr from 'toastr';

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

const signup = userParams => dispatch => axios
  .post('/users', userParams)
  .then((res) => {
    dispatch(signupDetails(res.data));
    toastr.success('successful');
    console.log('signup res',res.data)
  })
    .catch((error) => {
      console.log('errorr message ', error.response.data.message)
      toastr.error(error.response.data.message.errors[0].message);
    });

export default signup;
