import axios from 'axios';
import types from './ActionTypes';

const addDocumentSuccess = payload => ({
  type: types.ADD_DOCUMENTS, payload
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
const deleteDocumentSuccess = payload => ({
  type: types.DELETE_DOCUMENTS, payload
});
const getSingleDocumentSuccess = payload => ({
  type: types.GET_SINGLE_DOCUMENTS, payload
});

const getDocument = () => dispatch => axios
  .get('/documents')
  .then((res) => {
    dispatch(getDocumentSuccess(res.data));
  })
  .catch((error) => { throw (error); });

const deleteDocument = id => dispatch => axios
  .delete(`documents/${id}`)
  .then((res) => {
    dispatch(deleteDocumentSuccess(res.data));
  })
  .catch((error) => { throw (error); });

const getSingleDocument = id => dispatch => axios
  .get(`documents/${id}`)
  .then((res) => {
    dispatch(getSingleDocumentSuccess(res.data));
  })
  .catch((error) => { throw (error); });

export { addDocument, getDocument, getSingleDocument, deleteDocument };
