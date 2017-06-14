import types from '../actions/ActionTypes';

const documentReducer = (state = { documents: [] }, action) => {
  switch (action.type) {
    case types.GET_DOCUMENTS:
      console.log(action.payload, 'payload');
      const docs = { documents: action.payload };

      return action.payload

    case types.GET_SINGLE_DOCUMENTS:
      console.log('document Reducer', action.payload);
      return action.payload;

    case types.ADD_DOCUMENTS:

      return action.payload;

    default:
      return state;
  }
};
export default documentReducer;
