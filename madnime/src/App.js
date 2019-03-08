import React, { Component } from 'react';
import './App.css';
import AnimeList from './containers/AnimeList'
//COMPONENTS
import MyNav from './containers/MyNav'
import AnimeDetail from './containers/AnimeDetail'
import LoginForm from './containers/mini/LoginForm'
import RegisForm from './containers/mini/RegisForm'
import Profile from './containers/Profile'

//STORE
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { findOne } from './store/actions/user'
import { getFav } from './store/actions/fav'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'

//PRIVATE ROUTE
import { PrivateRoute } from './helpers/PrivateRoute'

class App extends Component {
  componentDidMount() {
    if (localStorage.token) {
      this.props.findOne()
      this.props.getFav()
    }
  }

  render() {
    return (
        <Router basename="/">
          <div className="App">
              <MyNav />
              <Switch>
                <Route exact path="/anime/:id" component={AnimeDetail} />
                <Route exact path="/login" component={LoginForm} />
                <Route exact path="/register" component={RegisForm} />
                <PrivateRoute exact path="/profile" component={Profile} user={this.props.user}/>
                <Route path="/:id?" component={AnimeList} />
              </Switch>
          </div>
        </Router>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user.user
})

const mapDispatchToProps = (dispatch) => bindActionCreators({ findOne, getFav }, dispatch)


export default connect(mapStateToProps, mapDispatchToProps)(App)
