import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { spy, assert } from 'sinon';
import { UpdateDocument } from '../../src/containers/UpdateDocument';

const event = {
  target: {
    id: 1,
    value: 'value'
  },
};
const props = {
  documents: {
  },
  updateDocument: () => {}
};
global.CKEDITOR = () => { this.content = {}; };
global.CKEDITOR.instances = { content: { getData: () => '' } };

const onInputChangeSpy = spy(UpdateDocument.prototype, 'onInputChange');
const onFormSubmitSpy = spy(UpdateDocument.prototype, 'onFormSubmit');
const wrapper = shallow(<UpdateDocument {...props} />);
describe('Edit Document Component', () => {
  it('should render the Edit Document component', () => {
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
