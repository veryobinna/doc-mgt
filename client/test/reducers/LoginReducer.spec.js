import { expect } from 'chai';
import { loginDetails } from '../../src/actions/AuthAction';
import LoginReducer from '../../src/reducers/LoginReducer';

describe('Login Reducer', () => {
  describe('Login Details', () => {
    it('should save the users login detail in the store', () => {
      const userParams = {
        id: 1,
        firstName: 'Fred',
        lastName: 'Flintstone',
        email: 'fred@flintstone.com',
        username: 'fred',
        roleID: 1
      };
      const action = loginDetails(userParams);
      const newState = LoginReducer({ valid: false, user: null }, action);
      expect(newState.login.id).to.eql(action.payload.id);
    });
  });
});
