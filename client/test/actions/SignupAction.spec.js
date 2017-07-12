import { expect } from 'chai';
import types from './../../src/actions/ActionTypes';
import { signupDetails } from '../../src/actions/SignupAction';

describe('Signup Action', () => {
  describe('signupDetails ', () => {
    it('should create a SIGNUP_DETAILS action type', () => {
      const payload = { content: 'notes' };
      const expected = {
        type: types.SIGNUP_DETAILS,
        payload
      };
      expect(signupDetails(payload)).to.eql(expected);
    });
  });
});
