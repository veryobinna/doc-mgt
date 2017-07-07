import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import SearchBar from './../../src/components/SearchBar';

describe('Searchbar Component', () => {
  it('should render the searchbar component', () => {
    const wrapper = shallow(<SearchBar />);
    expect(wrapper.find('.search-wrapper').exists()).to.equal(true);
    expect(wrapper.find('input').exists()).to.equal(true);
    expect(wrapper.find('i').text()).to.equal('search');

  });
});
