import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import News from './containers/news.jsx'
import { BrowserRouter, Link, Switch, Route } from 'react-router-dom'

class App extends Component {
  render() {
    return (
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
            <Route exact path="/" component={News} />
            <Route path="/category/:category" component={News} />
            <Route path="/search/:search" component={News} />
            <Route render={(props) => <h3>cari apa cuuuy</h3>} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
