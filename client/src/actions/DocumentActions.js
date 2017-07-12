import axios from 'axios';
import toastr from 'toastr';
import types from './ActionTypes';

/**
 * adddocument contains the document details
 * @param {any} payload
 * @returns {null} no return
 */
const addDocumentSuccess = payload => ({
  type: types.ADD_DOCUMENT, payload
});

/**
 * Adds a document via an API call
 * @param {any} payload
 * @returns{promise} returns a promise
 */
const addDocument = payload => dispatch => axios
  .post('/documents', payload)
  .then((res) => {
    dispatch(addDocumentSuccess(res.data));
  })
  .catch((error) => {
    toastr.error(error.response.data.message.errors[0].message);
  });


/**
 * contains the document details
 * @param {any} payload
 * @returns {null} no return
 */
const getDocumentSuccess = payload => ({
  type: types.GET_DOCUMENTS, payload
});

/**
 * gets document via an API call
 * @param {any} limit
 * @param {any} offset
  * @returns{promise} returns a promise
 */
const getDocument = (limit, offset) => dispatch => axios
  .get(`/documents/?limit=${limit}&offset=${offset}`)
  .then((res) => {
    dispatch(getDocumentSuccess(res.data));
  })
  .catch((error) => {
    toastr.error(error.response.data.message);
  });

/**
 * contains document details
 * @param {any} payload
 * @returns{null} no return
 */
const getMyDocumentSuccess = payload => ({
  type: types.GET_MY_DOCUMENTS, payload
});

/**
 * Gets a user document via an API call
 * @param {any} id
 * @param {any} limit
 * @param {any} offset
 * @returns{promise} returns a promise
 */
const getMyDocument = (id, limit, offset) => dispatch => axios
  .get(`/users/${id}/documents/?limit=${limit}&offset=${offset}`)
  .then((res) => {
    dispatch(getMyDocumentSuccess(res.data));
  })
  .catch((error) => {
    toastr.error(error.response.data.message);
  });

/**
 * contains searched document details
 * @param {any} payload
 * @return {null} no return
 */
const searchDocumentSuccess = payload => ({
  type: types.SEARCH_DOCUMENTS, payload
});

/**
 * serch for a document via an API call
 * @param {any} query
 * @param {any} limit
 * @param {any} offset
 * @returns{promise} returns a promise
 */
const searchDocument = (query, limit, offset) => dispatch => axios
  .get(`/search/documents/?q=${query}&limit=${limit}&offset=${offset}`)
  .then((res) => {
    dispatch(searchDocumentSuccess(res.data));
  })
  .catch((error) => {
    toastr.error(error.response.data.message);
  });


/**
 * contains the delete document details
 * @param {any} payload
 * @returns{null} no return
 */
const deleteDocumentSuccess = payload => ({
  type: types.DELETE_DOCUMENT, payload
});

/**
 * deletes a document via an API call
 * @param {any} id
 * @returns{promise} returns a promise
 */
const deleteDocument = id => dispatch => axios
  .delete(`/documents/${id}`)
  .then((res) => {
    dispatch(deleteDocumentSuccess(res.data));
  })
  .catch((error) => {
    toastr.error(error.response.data.message);
  });


/**
 * contains update document details
 * @param {any} payload
 * @returns{null} no return
 */
const updateDocumentSuccess = payload => ({
  type: types.UPDATE_DOCUMENT, payload
});
/**
 * update a document via an API call
 * @param {any} data
 * @returns {null} no return
 */
const updateDocument = data => dispatch => axios
  .put(`/documents/${data.id}`, data)
  .then((res) => {
    dispatch(updateDocumentSuccess(res.data));
  })
  .catch((error) => {
    toastr.error(error.response.data.message);
  });


/**
 * contains get single document details
 *
 * @param {any} payload
 * @returns {null} no return
 */
const getSingleDocumentSuccess = payload => ({
  type: types.GET_SINGLE_DOCUMENT, payload
});

/**
 * Gets a single document via an API call
 * @param {any} id
 * @returns{promise} returns a promise
 */
const getSingleDocument = id => dispatch => axios
  .get(`documents/${id}`)
  .then((res) => {
    dispatch(getSingleDocumentSuccess(res.data));
  })
  .catch((error) => {
    toastr.error(error.response.data.message);
  });


export {
  addDocument, getDocument, getSingleDocument,
  deleteDocument, updateDocument, getMyDocument,
  searchDocument, addDocumentSuccess, getDocumentSuccess,
  getMyDocumentSuccess, searchDocumentSuccess, deleteDocumentSuccess,
  updateDocumentSuccess, getSingleDocumentSuccess,
};
