import React, { Component } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'
import { connect } from 'react-redux'

// Containers
import TopAnime from './containers/TopAnime'
import AnimeDetail from './containers/AnimeDetail'
import Login from './containers/Login'
import Navbar from './containers/Navbar'
import Favorites from './containers/Favorites';

// Helpers
import PrivateRoute from './helpers/PrivateRoute'

// Actions
import { checkLogin } from './store/actions/userAction'
import { getTopAnimes } from './store/actions/apiAction'

class App extends Component {
  componentDidMount() {
    this.props.checkLogin()
    // .then(() => {
    this.props.getTopAnimes()
    // })
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path="/" component={TopAnime} />
            {/* <Route path="/topanime" component={TopAnime} /> */}
            <Route path="/login" component={Login} />
            <Route path="/anime/:id" component={AnimeDetail} />
            <PrivateRoute path="/favorites" component={Favorites} />
          </Switch>
        </div>
      </Router>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  checkLogin: () => dispatch(checkLogin()),
  getTopAnimes: () => dispatch(getTopAnimes())
})

export default connect(null, mapDispatchToProps)(App);
