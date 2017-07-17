import React from 'react';
import PropTypes from 'prop-types';


/**
 * SearchBar renders the SearchBar
 * @returns {html} Dom components
 */
const SearchBar = ({ onSearch, holder }) => (
  <div className="search-wrapper card">
    <input
      onChange={onSearch}
      id="search"
      placeholder={holder}
    />
    <i className="material-icons">search</i>
  </div>
);

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
  holder: PropTypes.string.isRequired
};

export default SearchBar;

