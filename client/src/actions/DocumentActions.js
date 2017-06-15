import axios from 'axios';
import types from './ActionTypes';


const addDocumentSuccess = payload => ({
  type: types.ADD_DOCUMENT, payload
});

const addDocument = payload => dispatch => axios
  .post('/documents', payload)
  .then((res) => {
    dispatch(addDocumentSuccess(res.data));
  })
  .catch((error) => { throw (error); });


const getDocumentSuccess = payload => ({
  type: types.GET_DOCUMENTS, payload
});

const getDocument = () => dispatch => axios
  .get('/documents')
  .then((res) => {
    dispatch(getDocumentSuccess(res.data));
  })
  .catch((error) => { throw (error); });


const deleteDocumentSuccess = payload => ({
  type: types.DELETE_DOCUMENT, payload
});

const deleteDocument = id => dispatch => axios
  .delete(`documents/${id}`)
  .then((res) => {
    dispatch(deleteDocumentSuccess(res.data));
  })
  .catch((error) => { throw (error); });


const updateDocumentSuccess = payload => ({
  type: types.UPDATE_DOCUMENT, payload
});
const updateDocument = data => dispatch => axios
  .put(`documents/${data.id}`, data)
  .then((res) => {
    dispatch(updateDocumentSuccess(res.data));
  })
  .catch((error) => { throw (error); });


const getSingleDocumentSuccess = payload => ({
  type: types.GET_SINGLE_DOCUMENT, payload
});

const getSingleDocument = id => dispatch => axios
  .get(`documents/${id}`)
  .then((res) => {
    dispatch(getSingleDocumentSuccess(res.data));
  })
  .catch((error) => { throw (error); });


export {
  addDocument, getDocument, getSingleDocument,
  deleteDocument, updateDocument
};
