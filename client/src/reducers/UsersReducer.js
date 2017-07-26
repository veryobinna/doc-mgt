import types from '../actions/ActionTypes';

/**
 * user reducer
 * @param {any} [state={ users: [] }]
 * @param {any} action
 * @returns {object} payload
 */
const usersReducer = (state = { users: [] }, action) => {
  let users;
  switch (action.type) {
    case types.GET_USERS:
      users = { users: action.payload };
      return { ...state, ...users };

    case types.GET_SINGLE_USER:
      users = { users: action.payload };
      return { ...state, ...users };

    case types.UPDATE_USER:
      users = { users: action.payload };
      return { ...state, ...users };

    case types.SEARCH_USERS:
      users = { users: action.payload };
      return { ...state, ...users };

    default:
      return state;
  }
};
export default usersReducer;
