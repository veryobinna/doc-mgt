import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { spy } from 'sinon';
import { GetUsers } from './../../src/containers/GetUsers';

const event = {
  selected: 2,
  target: {
    value: 3
  },
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
const wrapper = shallow(<GetUsers {...props} />);

describe('Get Users Component', () => {
  it('should render the Get Ussers component', () => {
    expect(wrapper.find('SearchBar').exists()).to.equal(true);
    expect(wrapper.find('div').exists()).to.equal(true);
  });

  it('should call getUsers on mount', () => {
    expect(props.getUsers.called).to.equal(true);
  });
  it('should call the next page of Get Users on pageclick', () => {
    wrapper.setState({ getUsers: true });
    wrapper.instance().onPageClick(event);
    expect(props.getUsers.called).to.equal(true);
  });

  it('should searchUsers when onSearch is called', () => {
    wrapper.instance().onSearch(event);
    expect(props.searchUsers.called).to.equal(true);
  });
  it('should call the next page of Search Users on pageclick', () => {
    wrapper.setState({ search: true });
    wrapper.instance().onPageClick(event);
    expect(props.searchUsers.called).to.equal(true);
  });
});
