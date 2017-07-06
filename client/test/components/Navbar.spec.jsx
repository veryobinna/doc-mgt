import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import Navbar from './../../src/components/Navbar';

describe('Navbar Component', () => {
  it('should render the navbar component', () => {
    const wrapper = shallow(<Navbar />);
    expect(wrapper.find('.navbar-fixed').exists()).to.equal(true);
  });
});
