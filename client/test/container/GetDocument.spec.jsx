import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { spy } from 'sinon';
import { GetDocument } from './../../src/containers/GetDocument';

const event = {
  selected: 2,
  target: {
    value: 3
  }

};
const props = {
  match: {
    params: {
    }
  },
  getDocument: spy(() => new Promise((resolve) => { resolve(); })),
  getMyDocument: spy(() => new Promise((resolve) => { resolve(); })),
  searchDocument: spy(() => new Promise((resolve) => { resolve(); })),
  updateUser: () => {},
  status: {}
};
const wrapper = shallow(<GetDocument {...props} />);

describe('Get Document Component', () => {
  it('should render the Get Document component', () => {
    expect(wrapper.find('.get-document').exists()).to.equal(true);
    expect(wrapper.find('SearchBar').exists()).to.equal(true);
    expect(wrapper.find('div').exists()).to.equal(true);
  });
  it('should call the next page of Get Document on page click', () => {
    wrapper.setState({ getDocument: true });
    wrapper.instance().onPageClick(event);
    expect(props.getDocument.called).to.equal(true);
  });
  it('should set state of getDocument to true when called', () => {
    wrapper.instance().getDocument();
    expect(wrapper.state().getDocument).to.equal(true);
    expect(props.getDocument.called).to.equal(true);
  });
  it('should call the next page of getMyDocument on page click', () => {
    wrapper.setState({ getDocument: false, getMyDocument: true });
    wrapper.instance().onPageClick(event);
    expect(props.getMyDocument.called).to.equal(true);
  });
  it('should set state of getMyDocument to true when called', () => {
    wrapper.instance().getMyDocument();
    expect(wrapper.state().getMyDocument).to.equal(true);
    expect(wrapper.state().getDocument).to.equal(false);
    expect(props.getMyDocument.called).to.equal(true);
  });
  it('should call the next page of searchDocument on page click', () => {
    wrapper.setState({ search: true });
    wrapper.instance().onPageClick(event);
    expect(props.searchDocument.called).to.equal(true);
  });
  it('should set state searchDocument to true when called', () => {
    wrapper.instance().onSearch(event);
    expect(wrapper.state().getMyDocument).to.equal(false);
    expect(wrapper.state().search).to.equal(true);
    expect(props.searchDocument.called).to.equal(true);
  });
});
