import types from '../actions/ActionTypes';

const loginReducer = (state = {}, action) => {
  switch (action.type) {
    case types.LOGIN_DETAILS:
      return action.payload;
    default:
      return state;
  }
};
export default loginReducer;
