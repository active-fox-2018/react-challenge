import React, { Component } from 'react'
import './App.css';
import Pokemon from './containers/Pokemon'
import PokemonDetail from './containers/pokemon/PokemonDetail'
import NavHeader from './containers/NavHeader'
import {connect} from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import { login } from '../src/store/actions/loginState'
import MyPokemons from './containers/MyPokemons'
import PrivateRoute  from '../src/helpers/PrivateRoute'
import AnonymousUser from '../src/containers/AnonymousUser'

class App extends Component {

  componentDidMount = () => {
   this.props.isLogin()
  }

  render() {
    return (
        <Router>
        <div className="App">
          <NavHeader/>
          <Switch>
          <Route path='/' exact component={Pokemon}/>
          <PrivateRoute exact path="/myPokemons" component={MyPokemons} />
          <Route exact path='/login' component={AnonymousUser}/>
          <Route path='/:id' exact component={PokemonDetail}/>
          </Switch>
        </div>
        </Router>
    );
  }
}

// export default App;
const mapDispatchToProps = (dispatch) => ({
  isLogin: () => dispatch(login({type: 'reload'}))
})

export default connect(null, mapDispatchToProps)(App)
