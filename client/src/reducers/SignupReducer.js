import types from '../actions/ActionTypes';

/**
 *
 *
 * @param {any} [state={}]
 * @param {any} action
 * @returns {object} payload
 */
const signupReducer = (state = {}, action) => {
  switch (action.type) {
    case types.SIGNUP_DETAILS:
      return action.payload;
    default:
      return state;
  }
};
export default signupReducer;
