import { expect } from 'chai';
import { addDocumentSuccess, getDocumentSuccess,
getMyDocumentSuccess, searchDocumentSuccess,
 updateDocumentSuccess,
getSingleDocumentSuccess,
 } from '../../src/actions/DocumentActions';
import DocumentReducer from '../../src/reducers/DocumentReducer';

describe('Document Reducer', () => {
  describe('addDocumentSuccess', () => {
    it('should save the new document in store', () => {
      const payload = {
        id: 1,
        content: 'Fred',
      };
      const action = addDocumentSuccess(payload);
      const newState = DocumentReducer({ }, action);
      expect(newState.documents.id).to.eql(action.payload.id);
    });
  });
  describe('getDocumentSuccess', () => {
    it('should save the new document in store', () => {
      const payload = {
        id: 1,
        content: 'Fred',
      };
      const action = getDocumentSuccess(payload);
      const newState = DocumentReducer({ }, action);
      expect(newState.documents.id).to.eql(action.payload.id);
    });
  });
  describe('getMyDocumentSuccess', () => {
    it('should save the new document in store', () => {
      const payload = {
        id: 1,
        content: 'Fred',
      };
      const action = getMyDocumentSuccess(payload);
      const newState = DocumentReducer({ }, action);
      expect(newState.documents.id).to.eql(action.payload.id);
    });
  });
  describe('searchDocumentSuccess', () => {
    it('should save the new document in store', () => {
      const payload = {
        id: 1,
        content: 'Fred',
      };
      const action = searchDocumentSuccess(payload);
      const newState = DocumentReducer({ }, action);
      expect(newState.documents.id).to.eql(action.payload.id);
    });
  });
  // describe('deleteDocumentSuccess', () => {
  //   it('should save the new document in store', () => {
  //     const payload = {
  //       id: 1,
  //       content: 'Fred',
  //     };
  //     const action = deleteDocumentSuccess(payload);
  //     const newState = DocumentReducer({ }, action);
  //     expect(newState.documents).to.eql(action.payload);
  //   });
  // });
  describe('updateDocumentSuccess', () => {
    it('should save the new document in store', () => {
      const payload = {
        id: 1,
        content: 'Fred',
      };
      const action = updateDocumentSuccess(payload);
      const newState = DocumentReducer({ }, action);
      expect(newState.documents.id).to.eql(action.payload.id);
    });
  });
  describe('getSingleDocumentSuccess', () => {
    it('should save the new document in store', () => {
      const payload = {
        id: 1,
        content: 'Fred',
      };
      const action = getSingleDocumentSuccess(payload);
      const newState = DocumentReducer({ }, action);
      expect(newState.documents.id).to.eql(action.payload.id);
    });
  });
});
