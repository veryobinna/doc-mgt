import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import ShowUsers from './../../src/components/ShowUsers';

describe('ShowUsers Component', () => {
  const props = {
    title: 'title',
    content: 'notes',
    access: 'regular',
    id: 3,
    deleteUser: sinon.spy(),
    firstName: 'Optimus',
    lastName: 'Prime'
  };
  const setup = () => shallow(<ShowUsers {...props} />);
  const wrapper = setup();
  const deleteUser = wrapper.find('.btn-del');

  it('should render the ShowUsers component', () => {
    expect(wrapper.find('.show-users').exists()).to.equal(true);
    expect(wrapper.find('li').length).to.equal(1);
    expect(wrapper.find('.collection-item').exists()).to.equal(true);
  });

  it('should call the delete function on delete-button click', () => {
    deleteUser.simulate('click');
    expect(props.deleteUser.called).to.equal(true);
  });
});
