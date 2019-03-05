import React, { Component } from 'react';
import './App.css';
import Pokemon from './containers/Pokemon'
import PokemonDetail from './containers/pokemon/PokemonDetail'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
class App extends Component {
  render() {
    return (
      <Router>
      <div className="App">
        <header className="App-header">
          <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Pok%C3%A9_Ball.svg/602px-Pok%C3%A9_Ball.svg.png' className="App-logo" alt="logo" />
        </header>
        <Switch>
        <Route path='/' exact component={Pokemon}/>
        <Route path='/:id' exact component={PokemonDetail}/>
        </Switch>
      </div>
      </Router>
    );
  }
}

export default App;
