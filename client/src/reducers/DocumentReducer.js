import types from '../actions/ActionTypes';

const doumentReducer = (state = { documents: [] }, action) => {
  switch (action.type) {
    case types.GET_DOCUMENTS:
      return action.payload;

    case types.ADD_DOCUMENTS:
      return action.payload;

    default:
      return state;
  }
};
export default doumentReducer;
