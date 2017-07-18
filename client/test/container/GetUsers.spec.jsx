import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { spy, assert } from 'sinon';
import { GetUsers } from './../../src/containers/GetUsers';

const event = {
  selected: 2
};
const props = {
  match: {
    params: {

    }
  },
  getUsers: spy(() => new Promise((resolve) => { resolve(); })),
  searchUsers: spy(() => new Promise((resolve) => { resolve(); })),
  updateUser: () => {},
  status: {}
};
const onSearchSpy = spy(GetUsers.prototype, 'onSearch');
const getUsersSpy = spy(GetUsers.prototype, 'getUsers');
const wrapper = shallow(<GetUsers {...props} />);

describe('Get Users Component', () => {
  it('should render the Get Ussers component', () => {
    expect(wrapper.find('SearchBar').exists()).to.equal(true);
    expect(wrapper.find('div').exists()).to.equal(true);
  });

  it('should call getUsers on mount', () => {
    assert.calledOnce(getUsersSpy);
    expect(props.getUsers.called).to.equal(true);
  });

  it('should searchUsers when onSearch is called', () => {
    wrapper.instance().onSearch();
    assert.calledOnce(onSearchSpy);
    expect(props.searchUsers.called).to.equal(true);
  });
});
