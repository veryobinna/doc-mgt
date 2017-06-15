import axios from 'axios';
import setAuthorizationToken from '../utils/Authenticate';
import types from './ActionTypes';
/**
 * payload has no parenthesis because it is a single function argument
 * with no curly braces
 * @param {any} payload
 * @returns {null} no return
 */
const loginDetails = payload => ({
  type: types.LOGIN_DETAILS, payload
});

const login = userParams => dispatch => axios
  .post('/login', userParams)
  .then((res) => {
    const { token } = res.data;
    setAuthorizationToken(token);
    localStorage.setItem('token', token);
    dispatch(loginDetails(res.data));
  })
    .catch((error) => { throw (error); });


export default login;
