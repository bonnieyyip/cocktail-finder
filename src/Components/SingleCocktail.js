import React from 'react';
import { Link } from 'react-router-dom';

class SingleCocktail extends React.Component {
    state = {
        cocktailDetails: []
    }

    componentDidMount = async () => {
        const cocktailId = this.props.location.state.recipe;
        console.log("cocktailId: " + cocktailId);
        const api_req = await fetch(`https://the-cocktail-db.p.rapidapi.com/lookup.php?i=${cocktailId}`, {
          "method": "GET",
          "headers": {
            "x-rapidapi-key": "350df23b49msh7c681161d5c6cd9p14e4d1jsn83e4e93c7509",
            "x-rapidapi-host": "the-cocktail-db.p.rapidapi.com"
          }
        })

        const data = await api_req.json();
        this.setState({cocktailDetails: data.drinks[0]})
    }

    render() {
        const cocktailInstructions = this.state.cocktailDetails;
        const ingredientsArray = [];

        for (let i=1; i<=15; i++) {
            let ingredient = "strIngredient" + i;
            let measure = "strMeasure" + i;
            if (cocktailInstructions[ingredient] !== null && cocktailInstructions[measure] !== null) {
                ingredientsArray.push(cocktailInstructions[measure] + " " + cocktailInstructions[ingredient]);
            } else if (cocktailInstructions[ingredient] !== null) {
                ingredientsArray.push(cocktailInstructions[ingredient]);
            }
        }

        let ingredients = ingredientsArray.map(ingredient => {
            return ( 
              <li> 
                {ingredient} 
              </li>
            );
        });

        return (
            <div className="App" id="App">
                <header className="App-header">
                <h1 className="App-title">Cocktail Finder</h1>
                </header>
                <div className="container">
                    { this.state.cocktailDetails.length !== 0 &&
                        <div className="row">
                            <div className="col-md-6 offset-md-3" style={{marginTop: "2rem", marginBottom: "2rem"}}>
                                <Link to='/' className="cocktail-details_button">Home</Link>
                                <img className="cocktail-details_img" src={cocktailInstructions.strDrinkThumb} alt={cocktailInstructions.strDrink}></img>
                                <h1 className="cocktail-details_title">{cocktailInstructions.strDrink}</h1>
                                <h3>Ingredients</h3>
                                <ul>
                                    {ingredients}
                                </ul>
                                <h3>Instructions</h3>
                                <p>{cocktailInstructions.strInstructions}</p>
                            </div>
                        </div>
                    }
                </div>
            </div>
        );
    }
}


export default SingleCocktail;