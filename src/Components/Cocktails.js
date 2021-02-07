import React from 'react';
import { Link } from 'react-router-dom';

const Cocktails = props => (
    <div className="container">
        <div className="row">
            { props.recipes.map( (recipe) => {
                return (
                    <div key={recipe.idDrink} className="col-md-4 col-sm-6" style={{marginBottom: "2rem"}}>
                        <div className="recipes-box">
                            <img src={recipe.strDrinkThumb} alt={recipe.strDrink}></img>
                            <h5 className="recipes-title">{recipe.strDrink}</h5>
                            <Link className="recipe-buttons" to={{ 
                                pathname: `/recipe/${recipe.idDrink}`,
                                state: {recipe: recipe.idDrink}
                                }}>View Recipe</Link>
                        </div>
                    </div>
                )
            })}
        </div>
    </div>
)

export default Cocktails;