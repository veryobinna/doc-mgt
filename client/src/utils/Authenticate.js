import axios from 'axios';

/**
 *
 * @export
 * @returns {null} no return
 * @param {any} token
 */
const setAuthorizationToken = (token) => {
  if (token) {
    
    axios.defaults.headers.common.Authorization = token;
  } else {
    axios.defaults.headers.common.Authorization = null;
  }
};
export default setAuthorizationToken;
