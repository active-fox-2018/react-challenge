import React, { Component } from 'react';
import './App.css';
import AnimeList from './containers/AnimeList'
import MyNav from './containers/MyNav'
import AnimeDetail from './containers/AnimeDetail'

import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'

// store
import { Provider } from 'react-redux'
import store from './store'

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
              <MyNav />
              <Switch>
                <Route exact path="/" component={AnimeList} />
                <Route exact path="/anime/:id" component={AnimeDetail} />
              </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
