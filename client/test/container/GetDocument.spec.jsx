import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { spy, assert } from 'sinon';
import { GetDocument } from './../../src/containers/GetDocument';

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
const onSearchSpy = spy(GetDocument.prototype, 'onSearch');
const getDocumentSpy = spy(GetDocument.prototype, 'getDocument');
const getMyDocumentSpy = spy(GetDocument.prototype, 'getMyDocument');
const wrapper = shallow(<GetDocument {...props} />);

describe('Get Document Component', () => {
  it('should render the Get Document component', () => {
    expect(wrapper.find('SearchBar').exists()).to.equal(true);
    expect(wrapper.find('div').exists()).to.equal(true);
  });

  it('should set state of getDocument to true when called', () => {
    wrapper.instance().getDocument();
    assert.calledOnce(getDocumentSpy);
    expect(wrapper.state().getDocument).to.equal(true);
    expect(props.getDocument.called).to.equal(true);
  });
  it('should set state of getMyDocument to true when called', () => {
    wrapper.instance().getMyDocument();
    assert.calledOnce(getMyDocumentSpy);
    expect(wrapper.state().getMyDocument).to.equal(true);
    expect(wrapper.state().getDocument).to.equal(false);
    expect(props.getMyDocument.called).to.equal(true);
  });
  it('should set state searchDocument to true when called', () => {
    wrapper.instance().onSearch();
    assert.calledOnce(onSearchSpy);
    expect(wrapper.state().getMyDocument).to.equal(false);
    expect(wrapper.state().search).to.equal(true);
    expect(props.searchDocument.called).to.equal(true);
  });
});
