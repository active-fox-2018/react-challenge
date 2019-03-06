import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import News from './containers/News.jsx'
import Login from './containers/Login.jsx'
import PrivateRoute from './helpers/PrivateRoute.jsx'
import { BrowserRouter, Link, Switch, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="App">
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <p>
                <Link to="/">News Headlines</Link>
              </p>
              <a
                className="App-link"
                href="https://reactjs.org"
                target="_blank"
                rel="noopener noreferrer"
              >
              </a>
            </header>
            <Switch>
              <PrivateRoute exact path="/" component={News} />
              <Route exact path="/login" component={Login} />
              <PrivateRoute path="/category/:category" component={News} />
              <PrivateRoute path="/search/:search" component={News} />
              <Route render={(props) => <h1>Page not found</h1>} />
            </Switch>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
