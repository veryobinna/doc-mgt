import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { spy, assert } from 'sinon';
import { Signup } from './../../src/containers/Signup';

const event = {
  target: {
    id: 1,
    value: 'value'
  }
};
const props = {
  LoginID: '',
  status: {
    valid: false,
    user: {
      id: 0
    }
  },
  signupAction: spy(() => new Promise((resolve) => { resolve(); })),
};
const onInputChangeSpy = spy(Signup.prototype, 'onInputChange');
const onFormSubmitSpy = spy(Signup.prototype, 'onFormSubmit');
const wrapper = shallow(<Signup {...props} />);
describe('Signup Component', () => {
  it('should render', () => {
    expect(wrapper.find('.landing-page').exists()).to.equal(true);
    expect(wrapper.find('form').exists()).to.equal(true);
  });

  it('should handle input change', () => {
    wrapper.instance().onInputChange(event);
    assert.calledOnce(onInputChangeSpy);
  });

  it('should handle onFormSubmit', () => {
    wrapper.find('form').simulate('submit', { preventDefault: () => {} });
    assert.calledOnce(onFormSubmitSpy);
    expect(props.signupAction.called).to.equal(true);
  });

  it('should redirect if user is signed in', () => {
    wrapper.setProps({ status: {
      valid: true,
      user: {
        id: 0
      }
    } });
    expect(wrapper.find('Redirect').exists()).to.equal(true);
  });
});
