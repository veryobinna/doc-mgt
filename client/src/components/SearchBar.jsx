import React from 'react';
import PropTypes from 'prop-types';


/**
 * SearchBar renders the SearchBar
 * @returns {html} Dom components
 */
const SearchBar = ({ onSearch }) => (
  <div className="search-wrapper card">
    <input
      onChange={onSearch}
      id="search"
    />
    <i className="material-icons">search</i>
  </div>
);

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired
};

export default SearchBar;

