import types from '../actions/ActionTypes';
import TokenValidator from '../utils/TokenValidator';

const loginReducer = (state = TokenValidator(), action) => {
  switch (action.type) {
    case types.LOGIN_DETAILS:
        console.log('document reducer', action.payload);

      return action.payload;
    default:
      return state;
  }
};
export default loginReducer;
