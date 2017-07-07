import { expect } from 'chai';
import thunk from 'redux-thunk';
import axios from 'axios';
import moxios from 'moxios';
import configureStore from 'redux-mock-store';
import types from './../../src/actions/ActionTypes';
import { addDocumentSuccess, addDocument } from '../../src/actions/DocumentActions';

const middlewares = [thunk]; // add your middlewares like `redux-thunk`
const mockStore = configureStore(middlewares);

describe('Document Action', () => {
  beforeEach(() => {
    // import and pass your custom axios instance to this method
    moxios.install();
  });
  afterEach(() => {
    // import and pass your custom axios instance to this method
    moxios.uninstall();
  });
  describe('Add Document ', () => {
    it('should contain the the document payload', () => {
      const payload = { content: 'notes' };
      const expected = {
        type: types.ADD_DOCUMENT,
        payload
      };
      expect(addDocumentSuccess(payload)).to.eql(expected);
    });
  });

  // describe('Login Action', () => {
  //   it('should log the user in and set token', () => {
  //     const payload = {
  //       id: 1,
  //       firstName: 'Fred',
  //       lastName: 'Flintstone',
  //       email: 'fred@flintstone.com',
  //       username: 'fred',
  //       roleID: 1
  //     };
  //     const expected = [
  //       { type: types.LOGIN_DETAILS, payload },
  //     ];

  //     const userParams = {
  //       loginId: 'admin',
  //       password: 'test'
  //     };

  //     const store = mockStore();
  //     store.dispatch(LoginAction(userParams)).then(() => {
  //       const action = store.getActions();
  //       expect(action).to.eql(expected);
  //     });

  //     moxios.wait(() => {
  //       const request = moxios.requests.mostRecent();
  //       request.respondWith({
  //         status: 200,
  //         response: [{ data: payload }]
  //       });
  //     });
  //   });
  // });
});


