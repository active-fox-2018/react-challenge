import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'

//actions
import { authenticateToken } from '../store/actions/UsersAction'

//containers
import FilmList from '../containers/film/FilmList'
import FilmDetails from '../containers/film/FilmDetails'
import Navbar from '../containers/Navbar'
import PrivateRoute from '../containers/PrivateWatchList'

class Home extends Component {
  componentDidMount() {
    if (localStorage.getItem('token')) {
      this.props.authenticateToken()
    }
  }

  render() {
    const { isLoggedIn } = this.props

    return (
      <div>
        <Navbar isLoggedIn={isLoggedIn} />
        <Switch>
          <Route exact path='/' component={FilmList} />
          <PrivateRoute exact path='/watchlist' component={FilmList}/>
          <Route exact path='/details/:id' render={(props) => <FilmDetails {...props} />} />
        </Switch>

      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  authenticateToken: () => (dispatch(authenticateToken()))
})

const mapStateToProps = (state) => ({
  isLoggedIn: state.Users.isLoggedIn
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)


