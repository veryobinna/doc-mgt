import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { spy, assert } from 'sinon';
import { GetDocument } from './../../src/containers/GetDocument';

const event = {
  target: {
    id: 1,
    value: 'value'
  }
};
const props = {
  match: {
    params: {

    }
  },
  getSingleUser: () => {},
  updateUser: () => {}
};
const wrapper = shallow(<GetDocument {...props} />);
describe('Add Document Component', () => {
  it('should render the Add Document component', () => {
    expect(wrapper.find('SearchBar').exists()).to.equal(true);
  });
});
