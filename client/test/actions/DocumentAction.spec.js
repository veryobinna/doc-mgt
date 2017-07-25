import { expect } from 'chai';
import nock from 'nock';
import axios from 'axios';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import types from './../../src/actions/ActionTypes';
import {
  addDocumentSuccess, searchDocumentSuccess,
  getDocumentSuccess, getMyDocumentSuccess,
  deleteDocumentSuccess, updateDocumentSuccess,
  getSingleDocumentSuccess,
  addDocument, getDocument, getSingleDocument,
  deleteDocument, updateDocument, getMyDocument,
  searchDocument
} from '../../src/actions/DocumentActions';


axios.defaults.baseURL = 'http://localhost:3000/';
const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Document Action', () => {
  const payload = { id: 1, content: 'notes' };
  describe('AddDocumentSuccess ', () => {
    it('should create a Add_Document action type', () => {
      const expected = {
        type: types.ADD_DOCUMENT,
        payload
      };
      expect(addDocumentSuccess(payload)).to.eql(expected);
    });
  });
  describe('getDocumentSuccess ', () => {
    it('should create a GET_DOCUMENT action type', () => {
      const expected = {
        type: types.GET_DOCUMENTS,
        payload
      };
      expect(getDocumentSuccess(payload)).to.eql(expected);
    });
  });
  describe('getMyDocumentSuccess ', () => {
    it('should create a GET_MY_DOCUMENTS action type', () => {
      const expected = {
        type: types.GET_MY_DOCUMENTS,
        payload
      };
      expect(getMyDocumentSuccess(payload)).to.eql(expected);
    });
  });
  describe('searchDocumentSuccess ', () => {
    it('should create a SEARCH_DOCUMENTS action type', () => {
      const expected = {
        type: types.SEARCH_DOCUMENTS,
        payload
      };
      expect(searchDocumentSuccess(payload)).to.eql(expected);
    });
  });
  describe('deleteDocumentSuccess ', () => {
    it('should create a DELETE_DOCUMENT action type', () => {
      const expected = {
        type: types.DELETE_DOCUMENT,
        payload
      };
      expect(deleteDocumentSuccess(payload)).to.eql(expected);
    });
  });
  describe('updateDocumentSuccess ', () => {
    it('should create an UPDATE_DOCUMENT action type', () => {
      const expected = {
        type: types.UPDATE_DOCUMENT,
        payload
      };
      expect(updateDocumentSuccess(payload)).to.eql(expected);
    });
  });
  describe('getSingleDocumentSuccess ', () => {
    it('should create a GET_SINGLE_DOCUMENT action type', () => {
      const expected = {
        type: types.GET_SINGLE_DOCUMENT,
        payload
      };
      expect(getSingleDocumentSuccess(payload)).to.eql(expected);
    });
  });


  describe('Document Actions', () => {
    afterEach(() => {
      nock.cleanAll();
    });
    it('dispatches ADD_DOCUMENT action type when document is created',
      () => {
        const expectedAction = [{
          type: types.ADD_DOCUMENT,
          payload
        }];

        nock('http://localhost:3000/')
          .post('/documents')
          .reply(200, payload);

        const store = mockStore({});

        store.dispatch(addDocument(payload)).then(() => {
          expect(store.getActions()).to.eql(expectedAction);
        });
      });
    it('dispatches GET_DOCUMENTS action type  when document is gotten',
      () => {
        const expectedAction = [{
          type: types.GET_DOCUMENTS,
          payload
        }];

        nock('http://localhost:3000/')
          .get('/documents/')
          .query({ limit: 2, offset: 0 })
          .reply(200, payload);

        const store = mockStore({});

        store.dispatch(getDocument(2, 0)).then(() => {
          expect(store.getActions()).to.eql(expectedAction);
        });
      });
    it('dispatches GET_MY_DOCUMENTS action type  when users document is gotten',
      () => {
        const expectedAction = [{
          type: types.GET_MY_DOCUMENTS,
          payload
        }];

        nock('http://localhost:3000/')
          .get(`/users/${1}/documents/`)
          .query({ limit: 2, offset: 0 })
          .reply(200, payload);

        const store = mockStore({});

        store.dispatch(getMyDocument(1, 2, 0)).then(() => {
          expect(store.getActions()).to.eql(expectedAction);
        });
      });
    it('dispatches SEARCH_DOCUMENTS action type  when users document is gotten',
      () => {
        const expectedAction = [{
          type: types.SEARCH_DOCUMENTS,
          payload
        }];

        nock('http://localhost:3000/')
          .get('/search/documents/')
          .query({ q: 'o', limit: 2, offset: 0 })
          .reply(200, payload);

        const store = mockStore({});

        store.dispatch(searchDocument('o', 2, 0)).then(() => {
          expect(store.getActions()).to.eql(expectedAction);
        });
      });
    it('dispatches DELETE_DOCUMENT action type  when users document is deleted',
      () => {
        const expectedAction = [{
          type: types.DELETE_DOCUMENT,
          payload
        }];

        nock('http://localhost:3000/')
          .delete(`/documents/${1}`)
          .reply(204, payload);

        const store = mockStore({});

        store.dispatch(deleteDocument(1)).then(() => {
          expect(store.getActions()).to.eql(expectedAction);
        });
      });
    it('dispatches UPDATE_DOCUMENT action type  when users document is updated',
      () => {
        const expectedAction = [{
          type: types.UPDATE_DOCUMENT,
          payload
        }];

        nock('http://localhost:3000/')
          .put(`/documents/${1}`)
          .reply(200, payload);

        const store = mockStore({});

        store.dispatch(updateDocument(payload)).then(() => {
          expect(store.getActions()).to.eql(expectedAction);
        });
      });
    it('dispatches GET_SINGLE_DOCUMENT action when users document is gotten',
      () => {
        const expectedAction = [{
          type: types.GET_SINGLE_DOCUMENT,
          payload
        }];

        nock('http://localhost:3000/')
          .get(`/documents/${1}`)
          .reply(200, payload);

        const store = mockStore({});

        store.dispatch(getSingleDocument(1)).then(() => {
          expect(store.getActions()).to.eql(expectedAction);
        });
      });
  });
});
