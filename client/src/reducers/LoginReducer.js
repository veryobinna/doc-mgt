import types from '../actions/ActionTypes';
import TokenValidator from '../utils/TokenValidator';

const loginReducer = (state = TokenValidator(), action) => {
  let logs;
  switch (action.type) {
    case types.LOGIN_DETAILS:
      logs = { login: action.payload };
      return { ...state, ...TokenValidator(), ...logs };

    case types.LOG_OUT:
      logs = { login: action.payload };

      return { ...state, ...TokenValidator(), ...logs };
    default:
      return state;
  }
};
export default loginReducer;
