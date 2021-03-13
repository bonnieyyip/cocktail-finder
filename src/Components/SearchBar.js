import React from 'react';

const SearchBar = (props) => (
    <form id="search-bar" onSubmit={props.getRecipe} style={ {marginBottom:"2rem"}}>
        <input className="form-input" type="text" name="searchBox"></input>
        <button className="form-button">Search</button>
    </form>
);

export default SearchBar;