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
    delete axios.defaults.headers.common.Authorization;
  }
};
export default setAuthorizationToken;
