import React, {Component} from 'react';
import './App.css';
import { BrowserRouter, Route, Link } from "react-router-dom";
import SearchBar from "./Components/SearchBar";
import Cocktails from "./Components/Cocktails";
import CreateModal from "./Components/CreateRecipeModal";
import ReactModal from 'react-modal';

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

  handleSearchReset = () => {
    document.getElementById("search-bar").reset();
    this.setState({ 
      recipes: []
    });
  }

  componentDidMount() {
    ReactModal.setAppElement('#root');
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
      <div className="App" id="App">
        <header className="App-header">
          <h1 className="App-title">Cocktail Finder</h1>
        </header>

        <div className="row">
          <div className="col-sm-4 offset-sm-3" style={{textAlign: "right"}}>
            <SearchBar getRecipe={this.getRecipe} />
          </div>
          <div className="col-sm-2" style={{textAlign: "left"}}>
            <button className="form-button" id="clear-search" onClick={this.handleSearchReset}>Clear</button>
          </div>
          <div className="col-sm-3" style={{textAlign: "right"}}>
            <CreateModal/>
          </div>
        </div>
        <Cocktails recipes={this.state.recipes}/>
      </div>
    );
  }
}

export default App;
