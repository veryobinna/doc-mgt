import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const SearchBar = ({ onSearch }) => (


  <div className="search-wrapper card">
    <input
      onChange={onSearch}
      id="search"
    />
    <i className="material-icons">search</i>

  </div>


);

export default SearchBar;

