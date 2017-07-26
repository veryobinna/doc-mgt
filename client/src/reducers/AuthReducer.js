import types from '../actions/ActionTypes';
import TokenValidator from '../utils/TokenValidator';

/**
 * Reducer for  signin, login, logout
 * @param {any} [state=TokenValidator()]
 * @param {any} action
 * @returns {object} payload
 */
const AuthReducer = (state = TokenValidator(), action) => {
  switch (action.type) {
    case types.LOGIN_DETAILS: {
      const logs = { login: action.payload };
      return { ...state, ...TokenValidator(), ...logs };
    }

    case types.SIGNUP_DETAILS: {
      const logs = { data: action.payload };
      return { ...state, ...TokenValidator(), ...logs };
    }

    case types.LOG_OUT: {
      const logs = { login: action.payload };
      return { ...state, ...TokenValidator(), ...logs };
    }

    default:
      return state;
  }
};
export default AuthReducer;
