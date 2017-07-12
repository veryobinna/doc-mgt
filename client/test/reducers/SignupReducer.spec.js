import { expect } from 'chai';
import { signupDetails } from '../../src/actions/SignupAction';
import SignupReducer from '../../src/reducers/SignupReducer';

describe('Sign up Reducer', () => {
  describe('Sign up Details', () => {
    it('should save the users login detail in the store', () => {
      const payload = {
        id: 1,
        firstName: 'Fred',
        lastName: 'Flintstone',
        email: 'fred@flintstone.com',
        username: 'fred',
      };
      const action = signupDetails(payload);
      const newState = SignupReducer({ }, action);
      expect(newState.id).to.eql(action.payload.id);
    });
  });
});
