import { expect } from 'chai';
import thunk from 'redux-thunk';
import nock from 'nock';
import axios from 'axios'
;import configureStore from 'redux-mock-store';
import types from './../../src/actions/ActionTypes';
import { LoginAction, loginDetails } from '../../src/actions/LoginAction';

axios.defaults.baseURL = 'http://localhost:3000/';
const middlewares = [thunk]; // add your middlewares like `redux-thunk`
const mockStore = configureStore(middlewares);

describe('Login Action', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  describe('Login Details', () => {
    it('should contain the details of a logged in user', () => {
      const payload = { id: 1 };
      const expected = {
        type: types.LOGIN_DETAILS,
        payload
      };
      expect(loginDetails(payload)).to.eql(expected);
    });
  });


  describe('Login Action', () => {
    it('should log the user in and set token', () => {
      const payload = {
        id: 1,
        firstName: 'Fred',
        lastName: 'Flintstone',
        email: 'fred@flintstone.com',
        username: 'fred',
        roleID: 1
      };
      const expected = [
        { type: types.LOGIN_DETAILS, payload },
      ];

      const userParams = {
        loginId: 'fred',
        password: 'test'
      };
      nock('http://localhost:3000/')
        .post('/login', userParams)
        .reply(200, payload);

      const store = mockStore({});

      return store.dispatch(LoginAction(userParams)).then(() => {
        const action = store.getActions();
        expect(action).to.eql(expected);
      });
    });
  });
});
