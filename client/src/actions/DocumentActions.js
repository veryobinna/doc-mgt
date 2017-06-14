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

const getDocument = () => dispatch => axios
  .get('/documents')
  .then((res) => {
    dispatch(getDocumentSuccess(res.data));
  })
  .catch((error) => { throw (error); });

export { addDocument, getDocument };
