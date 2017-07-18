import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { spy, assert } from 'sinon';
import { UpdateUser } from '../../src/containers/UpdateUser';

const event = {
  target: {
    id: 1,
    value: 'value'
  },
};
const props = {
  match: {
    params: {
    }
  },
  getSingleUser: () => {},
  updateUser: () => {},
  history: {
    replace: () => {}
  },
};
global.CKEDITOR = () => { this.content = {}; };
global.CKEDITOR.instances = { content: { getData: () => '' } };

const onInputChangeSpy = spy(UpdateUser.prototype, 'onInputChange');
const onFormSubmitSpy = spy(UpdateUser.prototype, 'onFormSubmit');
const wrapper = shallow(<UpdateUser {...props} />);
describe('Edit Document Component', () => {
  it('should render the Edit Document component', () => {
    expect(wrapper.find('.input-field').exists()).to.equal(true);
  });

  it('should handle input change', () => {
    wrapper.instance().onInputChange(event);
    assert.calledOnce(onInputChangeSpy);
  });
  it('should handle onFormSubmit', () => {
    wrapper.find('form').simulate('submit', { preventDefault: () => {} });
    assert.calledOnce(onFormSubmitSpy);
  });
  it('should set state on componentWillReceive props', () => {
    wrapper.setProps({ users: 'pa' });
    wrapper.update();
  });
});
