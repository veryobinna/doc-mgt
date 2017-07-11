import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { Dashboard } from './../../src/containers/Dashboard';

const props = {
  status: {
    valid: true
  }
};
const props2 = {
  status: {
    valid: false
  }
};
describe('Dashboard Component', () => {
  it('should render the Dashboard component', () => {
    const wrapper = shallow(<Dashboard {...props} />);
    expect(wrapper.find('div').length).to.equal(2);
  });
  it('should redirect if the user is not logged in ', () => {
    const wrapper = shallow(<Dashboard {...props2} />);
    props.status.valid = false;
    expect(wrapper.find('div').length).to.equal(0);
  });
});
