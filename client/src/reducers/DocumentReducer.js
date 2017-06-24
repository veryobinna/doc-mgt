import types from '../actions/ActionTypes';

const documentReducer = (state = { documents: {} }, action) => {
  let docs;
  switch (action.type) {
    case types.GET_DOCUMENTS:
      docs = { documents: action.payload };
      return { ...state, ...docs };

    case types.SEARCH_DOCUMENTS:
      docs = { documents: action.payload };
      return { ...state, ...docs };

    case types.GET_MY_DOCUMENTS:
      docs = { documents: action.payload };
      return { ...state, ...docs };

    case types.GET_SINGLE_DOCUMENT:
      docs = { documents: action.payload };
      return { ...state, ...docs };

    case types.UPDATE_DOCUMENT:
      docs = { documents: action.payload };
      return { ...state, ...docs };

    case types.ADD_DOCUMENTS:
      docs = { documents: action.payload };
      return { ...state, ...docs };

    default:
      return state;
  }
};
export default documentReducer;
