import axios from 'axios';
import toastr from 'toastr';
import types from './ActionTypes';

const addDocumentSuccess = payload => ({
  type: types.ADD_DOCUMENT, payload
});

const addDocument = payload => dispatch => axios
  .post('/documents', payload)
  .then((res) => {
    dispatch(addDocumentSuccess(res.data));
  })
  .catch((error) => {
    toastr.error(error.response.data.message.errors[0].message);
  });


const getDocumentSuccess = payload => ({
  type: types.GET_DOCUMENTS, payload
});

const getDocument = () => dispatch => axios
  .get('/documents')
  .then((res) => {
    dispatch(getDocumentSuccess(res.data));
  })
  .catch((error) => {
    toastr.error(error.response.data.message);
  });

const getMyDocumentSuccess = payload => ({
  type: types.GET_MY_DOCUMENTS, payload
});

const getMyDocument = id => dispatch => axios
  .get(`/users/${id}/documents/`)
  .then((res) => {
    dispatch(getMyDocumentSuccess(res.data));
  })
  .catch((error) => {
    toastr.error(error.response.data.message);
  });

const searchDocumentSuccess = payload => ({
  type: types.SEARCH_DOCUMENTS, payload
});

const searchDocument = value => dispatch => axios
  .get(`/search/documents/?q=${value}`)
  .then((res) => {
    console.log('we got to the search document area', res)
    dispatch(searchDocumentSuccess(res.data.document));
  })
  .catch((error) => {
    toastr.error(error.response.data.message);
  });


const deleteDocumentSuccess = payload => ({
  type: types.DELETE_DOCUMENT, payload
});

const deleteDocument = id => dispatch => axios
  .delete(`documents/${id}`)
  .then((res) => {
    dispatch(deleteDocumentSuccess(res.data));
  })
  .catch((error) => {
    console.log('deleete error', error.response);
    toastr.error(error.response.data.message);
  });


const updateDocumentSuccess = payload => ({
  type: types.UPDATE_DOCUMENT, payload
});
const updateDocument = data => dispatch => axios
  .put(`documents/${data.id}`, data)
  .then((res) => {
    dispatch(updateDocumentSuccess(res.data));
  })
  .catch((error) => {
    toastr.error(error.response.data.message);
  });


const getSingleDocumentSuccess = payload => ({
  type: types.GET_SINGLE_DOCUMENT, payload
});

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
  searchDocument
};
