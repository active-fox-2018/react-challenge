import React, { Component } from 'react'
import {
  Link
} from 'react-router-dom'
import logo from '../logo.svg';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

// Actions
import { logout } from '../store/actions/userAction'
import { searchAnime } from '../store/actions/apiAction';

class Navbar extends Component {
  state = {
    redirect: false,
    query: ''
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

  change = (e) => {
    this.setState({
      query: e.target.value
    })
  }

  search = () => {
    let q = this.state.query
    this.setRedirect()
    this.props.searchAnime(q)
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

            <div className="form-inline my-2 my-lg-0">
              <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" onChange={this.change.bind(this)}/>
              <button className="btn btn-outline-primary my-2 my-sm-0" onClick={this.search}>Search</button>
            </div>

            <div>
              {/* <span className="mx-3"><Link to="/topanime" style={{ color: "white", textDecoration: 'none' }}>Top Anime</Link></span> */}
              {!this.props.isLogin && <span className="mx-3"><Link to="/login" style={{ color: "white", textDecoration: 'none' }}>Login</Link></span>}
              {this.props.isLogin && <span className="mx-3"><Link to="/favorites" style={{ color: "white", textDecoration: 'none' }}>Favorites</Link></span>}
              {this.props.isLogin && <span className="mx-3" style={{ color: "white", textDecoration: 'none', cursor: "pointer" }} onClick={this.newLogout}>Logout</span>}
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
  logout: () => dispatch(logout()),
  searchAnime: (query) => dispatch(searchAnime(query))
})

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
