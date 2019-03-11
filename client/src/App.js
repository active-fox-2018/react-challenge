import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css';

//store
import { Provider } from 'react-redux'
import store from './store'

//components
import Home from './components/Home'
import Register from './components/Register'
import Login from './components/Login'
import NotFound from './components/NotFound'


//fontawesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSearch, faHome } from '@fortawesome/free-solid-svg-icons'

library.add(faSearch, faHome)

class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/details" component={Home} />
              <Route exact path='/watchlist' component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route path="*" component={NotFound} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
