import React from 'react';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';
import { spy, assert } from 'sinon';
import { AddDocument } from './../../src/containers/AddDocument';

const event = {
  target: {
    id: 1,
    value: 'value'
  }
};

const onInputChangeSpy = spy(AddDocument.prototype, 'onInputChange');
  const wrapper = shallow(<AddDocument />);
describe('Add Document Component', () => {
  it('should render the Add Document component', () => {
    const wrapper = shallow(<AddDocument />);
    expect(wrapper.find('.input-field').exists()).to.equal(true);
  });

  it('should handle input change', () => {
    wrapper.instance().onInputChange(event);
    assert.calledOnce(onInputChangeSpy);
  });
  it('should handle onFormSubmit', () =>{
    wrapper.instance().on
  })
});
