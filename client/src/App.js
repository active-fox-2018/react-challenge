import React, { Component } from 'react';
import './App.css';
import Navbar from './components/Navbar'
import Home from './views/Home'
import Detail from './views/Detail'

import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'

import { Provider } from 'react-redux'
import store from './store'
import { PrivateRoute } from './components/PrivateRoute'

class App extends Component {
  render() {
    return (
      <Provider store={ store }>
        <Router>
          <div className="App">
            <header className="App-header">
              <Navbar></Navbar>
            </header>
            <div className="container-fluid">
              <Switch>
                <Route exact path="/" component={ Home }></Route>
                <Route exact path="/:page" component={ Home }></Route>
                <PrivateRoute exact path="/details/:id" component={ Detail }></PrivateRoute>
              </Switch>
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
