import types from '../actions/ActionTypes';

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

    // case types.ADD_DOCUMENTS:
    //   docs = { documents: action.payload };
    //   return { ...state, ...docs };

    default:
      return state;
  }
};
export default usersReducer;
