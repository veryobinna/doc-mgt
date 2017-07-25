import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { spy, assert } from 'sinon';
import { Login } from './../../src/containers/Login';

const event = {
  target: {
    id: 1,
    value: 'value'
  }
};
const props = {
  LoginID: '',
  status: {
    valid: false
  },
  LoginAction: spy(() => new Promise((resolve) => { resolve(); })),
};
const onInputChangeSpy = spy(Login.prototype, 'onInputChange');
const onFormSubmitSpy = spy(Login.prototype, 'onFormSubmit');
const wrapper = shallow(<Login {...props} />);
describe('Login Component', () => {
  it('should render the Login component', () => {
    expect(wrapper.find('.landing-page').exists()).to.equal(true);
  });

  it('should handle input change', () => {
    wrapper.instance().onInputChange(event);
    assert.calledOnce(onInputChangeSpy);
  });

  it('should handle onFormSubmit', () => {
    wrapper.update();
    wrapper.find('form').simulate('submit', { preventDefault: () => {} });
    assert.calledOnce(onFormSubmitSpy);
    expect(props.LoginAction.called).to.equal(true);
  });
});
