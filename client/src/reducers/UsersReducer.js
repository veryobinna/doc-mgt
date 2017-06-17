import types from '../actions/ActionTypes';

const usersReducer = (state = { users: [] }, action) => {
  let users;
  switch (action.type) {
    case types.GET_USERS:
      users = { users: action.payload };
      return action.payload

    // case types.GET_SINGLE_DOCUMENT:
    //   docs = { documents: action.payload };
    //   return { ...state, ...docs };

    // case types.UPDATE_DOCUMENT:
    //   docs = { documents: action.payload };
    //   return { ...state, ...docs };

    // case types.ADD_DOCUMENTS:
    //   docs = { documents: action.payload };
    //   return { ...state, ...docs };

    default:
      return state;
  }
};
export default usersReducer;
