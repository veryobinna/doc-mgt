import { expect } from 'chai';
import {
  getUsersSuccess, searchUsersSuccess,
  updateUserSuccess,
  getSingleUserSuccess
} from '../../src/actions/UserActions';
import UsersReducer from '../../src/reducers/UsersReducer';

describe('Users Reducer', () => {
  describe('getUsersSuccess', () => {
    it('should save the users  detail in the store', () => {
      const payload = {
        id: 1,
        firstName: 'Fred',
        lastName: 'Flintstone',
        email: 'fred@flintstone.com',
        username: 'fred',
      };
      const action = getUsersSuccess(payload);
      const newState = UsersReducer({ users: [] }, action);
      expect(newState.users.id).to.eql(action.payload.id);
    });
  });
  describe('searchUsersSuccess', () => {
    it('should save the users  detail in the store', () => {
      const payload = {
        id: 1,
        firstName: 'Fred',
        lastName: 'Flintstone',
        email: 'fred@flintstone.com',
        username: 'fred',
      };
      const action = searchUsersSuccess(payload);
      const newState = UsersReducer({ users: [] }, action);
      expect(newState.users.id).to.eql(action.payload.id);
    });
  });
  describe('updateUserSuccess', () => {
    it('should save the users  detail in the store', () => {
      const payload = {
        id: 1,
        firstName: 'Fred',
        lastName: 'Flintstone',
        email: 'fred@flintstone.com',
        username: 'fred',
      };
      const action = updateUserSuccess(payload);
      const newState = UsersReducer({ users: [] }, action);
      expect(newState.users.id).to.eql(action.payload.id);
    });
  });
  describe('getSingleUserSuccess', () => {
    it('should save the users  detail in the store', () => {
      const payload = {
        id: 1,
        firstName: 'Fred',
        lastName: 'Flintstone',
        email: 'fred@flintstone.com',
        username: 'fred',
      };
      const action = getSingleUserSuccess(payload);
      const newState = UsersReducer({ users: [] }, action);
      expect(newState.users.id).to.eql(action.payload.id);
    });
  });
});
