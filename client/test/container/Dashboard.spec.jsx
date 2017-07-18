import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { Dashboard } from './../../src/containers/Dashboard';

const props = {
  status: {
    valid: true
  }
};
describe('Dashboard Component', () => {
  it('should render the Dashboard component', () => {
    const wrapper = shallow(<Dashboard {...props} />);
    expect(wrapper.find('div').length).to.equal(2);
  });
});
