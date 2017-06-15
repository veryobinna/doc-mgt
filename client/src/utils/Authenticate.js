import axios from 'axios';

/**
 *
 * @export
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
