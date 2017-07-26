import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import Footer from './../../src/components/Footer';

describe('Footer Component', () => {
  it('should render', () => {
    const wrapper = shallow(<Footer />);
    expect(wrapper.find('.page-footer').exists()).to.equal(true);
  });
});
