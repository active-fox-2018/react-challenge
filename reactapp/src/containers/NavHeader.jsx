
import { Link } from 'react-router-dom'
import {firebase} from '../api/firestore'
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import {connect} from 'react-redux'
import { login } from '../store/actions/loginState'


class NavHeader extends Component {
  clickLogin = () => {
    this.props.isLogin({type: 'first'})
    .then(() => {
      this.props.history.push('/')
    })
    .catch(err => {
      console.log(err)
    })
  }

  clickLogout = () => {
  firebase.auth().signOut()
    .then(() => {
      this.props.history.push('/')
      this.props.isLogin({type: 'logout'})
    })
    .catch(function(error) {
      console.log(error)
    })
  }

  render() {
    return (
      <header className="App-header">
        <div className="logo">
          <Link to='/'>
            <img  src='https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Pok%C3%A9_Ball.svg/602px-Pok%C3%A9_Ball.svg.png' className="App-logo" alt="logo" />
          </Link>
        </div>
        <div className="menu">
          <Link to='/myPokemons'>
          <p>My Pokemons</p>
          </Link>
          {this.props.loginState ? <p onClick={this.clickLogout}>logout</p> : <p onClick={this.clickLogin}>login</p>}
        </div>
      </header>
    )
  }
}


const mapStateToProps = (state) => ({
  loginState: state.loginState.isLogin
})

const mapDispatchToProps = (dispatch) => ({
  isLogin: (action) => dispatch(login(action))
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(NavHeader))