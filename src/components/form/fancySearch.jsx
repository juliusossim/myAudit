import React from 'react';

const FancySearch = () => (
  <form className="fancy-form">
    <label className="fancy-label" htmlFor="search">Search</label>
    <input className="fancy-input" id="search" type="search" pattern=".*\S.*" required />
    <span className="caret" />
  </form>
);

export default FancySearch;
