import React from 'react';

const Form = props => (
    <form onSubmit={props.getRecipe} style={ {marginBottom:"2rem"}}>
        <input className="form-input" type="text" name="searchBox"></input>
        <button className="form-button">Search</button>
    </form>
);

export default Form;