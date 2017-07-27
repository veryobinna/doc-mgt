import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import ShowDocument from './../../src/components/ShowDocument';

global.window = {};
describe('ShowDocument Component', () => {
  const props = {
    title: 'title',
    content: 'notes',
    access: 'regular',
    id: 3,
    user: {},
    deleteDocument: sinon.spy(),
    firstName: 'Optimus',
    lastName: 'Prime'
  };
  const setup = () => shallow(<ShowDocument {...props} />);
  const wrapper = setup();
  const deleteButton = wrapper.find('.card-btn-delete');

  it('should render', () => {
    expect(wrapper.find('div').length).to.equal(8);
    expect(wrapper.find('.card-title').text()).to.equal('title');
    expect(wrapper.find('.card-name').text()).to.equal('Optimus Prime');
  });

  it('should click run the delete function when clicked', () => {
    expect(wrapper.find('.card-name').text()).to.equal('Optimus Prime');
    deleteButton.simulate('click');
    expect(props.deleteDocument.called).to.equal(true);
  });
});
