import types from '../actions/ActionTypes';

/**
 *
 *
 * @param {any} [state={ documents: {} }]
 * @param {any} action
 * @returns {object} payload
 */
const documentReducer = (state = { documents: {} }, action) => {
  switch (action.type) {
    case types.GET_DOCUMENTS: {
      const docs = { documents: action.payload };
      return { ...state, ...docs }; }

    case types.SEARCH_DOCUMENTS: {
      const docs = { documents: action.payload };
      return { ...state, ...docs }; }

    case types.GET_MY_DOCUMENTS: {
      const docs = { documents: action.payload };
      return { ...state, ...docs }; }

    case types.GET_SINGLE_DOCUMENT: {
      const docs = { documents: action.payload };
      return { ...state, ...docs }; }

    case types.UPDATE_DOCUMENT: {
      const docs = { documents: action.payload };
      return { ...state, ...docs }; }

    case types.DELETE_DOCUMENT: {
      const docs = { documents: action.payload };
      return { ...state, ...docs }; }

    case types.ADD_DOCUMENT: {
      const docs = { documents: action.payload };
      return { ...state, ...docs }; }

    default:
      return state;
  }
};
export default documentReducer;
