import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { spy, assert } from 'sinon';
import { AddDocument } from './../../src/containers/AddDocument';

const event = {
  target: {
    id: 1,
    value: 'value'
  }
};
const props = {
  addDocument: () => {}
};
const onInputChangeSpy = spy(AddDocument.prototype, 'onInputChange');
const onFormSubmitSpy = spy(AddDocument.prototype, 'onFormSubmit');
const wrapper = shallow(<AddDocument {...props} />);

describe('Add Document Component', () => {
  it('should render the Add Document component', () => {
    expect(wrapper.find('.add-document').exists()).to.equal(true);
    expect(wrapper.find('.input-field').exists()).to.equal(true);
  });

  it('should handle input change', () => {
    wrapper.instance().onInputChange(event);
    assert.calledOnce(onInputChangeSpy);
  });

  it('should handle onFormSubmit', () => {
    wrapper.update();
    wrapper.find('form').simulate('submit', { preventDefault: () => {} });
    assert.calledOnce(onFormSubmitSpy);
  });
});
