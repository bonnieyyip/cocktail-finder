import React, {Component} from 'react';
import './App.css';
import { BrowserRouter, Route, Link } from "react-router-dom";
import Form from "./Components/Form";
import Cocktails from "./Components/Cocktails"

class App extends Component {
  state = {
    recipes: []
  }

  getRecipe = async (e) => {
    const liquorType = e.target.elements.searchBox.value;
    e.preventDefault();

    const api_call = await fetch(`https://the-cocktail-db.p.rapidapi.com/filter.php?i=${liquorType}`, {
      "method": "GET",
      "headers": {
        "x-rapidapi-key": "350df23b49msh7c681161d5c6cd9p14e4d1jsn83e4e93c7509",
        "x-rapidapi-host": "the-cocktail-db.p.rapidapi.com"
      }
    })
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      this.setState({ 
        recipes: json.drinks
      });
    });
  }

  // componentDidMount = () => {
  //   const json = localStorage.getItem("recipes");
  //   const recipes = JSON.parse(json);
  //   this.setState({recipes: recipes});
  // }

  // componentDidUpdate = () => {
  //   const recipes = JSON.stringify(this.state.recipes);
  //   localStorage.setItem("recipes", recipes);
  // }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Link className="App-title" to='/'>Cocktail Finder</Link>
        </header>
        <Form getRecipe={this.getRecipe} />
        <Cocktails recipes={this.state.recipes}/>
      </div>
    );
  }
}

export default App;
