import { expect } from 'chai';
import nock from 'nock';
import axios from 'axios';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import types from './../../src/actions/ActionTypes';
import {
  getUsersSuccess,
  searchUsersSuccess, deleteUserSuccess,
  updateUserSuccess, getSingleUserSuccess,
  getUsers, deleteUser, updateUser,
  getSingleUser, searchUsers,
} from '../../src/actions/UserActions';

axios.defaults.baseURL = 'http://localhost:3000/';
const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Signup Action', () => {
  const payload = { id: 1, username: 'test' };
  describe('getUsersSuccess ', () => {
    it('should create a GET_USERS action type', () => {
      const expected = {
        type: types.GET_USERS,
        payload
      };
      expect(getUsersSuccess(payload)).to.eql(expected);
    });
  });
  describe('searchUsersSuccess ', () => {
    it('should create a SEARCH_USERS action type', () => {
      const expected = {
        type: types.SEARCH_USERS,
        payload
      };
      expect(searchUsersSuccess(payload)).to.eql(expected);
    });
  });
  describe('deleteUserSuccess ', () => {
    it('should create a DELETE_USER action type', () => {
      const expected = {
        type: types.DELETE_USER,
        payload
      };
      expect(deleteUserSuccess(payload)).to.eql(expected);
    });
  });
  describe('updateUserSuccess ', () => {
    it('should create an UPDATE_USER action type', () => {
      const expected = {
        type: types.UPDATE_USER,
        payload
      };
      expect(updateUserSuccess(payload)).to.eql(expected);
    });
  });
  describe('getSingleUserSuccess ', () => {
    it('should create a GET_SINGLE_USER action type', () => {
      const expected = {
        type: types.GET_SINGLE_USER,
        payload
      };
      expect(getSingleUserSuccess(payload)).to.eql(expected);
    });
  });
  describe('User Actions', () => {
    afterEach(() => {
      nock.cleanAll();
    });
    it('dispatches GET_USERS action type when user is gotten',
      () => {
        const expectedAction = [{
          type: types.GET_USERS,
          payload
        }];

        nock('http://localhost:3000/')
          .get('/users/')
          .query({ limit: 2, offset: 0 })
          .reply(200, payload);

        const store = mockStore({});

        store.dispatch(getUsers(2, 0)).then(() => {
          expect(store.getActions()).to.eql(expectedAction);
        });
      });
    it('dispatches SEARCH_USERS action type when user is gotten',
      () => {
        const expectedAction = [{
          type: types.SEARCH_USERS,
          payload
        }];

        nock('http://localhost:3000/')
          .get('/search/users/')
          .query({ q: 'o', limit: 2, offset: 0 })
          .reply(200, payload);

        const store = mockStore({});

        store.dispatch(searchUsers('o', 2, 0)).then(() => {
          expect(store.getActions()).to.eql(expectedAction);
        });
      });
    it('dispatches DELETE_USER action type when user is deleted',
      () => {
        const expectedAction = [{
          type: types.DELETE_USER,
          payload
        }];

        nock('http://localhost:3000/')
          .delete(`/users/${1}`)
          .reply(200, payload);

        const store = mockStore({});

        store.dispatch(deleteUser(1)).then(() => {
          expect(store.getActions()).to.eql(expectedAction);
        });
      });
    it('dispatches UPDATE_USER action type when user is updated',
      () => {
        const expectedAction = [{
          type: types.UPDATE_USER,
          payload
        }];

        nock('http://localhost:3000/')
          .put(`/users/${1}`)
          .reply(200, payload);

        const store = mockStore({});

        store.dispatch(updateUser(payload)).then(() => {
          expect(store.getActions()).to.eql(expectedAction);
        });
      });
    it('dispatches GET_SINGLE_USER action type when user is updated',
      () => {
        const expectedAction = [{
          type: types.GET_SINGLE_USER,
          payload
        }];

        nock('http://localhost:3000/')
          .get(`/users/${1}`)
          .reply(200, payload);

        const store = mockStore({});

        store.dispatch(getSingleUser(1)).then(() => {
          expect(store.getActions()).to.eql(expectedAction);
        });
      });
  });
});
