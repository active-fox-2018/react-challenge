import React, { Component } from 'react'
import {
  Link
} from 'react-router-dom'
import logo from '../logo.svg';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

// Actions
import { logout } from '../store/actions/userAction'

class Navbar extends Component {
  state = {
    redirect: false
  }

  newLogout = () => {
    this.props.logout()
    this.setRedirect()
  }

  setRedirect = () => {
    this.setState({
      redirect: true
    })
  }

  renderRedirect = () => {
    if (this.state.redirect && !this.props.isLogin) {
      return <Redirect to='/' />
    }
  }

  render() {
    return (
      <header className="App-header">
        {this.renderRedirect()}
        <div className="container-fluid">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <img src={logo} className="App-logo" alt="logo" />
              <span><Link to="/" style={{ color: "white", textDecoration: 'none' }}>Jikan Anime</Link></span>
            </div>
            {JSON.stringify(this.props.isLogin)}
            <div>
              {/* <span className="mx-3"><Link to="/topanime" style={{ color: "white", textDecoration: 'none' }}>Top Anime</Link></span> */}
              {!this.props.isLogin && <span className="mx-3"><Link to="/login" style={{ color: "white", textDecoration: 'none' }}>Login</Link></span>}
              {this.props.isLogin && <span className="mx-3"><Link to="/favorites" style={{ color: "white", textDecoration: 'none' }}>Favorites</Link></span>}
              {this.props.isLogin && <a className="mx-3" href="#" style={{ color: "white", textDecoration: 'none' }} onClick={this.newLogout}>Logout</a>}
            </div>
          </div>
        </div>
      </header>
    )
  }
}

const mapStateToProps = (state) => ({
  isLogin: state.user.isLogin
})

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logout())
})

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
